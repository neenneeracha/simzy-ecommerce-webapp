const pool = require("../database/connector");

const addNewOrder = (req, res) => {
  const values = [
    req.body[1].user_id,
    req.body[1].payment_id,
    "0",
    req.body[0].name,
    req.body[0].surname,
    req.body[0].phoneNumber,
    req.body[0].address,
    req.body[0].district,
    req.body[0].province,
    req.body[0].zipCode,
  ];

  const q =
    "INSERT INTO productorder (user_id, payment_id, status, name, surname, phone_number, address, district, province, zip_code) VALUES (?)";

  pool.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

const addOrderHistory = (req, res) => {
  const q1 =
    "UPDATE productstock SET quantity = quantity - ? WHERE stock_id = ?";
  const q2 =
    "INSERT INTO orderhistory (order_id, stock_id, quantity) VALUES (?,?,?)";

  for (let i = 0; i < req.body[0].length; i++) {
    pool.query(
      q1,
      [req.body[0][i].quantity, req.body[0][i].stock],
      (err, data) => {
        if (err) res.status(500).json(err);
      }
    );

    pool.query(
      q2,
      [req.body[1].order_id, req.body[0][i].stock, req.body[0][i].quantity],
      (err, data) => {
        if (err) return res.status(500).json(err);
      }
    );
  }

  return res.status(200).json({ msg: "ok" });
};

module.exports = { addNewOrder, addOrderHistory };
