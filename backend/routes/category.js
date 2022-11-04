<<<<<<< HEAD
const router = require('express').Router()

const { getSubCategory } = require('../controller/category')

router.route("/").get(getSubCategory)
=======
const router = require('express').Router()

const { getSubCategory } = require('../controller/category')

router.route("/").get(getSubCategory)
>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = router