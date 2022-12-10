const pool = require("../database/connector");

//get all order information
const getAllOrderInfo = (req, res) => {
    const q =
        "SELECT p.payment_type, p.status ,po.user_id,po.order_id, po.status, po.name, po.surname, po.phone_number, po.address, po.district, po.province, po.zip_code, po.created_at, po.updated_at, oh.quantity, pd.product_name, pd.price FROM payment p LEFT JOIN productorder po ON p.payment_id = po.payment_id LEFT JOIN orderhistory oh ON po.order_id = oh.order_id LEFT JOIN productstock ps ON oh.stock_id = ps.stock_id LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id LEFT JOIN product pd ON pc.product_id = pd.product_id WHERE po.order_id IS NOT NULL GROUP BY order_id";

    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

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

    const q =
        "SELECT po.order_id, os.description, po.created_at, SUM(oh.quantity * p.price) AS total_price FROM productorder po LEFT JOIN orderstatus os ON po.status_id = os.status_id LEFT JOIN orderhistory oh ON po.order_id = oh.order_id LEFT JOIN productstock ps ON oh.stock_id = ps.stock_id LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id LEFT JOIN product p ON pc.product_id = p.product_id WHERE user_id = ? GROUP BY po.order_id";
    pool.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get order details
const getOrderDetails = (req, res) => {
    const order_id = req.params.id;

    const q =
        "SELECT order_id, po.created_at, po.updated_at, po.payment_id, p.payment_type, p.status, os.description, po.name, po.surname, po.address, po.district, po.province, po.zip_code, po.phone_number FROM productorder po LEFT JOIN payment p ON po.payment_id = p.payment_id LEFT JOIN orderstatus os ON po.status_id = os.status_id WHERE order_id = ?";
    pool.query(q, [order_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get ordered products
const getOrderedProducts = (req, res) => {
    const order_id = req.params.id;

    const q =
        "SELECT oh.quantity, ps.size, p.product_id, p.product_name, p.price, pi.img_link, cg.color, c.main_category, c.sub_category FROM orderhistory oh LEFT JOIN productstock ps ON oh.stock_id = ps.stock_id LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id LEFT JOIN product p ON pc.product_id = p.product_id LEFT JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1) LEFT JOIN colorgroup cg ON pc.color_group_id = cg.color_group_id LEFT JOIN category c ON p.category_id = c.category_id WHERE order_id = ?";
    pool.query(q, [order_id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

// get order status
const getOrderStatus = (req, res) => {
    const q =
        "SELECT * FROM orderstatus";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

module.exports = {
    addNewOrder,
    addOrderHistory,
    getUserOrder,
    getOrderDetails,
    getOrderedProducts,
    getAllOrderInfo,
    getOrderStatus
};