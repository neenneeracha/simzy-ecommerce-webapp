const pool = require('../database/connector')

// get all product for each sub category page
const getAllProducts = (req, res) => {
    const mainCategory = req.query.main_category
    const subCategory = req.query.sub_category

    const q = "SELECT p.product_id, product_name, price, created_at, color, img_link FROM ((product p LEFT JOIN productcolor pc ON p.product_id = pc.product_id) LEFT JOIN productimage pi ON pc.product_color_id = pi.product_color_id AND pi.img_link = (SELECT img_link FROM productimage WHERE product_color_id = pi.product_color_id LIMIT 1)) WHERE category_id = (SELECT category_id FROM category WHERE main_category = ? AND sub_category = ?)"
    pool.query(q, [mainCategory, subCategory], (err, data) => {
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

const getProductColor = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT product_color_id, color, is_main_color FROM productcolor WHERE product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}


const getProductStock = (req, res) => {
    const product_id = req.params.id

    const q = "SELECT stock_id, ps.product_color_id, size, quantity FROM productstock ps LEFT JOIN productcolor pc ON ps.product_color_id = pc.product_color_id WHERE pc.product_id = ?"
    pool.query(q, [product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

module.exports = { getAllProducts, getOneProduct, getProductImg, getProductColor, getProductStock }