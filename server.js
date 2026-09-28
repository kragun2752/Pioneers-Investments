// =====================================
// PIONEERS INVESTMENTS SERVER
// =====================================


// Import packages

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");




// Load environment variables

dotenv.config();




// Create app

const app = express();




// =====================================
// MIDDLEWARE
// =====================================


app.use(cors());


app.use(express.json());


app.use(express.urlencoded({

    extended:true

}));






// =====================================
// STATIC FILES
// =====================================



app.use(express.static(

    path.join(__dirname,"public")

));






// Product image access

app.use("/uploads",

express.static(

    path.join(__dirname,"uploads")

));









// =====================================
// DATABASE CONNECTION
// =====================================


mongoose.connect(process.env.MONGODB_URI)

.then(()=>{


    console.log("✅ Database connected successfully");


})

.catch((error)=>{


    console.log("❌ Database connection failed");

    console.log(error.message);


});









// =====================================
// API ROUTES
// =====================================



// PRODUCTS

app.use(

"/api/products",

require("./routes/products")

);






// ORDERS

app.use(

"/api/orders",

require("./routes/orders")

);







// ADMIN LOGIN

app.use(

"/api/admin",

require("./routes/admin")

);







// DASHBOARD ANALYTICS

app.use(

"/api/dashboard",

require("./routes/dashboard")

);









// =====================================
// DEFAULT PAGE
// =====================================


app.get("/",(req,res)=>{


    res.sendFile(

        path.join(

            __dirname,

            "public",

            "index.html"

        )

    );


});









// =====================================
// START SERVER
// =====================================


const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{


    console.log(

    `🚀 Pioneers Investments running on http://localhost:${PORT}`

    );


});