const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()


// enable built in middlewares

// enable express.json to parses incoming JSON requests 
// and puts the parsed data in req.body
app.use(express.json())

// enable CORS
app.use(cors())

// mount router at the specified path
const router = require('./routes')
app.use("/api/v1", router)

// start a server and listen on specified port
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})