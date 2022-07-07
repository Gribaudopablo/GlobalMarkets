const express = require("express");
const router = express.Router();
const createOrder = require('../controllers/orders/createOrder');
const updateOrder = require('../controllers/orders/updateOrder');
const deleteOrder = require('../controllers/orders/deleteOrder');
const getOrderById= require("../controllers/orders/getOrderById")
const getAllUserOrder= require("../controllers/orders/getAllUserOrder")
const getAllOrders = require("../controllers/orders/getAllOrders");
router.post("/", createOrder);
router.get("/getAllOrders/",getAllOrders);

router.put("/:id", updateOrder);

router.delete("/", deleteOrder);

router.post("/getAll", getAllUserOrder);

router.get("/:id", getOrderById);


module.exports = router;