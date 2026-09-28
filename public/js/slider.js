let slides =
document.querySelectorAll(".slide");


let dots =
document.querySelectorAll(".dot");


let index=0;


function showSlide(i){


slides.forEach(slide=>{
slide.classList.remove("active");
});


dots.forEach(dot=>{
dot.classList.remove("active");
});


slides[i].classList.add("active");

dots[i].classList.add("active");


}



function nextSlide(){

index++;

if(index>=slides.length){

index=0;

}

showSlide(index);

}



setInterval(nextSlide,4000);



document.querySelector(".next")
.onclick=nextSlide;



document.querySelector(".prev")
.onclick=function(){

index--;

if(index<0){

index=slides.length-1;

}

showSlide(index);

};
