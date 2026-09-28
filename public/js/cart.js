console.log("UPDATED CART JS LOADED");


const cartContainer =
document.getElementById("cart-items");


const totalElement =
document.getElementById("total");



let cart =
JSON.parse(localStorage.getItem("cart")) || [];





function displayCart(){


if(!cartContainer) return;



cartContainer.innerHTML = "";



let total = 0;



if(cart.length === 0){


cartContainer.innerHTML = `

<h3>
Your cart is empty
</h3>

`;



if(totalElement){

totalElement.innerHTML =
"Total: MK 0";

}


return;


}





cart.forEach((item,index)=>{


let itemTotal =
Number(item.price) * Number(item.quantity);



total += itemTotal;



cartContainer.innerHTML += `


<div class="card">


<h3>

${item.name}

</h3>



<p>

Price:

MK ${Number(item.price).toLocaleString()}

</p>




<p>

Quantity:

${item.quantity}

</p>





<p>

Subtotal:

MK ${itemTotal.toLocaleString()}

</p>





<button onclick="decreaseQuantity(${index})">

-

</button>



<strong>

${item.quantity}

</strong>



<button onclick="increaseQuantity(${index})">

+

</button>




<br><br>




<button onclick="removeItem(${index})">

Remove

</button>



</div>



`;



});





if(totalElement){


totalElement.innerHTML = `

Total:

MK ${total.toLocaleString()}

`;

}



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



}







function increaseQuantity(index){


cart[index].quantity++;


displayCart();


}







function decreaseQuantity(index){


if(cart[index].quantity > 1){


cart[index].quantity--;


}

else{


cart.splice(index,1);


}



displayCart();


}







function removeItem(index){


cart.splice(index,1);



displayCart();


}






displayCart();