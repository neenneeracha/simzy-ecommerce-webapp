const pool = require("../database/connector");
const bcrypt = require("bcrypt");

// get user shipping info
const getShippingInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, email, phone_number, address, district, province, zip_code FROM `userinfo` WHERE user_id = ?";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get all user information
const getAllUserInfo = (req, res) => {
    const q = "SELECT * FROM `userinfo`";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get user information
const getUserInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, gender, email, phone_number, address, district, province, zip_code, created_at FROM `userinfo` WHERE user_id = ?";
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

        if (!isEqual)
            return res
                .status(403)
                .json({ msg: "you entered incorrect password, please try again" });
    });

    const saltRounds = 10;
    const password = bcrypt.hashSync(newPW, saltRounds);

    q = "UPDATE userinfo SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?";

    pool.query(q, [password, user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ msg: "password updated!" });
    });

}

module.exports = { getShippingInfo, getAllUserInfo, getUserInfo, updatePassword };