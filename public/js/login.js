console.log("LOGIN SYSTEM LOADED");



const form =
document.getElementById("login-form");



const message =
document.getElementById("login-message");





form.addEventListener("submit",(e)=>{


e.preventDefault();



const username =
document.getElementById("username").value;



const password =
document.getElementById("password").value;





// ADMIN DETAILS

if(
username==="admin" &&
password==="pioneers123"

){



localStorage.setItem(
"adminLoggedIn",
"true"
);



message.innerHTML =
"✅ Login successful";



setTimeout(()=>{


window.location.href="/admin.html";


},1000);



}



else{


message.innerHTML=

"❌ Wrong username or password";


}



});