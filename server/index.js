require('dotenv').config()
const express = require('express');
const massive = require('massive')
const session = require('express-session')

const app = express()

const { SERVER_PORT, SESSION_SECRET } = process.env

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

app.listen(SERVER_PORT, () => {console.log(`listening on port ${SERVER_PORT}`)})