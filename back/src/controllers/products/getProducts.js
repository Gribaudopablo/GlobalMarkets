const productSchema = require('../../models/product');
const products = require('./dbProvisional')

const getProducts = (req, res) => {

    const { nombre } = req.query
    console.log(nombre)
    if (nombre) {
        productSchema.find({ name: nombre })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
    else {
        productSchema.find()
            .then((data) => {
                res.json(data.concat);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
}
module.exports = getProducts;
