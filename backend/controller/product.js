const pool = require('../database/connector')

// get all product
const getAllProducts = (req, res) => {
    // not from search
    if (typeof req.query.search_input !== "string") {
        const main_category = req.query.main_category
            // only main category
        if (typeof req.query.sub_category !== "string") {
            const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?)"
            pool.query(q, [main_category], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json(data)
            })
        } else {
            // sub category exists
            const sub_category = req.query.sub_category
            const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?)"
            pool.query(q, [main_category, sub_category], (err, data) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json(data)
            })
        }
    } else {
        // search
        const search_input = req.query.search_input
        const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ?"
        pool.query(q, ['%' + search_input + '%'], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    }
}

const getAllFilteredProducts = (req, res) => {
    let minPrice = "0"
    let q = ""
    let values = []
    if (req.query.price !== "null") {
        switch (req.query.price) {
            case "1999":
                minPrice = "1000"
                break;
            case "2999":
                minPrice = "2000"
                break;
            case "3999":
                minPrice = "3000"
                break;
            case "4999":
                minPrice = "4000"
                break;
            default:
                minPrice = "0"

        }
    }

    if (req.query.color !== "null") {
        if (req.query.size !== "null") {
            if (req.query.price !== "null") {
                // color, size, price selected
                if (typeof req.query.search_input !== "string") {
                    if (typeof req.query.sub_category !== "string") {
                        // only main category
                        q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) AND price BETWEEN ? AND ? GROUP BY p.product_id"
                        values = [req.query.color, req.query.size, req.query.main_category, minPrice, req.query.price]

                    } else {
                        // sub category exists
                        q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) AND price BETWEEN ? AND ? GROUP BY p.product_id"
                        values = [req.query.color, req.query.size, req.query.main_category, req.query.sub_category, minPrice, req.query.price]
                    }
                } else {
                    // search
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? AND price BETWEEN ? AND ? GROUP BY p.product_id"
                    values = [req.query.color, req.query.size, '%' + req.query.search_input + '%', minPrice, req.query.price]

                }
            } else {
                // color and size selected
                if (typeof req.query.search_input !== "string") {
                    if (typeof req.query.sub_category !== "string") {
                        // only main category
                        q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) GROUP BY p.product_id"
                        values = [req.query.color, req.query.size, req.query.main_category]

                    } else {
                        // sub category exists
                        q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) GROUP BY p.product_id"
                        values = [req.query.color, req.query.size, req.query.main_category, req.query.sub_category]
                    }
                } else {
                    // search
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? GROUP BY p.product_id"
                    values = [req.query.color, req.query.size, '%' + req.query.search_input + '%']

                }
            }
        } else if (req.query.price !== "null") {
            // color and price selected
            if (typeof req.query.search_input !== "string") {
                if (typeof req.query.sub_category !== "string") {
                    // only main category
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) AND price BETWEEN ? AND ? GROUP BY p.product_id"
                    values = [req.query.color, req.query.main_category, minPrice, req.query.price]
                } else {
                    // sub category exists
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) AND price BETWEEN ? AND ? GROUP BY p.product_id"
                    values = [req.query.color, req.query.main_category, req.query.sub_category, minPrice, req.query.price]
                }
            } else {
                // search
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? AND price BETWEEN ? AND ? GROUP BY p.product_id"
                values = [req.query.color, '%' + req.query.search_input + '%', minPrice, req.query.price]
            }

        } else {
            // only color selected
            if (typeof req.query.search_input !== "string") {

                if (typeof req.query.sub_category !== "string") {
                    // only main category
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) GROUP BY p.product_id"
                    values = [req.query.color, req.query.main_category]
                } else {
                    // sub category exists
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) GROUP BY p.product_id"
                    values = [req.query.color, req.query.main_category, req.query.sub_category]
                }
            } else {
                // search
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id AND pc.color_group_id IN (SELECT c.color_group_id FROM colorgroup c JOIN productcolor pc ON c.color_group_id = pc.color_group_id WHERE color_group = ?)) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? GROUP BY p.product_id"
                values = [req.query.color, '%' + req.query.search_input + '%']
            }


        }
    } else if (req.query.size !== "null") {
        if (req.query.price !== "null") {
            // size and price selected

            if (typeof req.query.search_input !== "string") {
                // only main category
                if (typeof req.query.sub_category !== "string") {
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) AND price BETWEEN ? AND ?"
                    values = [req.query.size, req.query.main_category, minPrice, req.query.price]
                } else {
                    // sub category exists
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) AND price BETWEEN ? AND ?"
                    values = [req.query.size, req.query.main_category, req.query.sub_category, minPrice, req.query.price]
                }
            } else {
                // search
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? AND price BETWEEN ? AND ?"
                values = [req.query.size, '%' + req.query.search_input + '%', minPrice, req.query.price]
            }

        } else {

            // only size selected
            if (typeof req.query.search_input !== "string") {

                if (typeof req.query.sub_category !== "string") {
                    // only main category
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?)"
                    values = [req.query.size, req.query.main_category]
                } else {
                    // sub category exists
                    q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?)"
                    values = [req.query.size, req.query.main_category, req.query.sub_category]
                }
            } else {
                // search
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM (((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productstock ps ON pc.product_color_id = ps.product_color_id AND ps.size = ? AND quantity > 0) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ?"
                values = [req.query.size, '%' + req.query.search_input + '%']
            }

        }
    } else if (req.query.price !== "null") {

        // only price selected
        if (typeof req.query.search_input !== "string") {
            if (typeof req.query.sub_category !== "string") {
                // only main category
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?) AND price BETWEEN ? AND ?"
                values = [req.query.main_category, minPrice, req.query.price]

            } else {
                // sub category exists
                q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?) AND price BETWEEN ? AND ?"
                values = [req.query.main_category, req.query.sub_category, minPrice, req.query.price]
            }
        } else {
            // search
            q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE product_name LIKE ? AND price BETWEEN ? AND ?"
            values = ['%' + req.query.search_input + '%', minPrice, req.query.price]
        }

    } else {
        // no filter provided
        return res.status(400).json({ msg: "No filter provided" })
    }


    pool.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })

}

// get one product to display product details
const getOneProduct = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT * FROM product WHERE product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

// get product images to display product details
const getProductImg = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT pi.product_color_id, img_link FROM ((productimage pi LEFT JOIN productcolor pc ON pi.product_color_id = pc.product_color_id) LEFT JOIN product p ON pc.product_id = p.product_id) WHERE p.product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

// get product color for a product
const getProductColor = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT product_color_id, color, is_main_color FROM productcolor WHERE product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

// get product stock for a product
const getProductStock = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT stock_id, ps.product_color_id, size, quantity FROM productstock ps LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id WHERE pc.product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports = { getAllProducts, getOneProduct, getProductImg, getProductColor, getProductStock, getAllFilteredProducts }