// =====================================
// PIONEERS INVESTMENTS DASHBOARD ROUTES
// =====================================


const express = require("express");

const router = express.Router();


const Product = require("../models/Product");

const Order = require("../models/Order");




// =====================================
// DASHBOARD STATISTICS
// =====================================


router.get("/stats", async(req,res)=>{


try{



// Total products

const totalProducts =
await Product.countDocuments();




// Total orders

const totalOrders =
await Order.countDocuments();






// Get all orders

const orders =
await Order.find();





let revenue = 0;



orders.forEach(order=>{



// if order has saved total

if(order.total){


revenue += Number(order.total);


}



// fallback calculation

else if(order.products){


order.products.forEach(product=>{


revenue +=

Number(product.price) *

Number(product.quantity);



});


}



});







// Customers

const customers =
await Order.distinct("phone");







res.json({



totalProducts,


totalOrders,


revenue,


totalCustomers:
customers.length



});




}

catch(error){



console.log(error);



res.status(500).json({

message:
"Dashboard statistics error"

});



}



});









// =====================================
// ANALYTICS DATA
// =====================================



router.get("/analytics", async(req,res)=>{


try{



const products =
await Product.find();






// LOW STOCK PRODUCTS


const lowStock =

products.filter(product=>{


return product.quantity <= 5;


});









// BEST SELLING PRODUCTS


const orders =
await Order.find();




let sales = {};





orders.forEach(order=>{



if(order.products){



order.products.forEach(item=>{





if(!sales[item.name]){


sales[item.name]=0;


}





sales[item.name] +=

Number(item.quantity);



});



}



});







let bestSelling =

Object.keys(sales).map(name=>{


return {


name:name,


salesCount:sales[name]


};


});







bestSelling.sort((a,b)=>{


return b.salesCount - a.salesCount;


});







res.json({



lowStock,



bestSelling:
bestSelling.slice(0,5)



});






}

catch(error){



console.log(error);



res.status(500).json({

message:
"Analytics error"

});



}



});







module.exports = router;