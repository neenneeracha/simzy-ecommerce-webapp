const pool = require("../database/connector");

// add new order
const addNewOrder = (req, res) => {
    const values = [
        req.body[1].user_id,
        req.body[1].payment_id,
        "1",
        req.body[0].name,
        req.body[0].surname,
        req.body[0].phoneNumber,
        req.body[0].address,
        req.body[0].district,
        req.body[0].province,
        req.body[0].zipCode,
    ];

    const q =
        "INSERT INTO productorder (user_id, payment_id, status_id, name, surname, phone_number, address, district, province, zip_code) VALUES (?)";

    pool.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// add products that were ordered
const addOrderHistory = (req, res) => {
    const q1 =
        "UPDATE productstock SET quantity = quantity - ? WHERE stock_id = ?";
    const q2 =
        "INSERT INTO orderhistory (order_id, stock_id, quantity) VALUES (?,?,?)";

    for (let i = 0; i < req.body[0].length; i++) {
        pool.query(
            q1, [req.body[0][i].quantity, req.body[0][i].stock],
            (err, data) => {
                if (err) res.status(500).json(err);
            }
        );

        pool.query(
            q2, [req.body[1].order_id, req.body[0][i].stock, req.body[0][i].quantity],
            (err, data) => {
                if (err) return res.status(500).json(err);
            }
        );
    }

    return res.status(200).json({ msg: "ok" });
};

// get user order 
const getUserOrder = (req, res) => {
    const user_id = req.params.id;

    const q = "SELECT po.order_id, os.description, po.created_at, SUM(oh.quantity * p.price) AS total_price FROM productorder po LEFT JOIN orderstatus os ON po.status_id = os.status_id LEFT JOIN orderhistory oh ON po.order_id = oh.order_id LEFT JOIN productstock ps ON oh.stock_id = ps.stock_id LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id LEFT JOIN product p ON pc.product_id = p.product_id WHERE user_id = ? GROUP BY po.order_id";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

module.exports = { addNewOrder, addOrderHistory, getUserOrder };