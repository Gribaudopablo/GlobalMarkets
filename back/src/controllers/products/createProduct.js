const productSchema = require('../../models/product');
const createProduct = (req, res) => {

    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });

    const product = productSchema(req.body);
    product.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
}

module.exports = createProduct;