const pool = require('../database/connector')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// add new user
const addNewUser = (req, res) => {
    let q = "SELECT EXISTS (SELECT * FROM userinfo WHERE email = ?) AS userExist"

    pool.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data[0].userExist === 1)
            return res.status(409).json({ msg: `user with email: ${req.body.email} already exist` })

        const saltRounds = 10
        const password = bcrypt.hashSync(req.body.password, saltRounds)
        const values = [req.body.email, password, req.body.firstname, req.body.lastname, req.body.gender, req.body.phoneNumber, req.body.address, req.body.district, req.body.province, req.body.zipCode]

        q = "INSERT INTO userinfo (`email`,`password`,`name`,`surname`,`gender`,`phone_number`,`address`,`district`,`province`,`zip_code`) VALUES (?)"

        pool.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data.insertId)
        })

    })

}

// login
const login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const q = "SELECT user_id, password, is_admin FROM userinfo WHERE email = ?"

    pool.query(q, [email], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length > 0) {
            const isEqual = bcrypt.compareSync(password, data[0].password)

            if (isEqual) {

                const token = jwt.sign({ user_id: data[0].user_id, is_admin: data[0].is_admin }, process.env.TOKEN_KEY, { expiresIn: "6h" })

                return res.status(200).json({ user_id: data[0].user_id, is_admin: data[0].is_admin, accessToken: token })

            } else return res.status(401).json({ msg: "incorrect password" })

        } else return res.status(401).json({ msg: `user with email: ${email} not found` })

    })
}

const verifyUser = (req, res) => {
    const token = req.body.token

    if (!token) {
        return res.status(401).json({ msg: "Token not found" })
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY)

    if (!user) {
        return res.status(403).json({ msg: "Invalid token" })
    }

    return res.status(200).json(user)

}

module.exports = { addNewUser, login, verifyUser }