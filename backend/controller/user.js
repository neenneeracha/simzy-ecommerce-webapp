const pool = require("../database/connector");
const bcrypt = require("bcrypt");

// get user shipping info
const getShippingInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, email, phone_number, address, district, province, zip_code FROM userinfo WHERE user_id = ?";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get all user information
const getAllUserInfo = (req, res) => {
    const q = "SELECT user_id, is_admin, name, surname, gender, email, phone_number, address, district, province, zip_code, created_at, updated_at FROM userinfo";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get user information
const getUserInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, gender, email, phone_number, address, district, province, zip_code, created_at FROM userinfo WHERE user_id = ?";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};


// update password
const updatePassword = (req, res) => {
    const user_id = req.params.id;
    const currentPW = req.body.currentPW;
    const newPW = req.body.newPW;

    let q = "SELECT password FROM userinfo WHERE user_id = ?";

    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        const isEqual = bcrypt.compareSync(currentPW, data[0].password);

        if (!isEqual) {
            return res
                .status(403)
                .json({ msg: "you entered incorrect password, please try again" });
        }

        const saltRounds = 10;
        const password = bcrypt.hashSync(newPW, saltRounds);

        q = "UPDATE userinfo SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?";

        pool.query(q, [password, user_id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ msg: "password updated!" });
        });
    });

}

// update password by admin
const updatePasswordByAdmin = (req, res) => {
    const user_id = req.params.id;

    const saltRounds = 10;
    const password = bcrypt.hashSync(req.body.password, saltRounds);

    const q = "UPDATE userinfo SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?";

    pool.query(q, [password, user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ msg: "password updated!" });
    });

}


// update user information
const updateUserInfo = (req, res) => {
    const user_id = req.params.id;
    const values = [
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.gender,
        req.body.phoneNumber,
        req.body.address,
        req.body.district,
        req.body.province,
        req.body.zipCode,
        user_id
    ];
    let q = "SELECT EXISTS (SELECT * FROM userinfo WHERE email = ? AND user_id != ?) AS userExist";

    pool.query(q, [req.body.email, user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data[0].userExist === 1) {
            return res.status(409).json({ msg: `user with email: ${req.body.email} already exist` });
        }

        q = "UPDATE userinfo SET email = ?, name = ?, surname = ?, gender = ?, phone_number = ?, address = ?, district = ?, province = ?, zip_code = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?";

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ msg: "information updated!" });
        });

    });

};



// update user information by admin
const updateInfoByAdmin = (req, res) => {
    const user_id = req.params.id;
    const values = [
        req.body.user.email,
        req.body.user.name,
        req.body.user.surname,
        req.body.user.gender,
        req.body.user.phone_number,
        req.body.user.address,
        req.body.user.district,
        req.body.user.province,
        req.body.user.zip_code,
        req.body.user.is_admin,
        user_id
    ];

    let q = "SELECT EXISTS (SELECT * FROM userinfo WHERE email = ? AND user_id != ?) AS userExist";

    pool.query(q, [req.body.user.email, user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data[0].userExist === 1) {
            return res.status(409).json({ msg: `user with email: ${req.body.email} already exist` });
        }

        q = "UPDATE userinfo SET email = ?, name = ?, surname = ?, gender = ?, phone_number = ?, address = ?, district = ?, province = ?, zip_code = ?, is_admin = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?";

        pool.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({ msg: "Information updated !!" });
        });

    });

};

module.exports = { getShippingInfo, getAllUserInfo, getUserInfo, updatePassword, updatePasswordByAdmin, updateUserInfo, updateInfoByAdmin };