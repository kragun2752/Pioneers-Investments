const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({


    name: {

        type: String,

        required: true,

        trim: true

    },


    category: {

        type: String,

        required: true,

        trim: true

    },


    description: {

        type: String,

        default: ""

    },


    price: {

        type: Number,

        required: true

    },


    quantity: {

        type: Number,

        required: true,

        default: 0

    },


    image: {

        type: String,

        default: "default.jpg"

    },


    // Used for analytics and best selling products

    salesCount: {

        type: Number,

        default: 0

    },


    createdAt: {

        type: Date,

        default: Date.now

    }


});



module.exports = mongoose.model(
    "Product",
    productSchema
);