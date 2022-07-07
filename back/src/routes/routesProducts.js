const { Router } = require('express');

const router = Router();

const getProducts = require('../controllers/products/getProducts');
const getProductById = require('../controllers/products/getProductById');
const createProduct = require('../controllers/products/createProduct');
const getProductByCat = require('../controllers/products/getProductByCat');
const updateProduct = require('../controllers/products/updateProduct');
const deleteProduct = require('../controllers/products/deleteProduct');

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.get("/categories/:categorie", getProductByCat);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;