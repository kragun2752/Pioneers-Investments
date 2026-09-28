console.log("Checkout JS Loaded - Updated");



const form = document.getElementById("checkout-form");

const message = document.getElementById("message");



let cart = JSON.parse(localStorage.getItem("cart")) || [];



console.log("Cart:", cart);





form.addEventListener("submit", async function(e){


e.preventDefault();



console.log("SUBMIT CLICKED");





if(cart.length === 0){


message.innerHTML =
"❌ Cart is empty";


return;


}






let total = 0;



cart.forEach(item=>{


total += Number(item.price) * Number(item.quantity);


});






// Convert cart items into Order format

const order = {



customerName:

document.getElementById("customerName").value,




phone:

document.getElementById("phone").value,




address:

document.getElementById("address").value,





products:

cart.map(item=>({



productId:item._id,



name:item.name,



price:Number(item.price),



quantity:Number(item.quantity)



})),





total:total,



paymentMethod:"Cash"



};







console.log("Sending Order:");

console.log(order);







try{



const response = await fetch("/api/orders",{



method:"POST",



headers:{


"Content-Type":"application/json"


},



body:JSON.stringify(order)



});








const result = await response.json();





console.log("Server Response:");

console.log(result);







if(response.ok){



message.innerHTML =

"✅ Order submitted successfully";





localStorage.removeItem("cart");





setTimeout(()=>{


window.location.href="/";


},2000);





}

else{



message.innerHTML =

"❌ " + result.message;



}





}



catch(error){



console.log(error);



message.innerHTML =

"❌ Connection error";



}





});