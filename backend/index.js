const cors = require('cors')
require('dotenv').config()

const express = require('express')
const app = express()


app.use(express.json())
app.use(cors())

// mount router at the specified path
const router = require('./routes')
app.use("/api/v1", router)

// start a server and listen on specified port
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})