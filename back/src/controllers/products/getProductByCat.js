const productSchema = require('../../models/product');

const getProductByCat = (req, res) => {

    if (!req.params) return res.status(400).send({ message: 'Client has not sent params' });

    const { categoria } = req.params;
    productSchema.find({categorias:[categoria]})

        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
}
module.exports = getProductByCat;