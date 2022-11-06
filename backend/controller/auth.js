const pool = require('../database/connector')
const bcrypt = require('bcrypt')

// add new user
const addNewUser = (req, res) => {
    const saltRounds = 10
    const password = bcrypt.hashSync(req.body.password, saltRounds)
    const values = [req.body.email, password, req.body.name, req.body.surname, req.body.gender, req.body.phoneNumber, req.body.address, req.body.district, req.body.province, req.body.zipCode]
        // const q = 
        // const q = "INSERT INTO userinfo (`email`,`password`,`name`,`surname`,`gender`, `phone_number`, `address`, `district`, `province`, `zip_code`) VALUES (?)"

    // pool.query(q, [values], (err, data) => {
    //     if (err) return res.status(500).json(err)

    //     return res.status(200).json(data.insertId)

    // })

}

// login
const login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const q = "SELECT password FROM userinfo WHERE email = ?"

    pool.query(q, [email], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length > 0) {
            const isEqual = bcrypt.compareSync(password, data[0].password)

            if (isEqual) {
                return res.status(200).json({ msg: "successfully logged in" })

            } else return res.status(401).json({ msg: "incorrect password" })

        } else return res.status(401).json({ msg: `user with email: ${email} not found` })

    })
}

module.exports = { addNewUser, login }