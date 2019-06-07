require('dotenv').config()
const express = require('express');
const massive = require('massive')
const session = require('express-session')

const socket = require('socket.io')


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

    // socket.on('leave socket room', data => {
    //     socket.leave(data)
    //     console.log('left socket room', data)
    // })


    socket.on('socket room message', data => {
        // figure out how to save data from messages here
        // new messages comes in we need to add all team members from company to unread table .We meed company id from room id (props.company_id?)
        // Whenever they are on the dashboard we need to have it show that there is a new message in the chat room (create a notification next to room)
        
        io.in(data.company_id).emit('socket room message', data)
    })

})



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

app.get('/places/search/:company', googleCtrl.searchPlaces)

app.get('/api/sig', awsCtrl.getSig)

// onBoarding
app.get('/onboarding/:team_member_id', tmCtrl.onBoardingTeamMember)
app.put('/onboarding/:team_member_id', tmCtrl.onBoardingUpdatePassword)
app.post('/email-team-member', mailerCtrl.sendLoginRequest)
