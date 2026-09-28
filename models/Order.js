const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({



    orderNumber: {

        type: String,

        unique: true

    },



    customerName: {

        type: String,

        required: true

    },



    phone: {

        type: String,

        required: true

    },



    address: {

        type: String,

        required: true

    },



    products: [

        {

            productId: {

                type: mongoose.Schema.Types.ObjectId,

                ref: "Product",

                required: true

            },


            name: {

                type: String,

                required: true

            },


            price: {

                type: Number,

                required: true

            },


            quantity: {

                type: Number,

                required: true

            }


        }

    ],




    total: {

        type: Number,

        required: true

    },




    paymentMethod: {

        type: String,

        default: "Cash"

    },




    status: {

        type: String,

        enum:[

            "Pending",

            "Processing",

            "Delivered",

            "Cancelled"

        ],

        default:"Pending"

    }



},{

    timestamps:true

});







// Generate order number automatically

orderSchema.pre("save", function(next){



    if(!this.orderNumber){


        this.orderNumber =

        "PI-" +

        Date.now();



    }



    next();


});







module.exports = mongoose.model(
"Order",
orderSchema
);