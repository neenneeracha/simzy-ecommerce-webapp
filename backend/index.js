<<<<<<< HEAD
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// mount router at the specified path
const router = require('./routes')
app.use("/api/v1", router)

// start a server and listen on specified port
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
=======
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// mount router at the specified path
const router = require('./routes')
app.use("/api/v1", router)

// start a server and listen on specified port
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
})