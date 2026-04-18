import {  addCart, cartCount  } from "./cart.js";
 async function fetchProducts() {
 try{
  const response = await
  fetch("https://supersimplebackend.dev/products");
  const products= await response.json();
  displayProduct(products)
 }catch(error){
  console.error("Error loading ptoducts:", error);
 }
}

fetchProducts()



function displayProduct(products) {
  

 let html= '';
products.forEach((element) => {
  html += ` 
  
    <div class="bg-white shadow rounded-xl  hover:shadow-lg ">
      <img src="${element.image}" alt="" class="w-200 h-40 object-cover p-3">
      <div class="p-4 m-0 bg-white">
        <div class="h-20">
          <h2 class="font-bold text-xl text-orange-500 text-center text-xl">${element.name}</h2>
        </div>
        <p class="text-black-500 text-center font-bold">$${element.priceCents/100}</p>
        <div class="added added-js-${element.id}">
              Added 
              <i class="bi bi-check-circle-fill"></i>
          </div>
        <button class="bg-orange-500 text-black-500 mt-3 w-full py-2 rounded hover:bg-orange-400 add-js" data-product-id="${element.id}">
          Add to Cart
        </button>
      </div>

    </div>`;
  
});


console.log(html)

document.querySelector('.js-cont').innerHTML=html


 document.querySelectorAll('.add-js')
 .forEach((button)=>{
  button.addEventListener('click',()=>{
    let productId = button.dataset.productId
  
    let opacity = document.querySelector(`.added-js-${productId}`)
    opacity.classList.add('added-js')

    setTimeout(()=>{
      opacity.classList.remove('added-js');
    }, 3000)
     
    addCart(productId)
    cartCount()
  })
 
});

 
};

document.addEventListener('DOMContentLoaded', ()=>{
  cartCount()

});

const btnJs = document.querySelector('.btn-js');

const cancle = document.querySelector('.cancel-js');

let get = document.querySelector('.get-js');

btnJs.addEventListener('click', ()=>{
 setTimeout(()=>{
  get.classList.remove('hidden')
 }, 300);
 
});
cancle.addEventListener('click', ()=>{
 setTimeout(()=>{
  get.classList.add('hidden')
 }, 300)
 
});
const body = document.querySelector('.remove-js')
body.addEventListener('click', ()=>{
  setTimeout(()=>{
  get.classList.add('hidden')
 }, 300)
});