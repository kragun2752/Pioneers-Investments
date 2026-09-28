const express = require("express");

const router = express.Router();

const Admin = require("../models/admin");




// =====================================
// CREATE ADMIN ACCOUNT
// =====================================

router.post("/register", async(req,res)=>{


    try{


        const {


            username,


            password



        } = req.body;







        if(!username || !password){


            return res.status(400).json({


                message:"Username and password required"



            });


        }








        const existingAdmin = await Admin.findOne({


            username



        });







        if(existingAdmin){


            return res.status(400).json({


                message:"Admin already exists"



            });



        }









        const admin = new Admin({


            username,


            password



        });








        await admin.save();








        res.json({


            message:"Admin account created successfully"



        });









    }catch(error){



        console.log(error);



        res.status(500).json({



            message:error.message



        });



    }



});









// =====================================
// ADMIN LOGIN
// =====================================

router.post("/login", async(req,res)=>{


    try{


        const {


            username,


            password



        } = req.body;








        const admin = await Admin.findOne({


            username,


            password



        });








        if(!admin){



            return res.status(401).json({



                message:"Invalid username or password"



            });



        }








        res.json({



            message:"Login successful",



            admin:{


                username:admin.username



            }



        });









    }catch(error){



        console.log(error);



        res.status(500).json({



            message:error.message



        });



    }



});




// TEMPORARY CHECK ADMINS

router.get("/check", async(req,res)=>{

    try{

        const admins = await Admin.find();

        res.json(admins);

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});

module.exports = router;
