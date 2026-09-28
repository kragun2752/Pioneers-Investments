const jwt = require("jsonwebtoken");


function verifyAdmin(req,res,next){


const token=req.headers.authorization;


if(!token){

return res.status(401).json({
message:"Access denied"
});

}



try{


const decoded=jwt.verify(
token,
process.env.JWT_SECRET
);


req.admin=decoded;


next();



}catch(error){


res.status(401).json({
message:"Invalid token"
});


}


}


module.exports=verifyAdmin;