/********************************************************************
 *
 * stock.js
 *
 *   This file contains a collection of controllers to handle
 *   requests to the backend for product stock information
 *
 ********************************************************************
 */

const pool = require("../database/connector");

// add product stock by admin
const addProductStock = (req, res) => {
  const stocks = req.body.stocks;
  let status = 200;
  let error = { msg: "ok" };

  const q =
    "SELECT EXISTS (SELECT * FROM productstock WHERE product_color_id = ? AND size = ?) AS stockExist";
  const q1 =
    "INSERT INTO productstock (product_color_id, size, quantity) VALUES (?,?,?)";
  const q2 =
    "UPDATE productstock SET quantity = ? WHERE product_color_id = ? AND size = ?";

  for (let i = 0; i < stocks.length; i++) {
    pool.query(q, [stocks[i].product_color_id, stocks[i].size], (err, data) => {
      if (err) {
        status = 500;
        error = err;
      }
      if (status !== 200) {
        i = stocks.length;
      } else {
        if (data[0].stockExist === 1) {
          pool.query(
            q2,
            [stocks[i].quantity, stocks[i].product_color_id, stocks[i].size],
            (err) => {
              if (err) {
                status = 500;
                error = err;
              }
            }
          );
          if (status !== 200) i = stocks.length;
        } else {
          pool.query(
            q1,
            [stocks[i].product_color_id, stocks[i].size, stocks[i].quantity],
            (err, data) => {
              if (err) {
                status = 500;
                error = err;
              }
            }
          );
          if (status !== 200) i = stocks.length;
        }
      }
    });
  }

  return res.status(status).json(error);
};

// update product stock by admin
const updateProductStock = (req, res) => {
  const stocks = req.body.stocks;
  let status = 200;
  let error = { msg: "ok" };
  const q = "UPDATE productstock SET quantity = ? WHERE stock_id = ?";

  for (let i = 0; i < stocks.length; i++) {
    pool.query(q, [stocks[i].quantity, stocks[i].stock_id], (err, data) => {
      if (err) {
        status = 500;
        error = err;
      }
    });
    if (status !== 200) break;
  }

  return res.status(status).json(error);
};

// add new product by admin
const addNewStock = (req, res) => {
  const product_id = req.params.id;
  const stocks = req.body.stocks;
  const images = req.body.images;

  let status = 200;
  let error = { msg: "ok" };
  let product_color_id;

  const q1 =
    "INSERT INTO productcolor (`product_id`, `color_group_id`, `is_main_color`) VALUES (?,?,?)";
  const q2 =
    "INSERT INTO productstock (`product_color_id`, `size`, `quantity`) VALUES (?,?,?)";
  const q3 =
    "INSERT INTO productimage (`product_color_id`, `img_link`) VALUES (?,?)";
  for (let i = 0; i < stocks.length; i++) {
    pool.query(
      q1,
      [product_id, stocks[i].color_group_id, stocks[i].is_main_color],
      (err, data) => {
        if (err) {
          status = 500;
          error = err;

          if (status !== 200) i = stocks.length;
        } else {
          product_color_id = data.insertId;
          for (let j = 0; j < stocks[i].stock.length; j++) {
            if (stocks[i].stock[j].quantity > 0) {
              pool.query(
                q2,
                [
                  product_color_id,
                  stocks[i].stock[j].size,
                  stocks[i].stock[j].quantity,
                ],
                (err, data) => {
                  if (err) {
                    status = 500;
                    error = err;
                  }
                  if (status !== 200) i = stocks.length;
                }
              );
            }
          }

          for (let j = 0; j < images.length; j++) {
            if (parseInt(stocks[i].index) === parseInt(images[j].index)) {
              for (let k = 0; k < images[j].img.length; k++) {
                pool.query(
                  q3,
                  [product_color_id, images[j].img[k].link],
                  (err, data) => {
                    if (err) {
                      status = 500;
                      error = err;
                    }
                    if (status !== 200) i = stocks.length;
                  }
                );
              }
            }
          }
        }
      }
    );
  }
  return res.status(status).json(status);
};

module.exports = {
  addProductStock,
  updateProductStock,
  addNewStock,
};
