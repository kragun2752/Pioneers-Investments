const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../middleware/upload");





// =====================================
// GET ALL PRODUCTS
// =====================================

router.get("/", async(req,res)=>{


    try{


        const products = await Product.find()
        .sort({

            createdAt:-1

        });



        res.json(products);



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }


});








// =====================================
// GET SINGLE PRODUCT
// =====================================

router.get("/:id", async(req,res)=>{


    try{


        const product = await Product.findById(
            req.params.id
        );



        if(!product){


            return res.status(404).json({

                message:"Product not found"

            });


        }




        res.json(product);




    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// ADD PRODUCT
// =====================================

router.post("/", upload.single("image"), async(req,res)=>{


    try{


        const product = new Product({



            name:req.body.name,



            category:req.body.category,



            description:req.body.description,



            price:Number(req.body.price),



            quantity:Number(req.body.quantity),



            image:req.file

            ?

            req.file.filename

            :

            "default.jpg"



        });






        await product.save();





        res.json({


            message:"Product added successfully",


            product



        });







    }catch(error){


        console.log(error);



        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// UPDATE PRODUCT
// =====================================

router.put("/:id", upload.single("image"), async(req,res)=>{


    try{


        const updateData = {


            name:req.body.name,


            category:req.body.category,


            description:req.body.description,


            price:Number(req.body.price),


            quantity:Number(req.body.quantity)


        };





        if(req.file){


            updateData.image=req.file.filename;


        }





        const product = await Product.findByIdAndUpdate(


            req.params.id,


            updateData,


            {

                new:true

            }


        );





        res.json({


            message:"Product updated successfully",


            product



        });






    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// DELETE PRODUCT
// =====================================

router.delete("/:id", async(req,res)=>{


    try{



        await Product.findByIdAndDelete(

            req.params.id

        );





        res.json({


            message:"Product deleted successfully"



        });





    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// BEST SELLING PRODUCTS
// =====================================

router.get("/analytics/bestsellers", async(req,res)=>{


    try{


        const products = await Product.find()

        .sort({

            salesCount:-1

        })

        .limit(5);





        res.json(products);




    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});







module.exports = router;