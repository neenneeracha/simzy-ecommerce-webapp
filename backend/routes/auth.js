const router = require('express').Router()

const { addNewUser, login } = require('../controller/auth')

router.route("/").post(addNewUser)
router.route("/login").post(login)

module.exports = router