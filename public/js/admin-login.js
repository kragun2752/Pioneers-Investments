console.log("🔥 ADMIN LOGIN SYSTEM READY");



const loginButton = document.getElementById("loginBtn");



loginButton.addEventListener(
"click",
loginAdmin
);





async function loginAdmin(){



const username =
document.getElementById("username").value.trim();



const password =
document.getElementById("password").value;



const message =
document.getElementById("message");




if(username === "" || password === ""){


message.innerHTML =
"❌ Enter username and password";


return;


}







try{



const response =
await fetch("/api/admin/login",{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


username,

password


})


});






const data =
await response.json();




console.log(data);






if(response.ok){



message.innerHTML =
"✅ Login successful";





localStorage.setItem(
"adminToken",
"true"
);



localStorage.setItem(
"adminUsername",
username
);





console.log(
"Token saved:",
localStorage.getItem("adminToken")
);






setTimeout(()=>{


window.location.href =
"/admin.html";



},1000);





}

else{


message.innerHTML =
"❌ "+data.message;


}





}

catch(error){


console.log(error);


message.innerHTML =
"❌ Server connection failed";


}



}