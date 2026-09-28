console.log("🔥 Pioneers Admin Dashboard Loaded");


let allProducts = [];
let allOrders = [];

let revenueChart;
let salesChart;




// =====================================
// DASHBOARD STATS
// =====================================

async function loadStats(){


try{


const response =
await fetch("/api/dashboard/stats");


const data =
await response.json();



document.getElementById("total-products").innerHTML =
data.totalProducts || 0;



document.getElementById("total-orders").innerHTML =
data.totalOrders || 0;



document.getElementById("total-revenue").innerHTML =
"MK " + Number(data.revenue || 0).toLocaleString();



document.getElementById("total-customers").innerHTML =
data.totalCustomers || 0;



}

catch(error){

console.log(error);

}


}









// =====================================
// CHARTS
// =====================================


async function loadCharts(){


try{


const response =
await fetch("/api/dashboard/analytics");


const data =
await response.json();





let revenue =
document.getElementById("revenueChart");



if(revenue){


if(revenueChart){

revenueChart.destroy();

}


revenueChart = new Chart(
revenue,
{


type:"line",


data:{


labels:[

"Products",

"Orders"

],



datasets:[{

label:"Business Growth",

data:[

allProducts.length,

allOrders.length

],


borderWidth:3


}]


}


});


}








let sales =
document.getElementById("salesChart");



if(sales){


if(salesChart){

salesChart.destroy();

}



salesChart = new Chart(
sales,
{


type:"bar",


data:{


labels:

data.bestSelling.map(
p=>p.name
),



datasets:[{


label:"Units Sold",


data:

data.bestSelling.map(
p=>p.salesCount
),


borderWidth:1


}]


}


});


}



}


catch(error){

console.log(error);

}



}









// =====================================
// ANALYTICS
// =====================================


async function loadAnalytics(){


try{


const response =
await fetch("/api/dashboard/analytics");


const data =
await response.json();





let low =
document.getElementById("low-stock");



if(low){


low.innerHTML="";



if(data.lowStock.length===0){


low.innerHTML=

"✅ Stock levels are good";


}

else{


data.lowStock.forEach(product=>{


low.innerHTML += `


<div class="analytics-item">

<h3>
⚠️ ${product.name}
</h3>

<p>
Remaining:
${product.quantity}
</p>

</div>


`;


});


}



}







let best =
document.getElementById("best-selling");



if(best){


best.innerHTML="";



data.bestSelling.forEach((product,index)=>{


best.innerHTML += `


<div class="analytics-item">

<h3>

🏆 ${index+1}
${product.name}

</h3>


<p>

Sold:
${product.salesCount}

</p>


</div>


`;


});


}



}

catch(error){

console.log(error);

}


}









// =====================================
// PRODUCTS
// =====================================


async function loadProducts(){


const response =
await fetch("/api/products");


allProducts =
await response.json();


displayProducts(allProducts);


}





function displayProducts(products){


const box =
document.getElementById("products-list");



box.innerHTML="";



products.forEach(product=>{


box.innerHTML += `


<div class="product-card">


<img src="/uploads/${product.image}">


<h3>
${product.name}
</h3>


<p>
${product.category}
</p>


<p>
MK ${Number(product.price).toLocaleString()}
</p>


<p>
Stock:
${product.quantity}
</p>



<button onclick="editProduct('${product._id}')">

✏ Edit

</button>



<button onclick="deleteProduct('${product._id}')">

🗑 Delete

</button>



</div>


`;



});



}









// =====================================
// IMAGE PREVIEW
// =====================================


document.getElementById("image")
?.addEventListener(
"change",
function(){


const file =
this.files[0];


if(file){


document.getElementById("preview-image")
.src =
URL.createObjectURL(file);


}



});









// =====================================
// SAVE PRODUCT
// =====================================


document
.getElementById("product-form")
?.addEventListener(
"submit",
async function(e){


e.preventDefault();



let form =
new FormData(this);



let id =
document.getElementById("product-id").value;



let url =
id ?

"/api/products/"+id

:

"/api/products";



let method =
id ?

"PUT"

:

"POST";




await fetch(url,{

method,

body:form

});



alert("Product saved");



this.reset();


loadProducts();

loadStats();


});









// =====================================
// EDIT
// =====================================


function editProduct(id){


let product =
allProducts.find(
p=>p._id===id
);


document.getElementById("product-id").value =
product._id;


document.getElementById("name").value =
product.name;


document.getElementById("category").value =
product.category;


document.getElementById("description").value =
product.description;


document.getElementById("price").value =
product.price;


document.getElementById("quantity").value =
product.quantity;


showSection("products");


}










// =====================================
// DELETE
// =====================================


async function deleteProduct(id){


if(confirm("Delete product?")){


await fetch(

"/api/products/"+id,

{

method:"DELETE"

});


loadProducts();

loadStats();


}


}









// =====================================
// ORDERS
// =====================================


async function loadOrders(){


const response =
await fetch("/api/orders");


allOrders =
await response.json();


displayOrders(allOrders);


}







function displayOrders(orders){


const box =
document.getElementById("orders-list");



box.innerHTML="";



orders.forEach(order=>{


box.innerHTML += `


<div class="order-card">


<h3>
👤 ${order.customerName}
</h3>


<p>
📞 ${order.phone}
</p>


<p>
📍 ${order.address}
</p>



<h3>
MK ${order.total.toLocaleString()}
</h3>



<p>
Status:
${order.status}
</p>



<a target="_blank"
href="https://wa.me/${order.phone}">

<button>

WhatsApp

</button>

</a>



<select onchange="updateStatus('${order._id}',this.value)">



<option>
Pending
</option>


<option>
Processing
</option>


<option>
Delivered
</option>


<option>
Cancelled
</option>



</select>



</div>


`;


});


}









async function updateStatus(id,status){


await fetch(

"/api/orders/"+id,

{


method:"PUT",


headers:{


"Content-Type":"application/json"

},


body:JSON.stringify({

status

})


});


loadOrders();


}









// =====================================
// NAVIGATION
// =====================================


function showSection(section){


document
.querySelectorAll("main section")
.forEach(s=>{

s.classList.add("hidden");

});



document
.getElementById(section)
.classList.remove("hidden");


}









// =====================================
// LOGOUT
// =====================================


function logout(){


localStorage.removeItem(
"adminLoggedIn"
);


localStorage.removeItem(
"adminUsername"
);


window.location.href="/admin-login.html";


}








// START


loadStats();

loadProducts();

loadOrders();

loadAnalytics();

setTimeout(loadCharts,1000);