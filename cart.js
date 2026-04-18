export let cartCall =JSON.parse(localStorage.getItem('cart')) || []
export function addCart(productId) {
  let matchingItem;

    cartCall.forEach((cartItem)=>{
      if (productId===cartItem.productId){
        matchingItem = cartItem
      }
      
    })
    if (matchingItem) {
        matchingItem.quantity ++
      }else{
        cartCall.push({
          productId : productId,
          quantity : 1
        })
      }
      cartCount()
    localStorageCart()  
}


export function cartCount() {
    let cartQuantity = 0;
    cartCall.forEach((cartItem)=>{
    
      cartQuantity += cartItem.quantity
    })
    document.querySelector('.cartquantity-js').
    innerHTML=cartQuantity
    
    
  }  

export function updateCart(productId) {
  let newCart=[];
  
  cartCall.forEach((cartItem)=>{
      if (cartItem.productId !== productId) {
          newCart.push(cartItem)
          
      }
  });
  cartCall = newCart
 localStorageCart()
};


function localStorageCart() {
 localStorage.setItem('cart', JSON.stringify(cartCall))

 
}


