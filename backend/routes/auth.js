const router = require('express').Router()

const { addNewUser, login } = require('../controller/auth')

router.route("/").post(addNewUser).get(login)

module.exports = router