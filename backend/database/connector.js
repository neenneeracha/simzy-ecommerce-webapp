<<<<<<< HEAD
const mysql = require('mysql')

// initialize pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "simzy",
    timezone: "UTC"
})


=======
const mysql = require('mysql')

// initialize pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "simzy",
    timezone: "UTC"
})


>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = pool