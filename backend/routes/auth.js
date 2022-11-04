<<<<<<< HEAD
const router = require('express').Router()

const { addNewUser, login } = require('../controller/auth')

router.route("/").post(addNewUser).get(login)

=======
const router = require('express').Router()

const { addNewUser, login } = require('../controller/auth')

router.route("/").post(addNewUser).get(login)

>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = router