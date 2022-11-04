<<<<<<< HEAD
const pool = require('../database/connector')

// get all product for each sub category page
const getAllProducts = (req, res) => {
    const main_category = req.query.main_category

    if (typeof req.query.sub_category !== "string") {
        const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?)"
        pool.query(q, [main_category], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    } else {
        const sub_category = req.query.sub_category
        const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?)"
        pool.query(q, [main_category, sub_category], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    }
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

=======
const pool = require('../database/connector')

// get all product for each sub category page
const getAllProducts = (req, res) => {
    const main_category = req.query.main_category

    if (typeof req.query.sub_category !== "string") {
        const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id IN (SELECT category_id FROM category WHERE main_category = ?)"
        pool.query(q, [main_category], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    } else {
        const sub_category = req.query.sub_category
        const q = "SELECT p.product_id, product_name, price, created_at, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pc.is_main_color = 1 AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?)"
        pool.query(q, [main_category, sub_category], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    }
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

>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
module.exports = { getAllProducts, getOneProduct, getProductImg, getProductColor, getProductStock }