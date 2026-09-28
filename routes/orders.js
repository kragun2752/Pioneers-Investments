const express = require("express");

const router = express.Router();


const Order = require("../models/Order");

const Product = require("../models/Product");




// =====================================
// CREATE ORDER / CHECKOUT
// =====================================


router.post("/", async(req,res)=>{


try{



const {


customerName,


phone,


address,


products,


paymentMethod



} = req.body;







if(!products || products.length === 0){


return res.status(400).json({

message:"Cart is empty"

});


}






let total = 0;


let orderProducts = [];









for(const item of products){



const product = await Product.findById(

item.productId

);







if(!product){


return res.status(404).json({

message:"Product not found"

});


}








if(product.quantity < item.quantity){


return res.status(400).json({

message:

`Not enough stock for ${product.name}`


});


}








total +=

product.price *

item.quantity;








// reduce stock

product.quantity -= item.quantity;






// increase sales

product.salesCount =

(product.salesCount || 0)

+

Number(item.quantity);






await product.save();







orderProducts.push({


productId:product._id,


name:product.name,


price:product.price,


quantity:item.quantity



});





}









const order = new Order({



customerName,


phone,


address,


products:orderProducts,


total,


paymentMethod:

paymentMethod || "Cash"



});







await order.save();








res.json({



message:"Order placed successfully",


order



});








}

catch(error){


console.log(error);



res.status(500).json({

message:error.message

});


}



});











// =====================================
// GET ALL ORDERS ADMIN
// =====================================


router.get("/",async(req,res)=>{


try{



const orders = await Order.find()

.sort({

createdAt:-1

});





res.json(orders);





}

catch(error){


res.status(500).json({

message:error.message

});


}


});









// =====================================
// TRACK ORDER
// =====================================


router.get("/track/:phone",async(req,res)=>{


try{


const orders = await Order.find({

phone:req.params.phone

})

.sort({

createdAt:-1

});





res.json(orders);



}

catch(error){


res.status(500).json({

message:error.message

});


}



});











// =====================================
// UPDATE ORDER STATUS
// =====================================


router.put("/:id",async(req,res)=>{


try{



const order = await Order.findByIdAndUpdate(


req.params.id,


{

status:req.body.status

},


{

new:true

}


);






res.json({


message:"Order status updated",


order


});






}

catch(error){


res.status(500).json({

message:error.message

});


}



});











// =====================================
// DELETE ORDER
// =====================================


router.delete("/:id",async(req,res)=>{


try{


await Order.findByIdAndDelete(

req.params.id

);




res.json({

message:"Order deleted successfully"

});




}

catch(error){


res.status(500).json({

message:error.message

});


}



});







module.exports = router;