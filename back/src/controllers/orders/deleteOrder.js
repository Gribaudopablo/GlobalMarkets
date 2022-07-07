const orderSchema = require('../../models/orders');
const deleteOrder = (req, res) => {

    if (!req.params) return res.status(400).send({ message: 'Client has not sent params' });

    const { id } = req.params;
    orderSchema.remove({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
}

module.exports = deleteOrder;