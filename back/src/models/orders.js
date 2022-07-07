const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,         
        required: false
    },
    orderItems: [{
        id:{type: String, required: false}, 
        title:{type: String, required: false},
        size:{type: String, required: false},
        quantity:{type: Number, required: false},
        slug:{type: String, required: false},
        image:{type: [], required: false},
        price:{type: Number, required: false},
    }],
    shippingAddress:{
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        address: {type: String, required: false},
        address2: {type: String},
        zip: {type: String, required: false},
        city: {type: String, required: false},
        country: {type: String, required: false},
        phone: {type: String, required: false},
    },

    numberOfItems: {type:Number, required:false},
    subTotal: {type:Number, required: false},
    tax:{type:Number, required: false},
    total:{type:Number, required: false},
    isPaid: {type: Boolean, default: false ,required: false},
    paidAt:{type:String},
    paypalId:{type:String, required:false},
    
    },
    {timestamps: false}
)

module.exports = mongoose.model('Order', orderSchema);