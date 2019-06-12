require('dotenv').config()
const express = require('express');
const massive = require('massive')
const session = require('express-session')
const CronJob = require('cron').CronJob;
const socket = require('socket.io')

const reviewCtrl = require('./controller/reviewCtrl')
const authCtrl = require('./controller/authCtrl')
const msgCtrl = require('./controller/messagesCtrl')
const roomCtrl = require('./controller/roomCtrl')
const tmCtrl = require('./controller/teamMemberCtrl')
const companyCtrl = require('./controller/companyCtrl')
const googleCtrl = require('./controller/googleCtrl')
const awsCtrl = require('./controller/awsCtrl')
const mailerCtrl = require('./controller/nodemailerCtrl')

const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

// middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    console.log("database set!")
    console.log(db.listTables())
})

// sockets
const io = socket(app.listen(SERVER_PORT, () => { console.log(`listening on port ${SERVER_PORT}`) }))
io.on('connection', socket => {
    console.log(`users are connected`)
    socket.on('socket room', data => {
        socket.join(data)
        console.log('joined socket room', data)
        socket.to(data).emit('join socket room', data)
    })
    socket.on('socket room message', data => {
        io.in(data.company_id).emit('socket room message', data)
    })

})

const checkForReviews = async () => {
    console.log("cron job")
    const db = await app.get('db')
    try {
        const companies = await db.getAllCompanies().catch(console.log)
        companies.forEach(async company => {
            if (!company.google_places_id || company.google_places_id === 'gid') {
                return
            }
            const storedReviews = await db.getGoogleReviewsByCompanyId({ company_id: company.company_id }).catch(console.log)
            const reviewsOnGoogle = await googleCtrl.getDetails(company.google_places_id)
            if (reviewsOnGoogle.length > storedReviews.length) {
                const newReviewCount = reviewsOnGoogle.length - storedReviews.length
                //emit to socket
                for (let i = 0; i < newReviewCount; i++) {
                    const { text, author_name, author_url, language, profile_photo_url, rating, time } = reviewsOnGoogle[i]

                    io.in(company.company_id).emit('socket room message', {
                        messageInput: text,
                        name: author_name,
                        company_id: company.company_id,
                        room: company.chat_room_id,
                        team_member_id: null
                    })
                    db.addReview({ author_name, author_url, lang: language, profile_photo_url, rating, review: text, time_stamp: time, company_id: company.company_id })
                        .catch(console.log)

                    db.addMessage({
                        message: text,
                        google_review: true,
                        chat_room_id: company.chat_room_id,
                        time_stamp: new Date(),
                    }).catch(console.log)
                }
            }
        });
    }
    catch (error) {
        console.log(error)
    }
}

// const job = new CronJob('*/59 * * * * *', checkForReviews, null, true, 'America/Los_Angeles')
// job.start()

// app.get('/auth', authCtrl.getCurrentUser)
app.post('/auth/login', authCtrl.login)
// app.post('/auth/register', authCtrl.register)
// app.post('/auth/login', authCtrl.login)
app.post('/auth/register-company', authCtrl.registerCompany)
app.post('/auth/register-user', authCtrl.registerUser)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/session', authCtrl.getSessionUser)

app.get('/messages/:room', msgCtrl.getMessagesByRoomId)
app.post('/messages', msgCtrl.addMessage)

app.get('/rooms/:co_id', roomCtrl.getAllRoomsByCompany)
app.post('/rooms', roomCtrl.addNewRoom)
app.put('/rooms/:room_id', roomCtrl.updateRoom)
app.delete('/rooms/:room_id', roomCtrl.deleteRoom)

app.get('/team-members/:co_id', tmCtrl.getMembersByCompany)
// app.get('/team-members/:room_id', tmCtrl.getMembersByRoom)
app.get('/team-member/:team_member_id', tmCtrl.getMember)
app.post('/team-member', tmCtrl.addMember)
app.put('/team-member', tmCtrl.updateMember)
app.delete('/team-member/:team_member_id', tmCtrl.deleteMember)

// app.get('/company', companyCtrl.getCompany)
// app.post('/company', companyCtrl.addCompany)
// app.put('/company', companyCtrl.updateCompany)
// app.delete('/company', companyCtrl.deleteCompany)
app.get('/company-ids', companyCtrl.getCompanies)

app.get('/places/search/:company', googleCtrl.searchPlaces)
app.get('/google-reviews/:company_id', googleCtrl.getGoogleReviews)

app.get('/api/sig', awsCtrl.getSig)

// onBoarding
app.get('/onboarding/:team_member_id', tmCtrl.onBoardingTeamMember)
app.put('/onboarding/:team_member_id', tmCtrl.onBoardingUpdatePassword)
app.post('/email-team-member', mailerCtrl.sendLoginRequest)

app.get('/unread-messages/:team_member_id', msgCtrl.getUnreadMessages)
app.post(`/unread-messages`, msgCtrl.addUnreadMessages)
app.delete(`/unread-messages/:team_member_id/:chat_room_id`, msgCtrl.removeUnreadMessages)
