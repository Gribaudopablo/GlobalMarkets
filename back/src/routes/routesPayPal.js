

const express = require("express");
const router = express.Router();
const createOrder = require('../controllers/PayPal/createOrder')
const captureOrder = require('../controllers/PayPal/captureOrder')
const cancelPayment = require('../controllers/PayPal/cancelOrder')
const getDataOrderById= require("../controllers/PayPal/getDataOrderById")

router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);
router.get("/getDataOrderById/:id", getDataOrderById);

module.exports = router;