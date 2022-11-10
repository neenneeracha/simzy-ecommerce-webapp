const jwt = require('jsonwebtoken')
require('dotenv').config()

const authToken = async(req, res, next) => {
    if (req.header) {
        const token = req.header("x-auth-token")

        if (!token) {
            res.status(401).json({ msg: "Token not found" })
        }

        // authenticate token
        try {
            const user = await jwt.verify(token, process.env.TOKEN_KEY)
            req.user = user
            next()
        } catch (err) {
            res.status(403).json({ msg: "Invalid token" })
        }
    }
}

module.exports = { authToken }