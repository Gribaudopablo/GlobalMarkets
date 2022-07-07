const orderSchema = require('../../models/orders');

const getAllUserOrder = (req, res) => {

    const  {userId}  = req.body;
    orderSchema.find({userId:userId})

        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
}
module.exports = getAllUserOrder;