console.log("TRACK ORDER LOADED");




async function trackOrder(){



const phone =
document.getElementById("phone").value;



const result =
document.getElementById("orders-result");



if(phone===""){


result.innerHTML=

"Enter phone number";


return;


}




try{


const response =
await fetch("/api/orders/track/"+phone);



const orders =
await response.json();




result.innerHTML="";





if(orders.length===0){


result.innerHTML=

"<h3>No orders found</h3>";


return;


}







orders.forEach(order=>{



result.innerHTML += `



<div class="card">


<h3>

Order Status:

${order.status}

</h3>



<p>

Date:

${new Date(order.createdAt)
.toLocaleString()}

</p>





<h4>
Products
</h4>



${order.products.map(item=>`


<p>

${item.name}

x ${item.quantity}

</p>



`).join("")}





<h3>

Total:

MK ${Number(order.total)
.toLocaleString()}

</h3>



</div>



`;



});





}

catch(error){


console.log(error);


result.innerHTML=

"Connection error";


}


}