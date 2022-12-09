const pool = require("../database/connector");

const getAllColorGroup = (req, res) => {

    const q = "SELECT * FROM colorgroup";
    pool.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

const UpdateStockColor = (req, res) => {
    const product_id = req.params.id
    const colors = req.body.colors
    let status = 200
    let error = { msg: "ok" }

    const q = "SELECT EXISTS (SELECT * FROM colorgroup WHERE color_group_id = ? AND color = ?) AS colorExist"
    const q1 = "SELECT EXISTS (SELECT * FROM productcolor pc WHERE product_id = ? AND color_group_id = ?) AS colorExist"
    const q2 = "UPDATE productcolor SET color_group_id = ? WHERE product_color_id = ?"
    for (let i = 0; i < colors.length; i++) {
        pool.query(q, [colors[i].color_group_id, colors[i].color], (err, data) => {
            if (err) {
                status = 500
                error = err
            }
            if (status !== 200) {
                i = colors.length;
            } else {
                if (data[0].colorExist !== 1) {
                    // color changed
                    pool.query(q1, [product_id, colors[i].color_group_id],
                        (err, data) => {
                            if (err) {
                                status = 500
                                error = err
                            }

                            if (status !== 200) {
                                i = colors.length;
                            } else {
                                if (data[0].colorExist === 0) {
                                    // not yet exist
                                    pool.query(q2, [colors[i].color_group_id, colors[i].product_color_id],
                                        (err) => {
                                            if (err) {
                                                status = 500
                                                error = err
                                            }
                                        });
                                    if (status !== 200) {
                                        i = colors.length;
                                    }
                                } else {
                                    // color already exist
                                    status = 409
                                    error = `color ${colors[i].color} already exist`
                                    i = colors.length;
                                }
                            }
                        });
                }
            }

        });
    }
    return res.status(status).json(error);
};


module.exports = { getAllColorGroup, UpdateStockColor };