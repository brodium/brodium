require('dotenv').config()
const express = require('express');
const massive = require('massive')
const session = require('express-session')

const authCtrl = require('./controller/authCtrl')
const msgCtrl = require('./controller/messagesCtrl')
const roomCtrl = require('./controller/roomCtrl')
const tmCtrl = require('./controller/teamMemberCtrl')
const companyCtrl = require('./controller/companyCtrl')
const googleCtrl = require('./controller/googleCtrl')
const awsCtrl = require('./controller/awsCtrl')

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
    app.listen(SERVER_PORT, () => { console.log(`listening on port ${SERVER_PORT}`) })
})

// app.get('/auth', authCtrl.getCurrentUser)
app.post('/auth/login', authCtrl.login)
// app.post('/auth/register', authCtrl.register)
// app.post('/auth/login', authCtrl.login)
app.post('/auth/register-company', authCtrl.registerCompany)
app.post('/auth/register-user', authCtrl.registerUser)
// app.get('/auth/logout', authCtrl.logout)
app.get('/auth/session', authCtrl.getSessionUser)

// app.get('/messages/:room_id', msgCtrl.getMessagesByRoomId)
// app.post('/messages', msgCtrl.storeMessage)

app.get('/rooms/:co_id', roomCtrl.getAllRoomsByCompany)
app.post('/rooms', roomCtrl.addNewRoom)
app.put('/rooms/:room_id', roomCtrl.updateRoom)
app.delete('/rooms/:room_id', roomCtrl.deleteRoom)

app.get('/team-members/:co_id', tmCtrl.getMembersByCompany)
// app.get('/team-members/:room_id', tmCtrl.getMembersByRoom)
app.post('/team-member', tmCtrl.addMember)
app.put('/team-member', tmCtrl.updateMember)
app.delete('/team-member/:team_member_id', tmCtrl.deleteMember)

// app.get('/company', companyCtrl.getCompany)
// app.post('/company', companyCtrl.addCompany)
// app.put('/company', companyCtrl.updateCompany)
// app.delete('/company', companyCtrl.deleteCompany)

app.get('/places/search/:company', googleCtrl.searchPlaces)

app.get('/api/sig', awsCtrl.getSig)