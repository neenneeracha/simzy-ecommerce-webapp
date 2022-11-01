const pool = require('../database/connector')

const getSubCategory = (req, res) => {
    const category = req.query.category

    const q = "SELECT sub_category FROM category WHERE main_category = ?"
    pool.query(q, [category], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports = { getSubCategory }