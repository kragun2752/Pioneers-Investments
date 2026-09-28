// =====================================
// PIONEERS INVESTMENTS ANALYTICS ROUTE
// =====================================


const express = require("express");

const router = express.Router();


const Product = require("../models/Product");

const Order = require("../models/Order");




// =====================================
// GET ANALYTICS DATA
// =====================================


router.get("/", async(req,res)=>{


try{



// TOTAL PRODUCTS

const totalProducts =
await Product.countDocuments();




// GET ALL ORDERS

const orders =
await Order.find();




const totalOrders =
orders.length;





// CUSTOMERS

let customers = new Set();



// REVENUE

let revenue = 0;





orders.forEach(order=>{


if(order.phone){

customers.add(order.phone);

}



revenue += order.total || 0;



});





// BEST SELLING PRODUCTS


const bestSelling = 
await Product.find()
.sort({
salesCount:-1
})
.limit(5);






// LOW STOCK PRODUCTS


const lowStock =
await Product.find({

quantity:{
$lte:5
}

});






res.json({


totalProducts:totalProducts,


totalOrders:totalOrders,


totalCustomers:
customers.size,


revenue:revenue,


bestSelling:bestSelling,


lowStock:lowStock



});





}



catch(error){


console.log(
"Analytics Error:",
error
);



res.status(500).json({

message:"Analytics loading failed"

});



}



});






module.exports = router;