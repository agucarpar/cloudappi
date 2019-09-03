const express = require('express')
const port = process.env.PORT || 8080
const serverStatic = require('server-static')
const path = require('path')


const app=express()


app.use('/', serverStatic(path.join(__dirname, '/dist')))


app.listen(port)