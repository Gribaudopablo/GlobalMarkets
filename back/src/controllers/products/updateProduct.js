const productSchema = require('../../models/product');

const updateProduct = (req, res) => {

    if (!req.params || !req.body) return res.status(400).send({ message: 'Client has not sent params' });

    const { id } = req.params;

    productSchema.findByIdAndUpdate(id, req.body,
        async (err, lineUpdated) => {
            if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
            if (!lineUpdated) return res.status(404).send({ message: 'Document not found' });
            return res.status(200).send({ data: lineUpdated });
        });
    }

    module.exports = updateProduct;