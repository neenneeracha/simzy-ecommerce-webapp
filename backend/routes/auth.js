const router = require('express').Router()

const { addNewUser, login, verifyUser } = require('../controller/auth')
const { authToken } = require('../middleware/authToken')

router.route("/").post(addNewUser)
router.route("/login").post(login)
router.route("/verifyUser").post(verifyUser)

module.exports = router