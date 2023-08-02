const {app} = require('./app')
const dotenv = require('dotenv').config()
const server = app.listen(process.env.PORT, ()=>{
    console.log('server started!')
})

