console.log("Orders Dashboard Loaded");



const ordersContainer =
document.getElementById("orders-list");





async function loadOrders(){


try{


const response =
await fetch("/api/orders");



const orders =
await response.json();





ordersContainer.innerHTML = "";






if(orders.length === 0){


ordersContainer.innerHTML = `

<h3>
No orders available
</h3>

`;

return;


}







orders.forEach(order=>{





ordersContainer.innerHTML += `


<div class="card">



<h2>

Customer: ${order.customerName}

</h2>




<p>

📞 Phone:

${order.phone}

</p>




<p>

📍 Address:

${order.address}

</p>





<h3>

Products Ordered

</h3>





${order.products.map(product=>`


<p>

🌱 ${product.name}

<br>

Quantity:
${product.quantity}


<br>

Price:
MK ${Number(product.price).toLocaleString()}


</p>


`).join("")}







<h3>

Total:

MK ${Number(order.total).toLocaleString()}

</h3>






<p>

Date:

${new Date(order.createdAt).toLocaleString()}

</p>






<button onclick="deleteOrder('${order._id}')">

Delete Order

</button>





</div>



`;



});





}

catch(error){


console.log(error);



ordersContainer.innerHTML = `

<h3>

Unable to load orders

</h3>

`;


}



}








async function deleteOrder(id){


if(confirm("Delete this order?")){


await fetch("/api/orders/"+id,{

method:"DELETE"

});



loadOrders();



}


}







loadOrders();