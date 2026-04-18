import { cartCall, updateCart } from "./cart.js";

async function fetchProducts() {
  const response = await
  fetch("https://supersimplebackend.dev/products");
  const products= await response.json();
   displayProduct(products);
   
}

fetchProducts();


function displayProduct(products) {
 
let cartHtml = ''; 

let totalPrice = 0 ;

let totalQuantity = 0;

let delivery = 15;

cartCall.forEach((cartItem)=>{
  let productId = cartItem.productId
  console.log(productId)
  let matchingProduct;

  products.forEach((product)=>{
    if(product.id=== productId){
      matchingProduct = product;
    };

  });

  totalPrice += matchingProduct.priceCents/100;

  totalQuantity += cartItem.quantity;

  cartHtml +=`
      <tr class="font-semibold border-b  product-delete-js-${matchingProduct.id}">
            <td class="py-4 px-2 block items-center gap-2 m-img-c sm:flex">
              <img src="${matchingProduct.image}" alt="" class="me-2 w-15 h-14 rounded ">
            <span class="w-100"> ${matchingProduct.name}</span>  
            </td>
            <td class="px-3">$${matchingProduct.priceCents/100}</td>
            <td class="px-9">${cartItem.quantity}</td>
            <td class="px-6">$${matchingProduct.priceCents/100 * cartItem.quantity}</td>
            <td>
              <button class="text-red-600 hover:text-red-500  text-2xl px-5 delete-js " data-product-id=${matchingProduct.id} >
                <i class="bi bi-trash"></i>
              </button>
            </td>
      </tr>
  `
});

let cartTotalHtml='';




  cartTotalHtml =`
     
    <div class="bg-white rounded-xl shadow p-6 h-fit m-4 border lg:col-start-2">   
        <h2 class="text-xl font-bold mb-4">Cart Summary</h2>
        <hr>
        <p class="flex justify-between mb-3 p-2">
          <span>Subtotal:</span>
          <strong>$${totalPrice * totalQuantity}</strong>
        </p>
        <p class="flex justify-between mb-3 p-2">
          <span>Delivery:</span>
          <strong>$${delivery}</strong>
        </p>
        <hr>
        <h5 class="flex justify-between mb-3 p-2">
          <span>Total:</span>
          <strong>$${delivery + totalPrice * totalQuantity
          }</strong>
        </h5>
        <button class="btn text-xl bg-black text-white w-full rounded p-3 mt-3">
          Proceed to Checkout
        </button>
    </div>
  `

document.querySelector('.total-price-js').innerHTML =cartTotalHtml

document.querySelector('.cartcall-js').innerHTML = cartHtml
console.log(cartHtml)

document.querySelectorAll('.delete-js').forEach((link)=>{
   link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    updateCart(productId);
    let deleteItem= document.querySelector(`.product-delete-js-${productId}`);
    deleteItem.remove()

    fetchProducts()
   })
})
};