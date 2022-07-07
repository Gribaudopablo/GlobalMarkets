const productSchema = require('../../models/product');
const deleteProduct = (req, res) => {

    if (!req.params) return res.status(400).send({ message: 'Client has not sent params' });

    const { id } = req.params;
    productSchema.remove({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
}

module.exports = deleteProduct;