const pool = require("../database/connector");

const getAllColorGroup = (req, res) => {

    const q = "SELECT * FROM colorgroup";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

module.exports = { getAllColorGroup };