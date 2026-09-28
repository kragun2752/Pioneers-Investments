const multer = require("multer");
const path = require("path");




// =====================================
// STORAGE CONFIGURATION
// =====================================


const storage = multer.diskStorage({


    destination: function(req, file, cb){


        cb(null, "uploads/");


    },



    filename: function(req, file, cb){


        const uniqueName = Date.now()
        + "-"
        + Math.round(Math.random() * 1000000)
        + path.extname(file.originalname);



        cb(null, uniqueName);


    }


});






// =====================================
// IMAGE FILTER
// =====================================


const fileFilter = function(req, file, cb){



    const allowedTypes = [


        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"



    ];





    if(allowedTypes.includes(file.mimetype)){



        cb(null,true);



    }else{



        cb(
            new Error("Only image files are allowed"),
            false
        );



    }




};








// =====================================
// MULTER CONFIGURATION
// =====================================


const upload = multer({


    storage: storage,


    fileFilter: fileFilter,



    limits:{


        fileSize: 5 * 1024 * 1024


    }


});







module.exports = upload;