const orderSchema = require('../../models/orders');


const getAllOrders = (req, res) => {


          orderSchema.find()
            .then((data) => {
                res.json(data);
                // console.log(data)
            })
            .catch((err) => {
                res.json({ message: err });
            });
    
}
module.exports = getAllOrders;
