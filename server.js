const express = require('express')
const serverStatic = require('server-static')
const path = require('path')


const app=express()


app.use('/', serverStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 6000

app.listen(port)