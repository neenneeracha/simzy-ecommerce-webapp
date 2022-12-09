const pool = require("../database/connector");

const addProductStock = (req, res) => {
    const stocks = req.body.stocks
    let status = 200
    let error = { msg: "ok" }

    const q = "SELECT EXISTS (SELECT * FROM productstock WHERE product_color_id = ? AND size = ?) AS stockExist";
    const q1 = "INSERT INTO productstock (product_color_id, size, quantity) VALUES (?,?,?)"
    const q2 = "UPDATE productstock SET quantity = ? WHERE product_color_id = ? AND size = ?"

    for (let i = 0; i < stocks.length; i++) {
        pool.query(q, [stocks[i].product_color_id, stocks[i].size], (err, data) => {
            if (err) {
                status = 500
                error = err
            }
            if (status !== 200) {
                i = stocks.length;
            } else {
                if (data[0].stockExist === 1) {
                    pool.query(q2, [stocks[i].quantity, stocks[i].product_color_id, stocks[i].size],
                        (err) => {
                            if (err) {
                                status = 500
                                error = err
                            }
                        });
                    if (status !== 200)
                        i = stocks.length;
                } else {
                    pool.query(q1, [stocks[i].product_color_id, stocks[i].size, stocks[i].quantity],
                        (err, data) => {
                            if (err) {
                                status = 500
                                error = err
                            }
                        });
                    if (status !== 200)
                        i = stocks.length;
                }
            }

        });
    }

    return res.status(status).json(error);
}

const updateProductStock = (req, res) => {
    const stocks = req.body.stocks
    let status = 200
    let error = { msg: "ok" }
    const q = "UPDATE productstock SET quantity = ? WHERE stock_id = ?"

    for (let i = 0; i < stocks.length; i++) {
        pool.query(q, [stocks[i].quantity, stocks[i].stock_id],
            (err, data) => {
                status = 500
                error = err
            });
        if (status !== 200) break;

    }

    return res.status(status).json(error);
}

module.exports = {
    addProductStock,
    updateProductStock,
};