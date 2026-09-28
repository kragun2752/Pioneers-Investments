console.log("Pioneers Investments App Loaded");


// ===============================
// ELEMENTS
// ===============================

const productContainer =
document.getElementById("product-container");

const cartContainer =
document.getElementById("cart-container");

const cartTotal =
document.getElementById("cart-total");



let products = [];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];




// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts(){

    try{

        const response =
        await fetch("/api/products");


        products =
        await response.json();


        displayProducts(products);


        updateCart();


    }

    catch(error){

        console.log(error);


        if(productContainer){

            productContainer.innerHTML =
            `
            <h3>
            Failed to load products
            </h3>
            `;

        }

    }

}





// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(items){


    if(!productContainer)
    return;



    productContainer.innerHTML="";



    items.forEach(product=>{


        productContainer.innerHTML +=
        `

        <div class="card">


        <img 
        src="/uploads/${product.image}"
        class="product-image"
        onerror="this.src='/image/hero/farm1.jpg'"
        >


        <h3>
        ${product.name}
        </h3>


        <p>
        Category:
        ${product.category}
        </p>


        <p>
        ${product.description}
        </p>


        <h4>
        MWK ${Number(product.price).toLocaleString()}
        </h4>



        <p>
        Available:
        ${product.quantity}
        </p>



        ${
        product.quantity > 0

        ?

        `

        <button onclick='addToCart(${JSON.stringify(product)})'>

        Add To Cart

        </button>

        `

        :

        `

        <button disabled>

        Out Of Stock

        </button>

        `

        }



        </div>


        `;


    });


}







// ===============================
// ADD CART
// ===============================

function addToCart(product){


    let item =
    cart.find(
    x=>x._id===product._id
    );



    if(item){


        if(item.quantity < product.quantity){

            item.quantity++;

        }

        else{

            showMessage(
            "Maximum stock reached"
            );

            return;

        }


    }


    else{


        cart.push({

            _id:product._id,

            name:product.name,

            price:Number(product.price),

            quantity:1

        });


    }



    saveCart();


    showMessage(
    product.name+" added"
    );


}






// ===============================
// SAVE CART
// ===============================


function saveCart(){


    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );


    updateCart();


}








// ===============================
// CART DISPLAY
// ===============================


function updateCart(){



    if(!cartContainer)
    return;



    if(cart.length===0){


        cartContainer.innerHTML=
        `
        <p>
        Your cart is empty
        </p>
        `;


        if(cartTotal)

        cartTotal.innerHTML =
        "Total: MWK 0";


        return;


    }



    let total=0;



    cartContainer.innerHTML="";




    cart.forEach(item=>{


        total +=
        item.price *
        item.quantity;



        cartContainer.innerHTML +=
        `


        <div class="cart-item">


        <h4>
        ${item.name}
        </h4>


        <p>

        MWK ${item.price.toLocaleString()}

        x

        ${item.quantity}

        </p>



        <button onclick="removeCartItem('${item._id}')">

        Remove

        </button>


        </div>


        `;


    });



    cartTotal.innerHTML =
    "Total: MWK "
    +
    total.toLocaleString();



}








// ===============================
// REMOVE ITEM
// ===============================


function removeCartItem(id){


    cart =
    cart.filter(
    item=>item._id!==id
    );


    saveCart();


}









// ===============================
// CHECKOUT
// ===============================


const checkoutBtn =
document.getElementById("checkout-btn");



if(checkoutBtn){


checkoutBtn.onclick=()=>{


document
.getElementById("checkout")
.classList.remove("hidden");


};


}









// ===============================
// PLACE ORDER
// ===============================


const orderBtn =
document.getElementById("place-order");



if(orderBtn){



orderBtn.onclick=async()=>{



if(cart.length===0){

showMessage(
"Cart is empty"
);

return;

}




const orderData={


customerName:
document.getElementById("customerName").value,


phone:
document.getElementById("phone").value,


address:
document.getElementById("address").value,



products:

cart.map(item=>({

productId:item._id,

quantity:item.quantity


}))



};






try{


const response =
await fetch("/api/orders",{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:
JSON.stringify(orderData)



});






const data =
await response.json();




if(response.ok){



showMessage(
"Order placed successfully"
);



localStorage.removeItem("cart");


setTimeout(()=>{


location.reload();


},1000);



}


else{


showMessage(
data.message ||
"Order failed"
);


}



}

catch(error){


console.log(error);


showMessage(
"Server error"
);


}




};



}









// ===============================
// MESSAGE
// ===============================


function showMessage(text){


let box =
document.createElement("div");


box.innerHTML=text;


box.style.position="fixed";

box.style.bottom="30px";

box.style.right="30px";

box.style.padding="15px 25px";

box.style.background="#ff7a00";

box.style.color="black";

box.style.borderRadius="30px";

box.style.fontWeight="bold";

box.style.zIndex="9999";



document.body.appendChild(box);



setTimeout(()=>{

box.remove();

},2500);



}








// ===============================
// HERO SLIDER
// ===============================


let slides =
document.querySelectorAll(".slide");


let dots =
document.querySelectorAll(".dot");


let currentSlide=0;




function showSlide(index){


if(!slides.length)
return;



slides.forEach(s=>
s.classList.remove("active")
);


dots.forEach(d=>
d.classList.remove("active")
);



slides[index]
.classList.add("active");



if(dots[index])

dots[index]
.classList.add("active");



}




function nextSlide(){


currentSlide++;


if(currentSlide >= slides.length)

currentSlide=0;



showSlide(currentSlide);


}




function previousSlide(){


currentSlide--;


if(currentSlide<0)

currentSlide =
slides.length-1;



showSlide(currentSlide);


}




document.querySelector(".next")
?.addEventListener(
"click",
nextSlide
);



document.querySelector(".prev")
?.addEventListener(
"click",
previousSlide
);




dots.forEach((dot,index)=>{


dot.onclick=()=>{


currentSlide=index;


showSlide(index);


};


});



setInterval(
nextSlide,
5000
);






// START

loadProducts();