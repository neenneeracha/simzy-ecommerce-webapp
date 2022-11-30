const pool = require("../database/connector");
const bcrypt = require("bcrypt");

const getShippingInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, email, phone_number, address, district, province, zip_code FROM `userinfo` WHERE user_id = ?";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

//get all user information
const getAllUserInfo = (req, res) => {
    const q = "SELECT * FROM `userinfo`";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

//get user information
const getUserInfo = (req, res) => {
    const user_id = req.params.id;

    const q =
        "SELECT name, surname, gender, email, phone_number, address, district, province, zip_code, created_at FROM `userinfo` WHERE user_id = ?";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

module.exports = { getShippingInfo, getAllUserInfo, getUserInfo };