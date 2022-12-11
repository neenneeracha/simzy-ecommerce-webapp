/********************************************************************
 *
 * connector.js
 *
 *   This file used for connect web application with the database
 * 
 ********************************************************************
 */

const mysql = require("mysql");

// initialize pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "simzy",
  timezone: "UTC",
});

module.exports = pool;
