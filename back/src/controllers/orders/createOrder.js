const OrderSchema = require('../../models/orders');
const createOrder = (req, res) => {

    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });

    const order = OrderSchema(req.body);
    order.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
        
}

module.exports = createOrder;
