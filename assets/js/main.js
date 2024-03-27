let search=document.querySelector('.search-box');
document.querySelector('#search').onclick =()=>{
  search.classList.toggle('active');  
}
document.querySelector('#search').onclick=()=>{
    search.classList.toggle('active');
    navbar.classList.remove('active')
}
let navbar=document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () =>{
navbar.classList.toggle('active');
search.classList.remove('active');
}
window.onscroll = ()=>{
    navbar.classList.remove('active');
    search.classList.remove('active');
}
let header=document.querySelector('header');
window.addEventListener('scroll',()=>{
    header.classList.toggle('shadow',window.scrollY >0);
});
let btnCart=document.querySelectorAll('.products .btn');
let imgPath='';
let productName='';
let productPrice='';
let products=[];
let cartSection=document.getElementById('cart-section');
let product={
    'imgpath':'',
    'title':'',
    'price':''
}
function addToCart(){
    btnCart.forEach((element)=>{
        element.addEventListener('click',function(e){
            imgPath=e.target.parentElement.previousElementSibling.previousElementSibling.src.slice(e.target.parentElement.previousElementSibling.previousElementSibling.src.indexOf('assets'));
              let products;
              if(JSON.parse(localStorage.getItem('products'))==null){
                products=[];
              }else{
                products=JSON.parse(localStorage.getItem('products'));
              }
            productName=e.target.parentElement.previousElementSibling.childNodes[0].data;
            productPrice=e.target.previousElementSibling.childNodes[0].data;
           product['imgpath']=imgPath;
           product['price']=productPrice;
           product['title']=productName;
        products.unshift(product);
        localStorage.setItem('products',JSON.stringify(products));
        Swal.fire("Product Added to your Cart!");
        displayCart();    
    })
    })
}
addToCart();
displayCart();
function displayCart(){
    let result='';
    let products;
    if(JSON.parse(localStorage.getItem('products'))==null){
      products=[];
    }else{
      products=JSON.parse(localStorage.getItem('products'));
    }
    if(products.length==0){
  result=`<h2 class="text-center pt-4">No items added!</h2>`
    }
  products.map((product,index)=>{
    result+=`
    <div class="row  p-2   pt-3 aligin-items-center  ">
    <div class="col-2 p-0 img">
      <img src="${product['imgpath']}" class="w-100" alt="product">
    </div>
    <div class="col-6">
      <h3>${product['title']}</h3>
    </div>
    <div class="col-3 price">
      <span>${product['price']}</span>
    </div>
    </div>
    <div class="d-flex justify-content-between">
    <button class="btn delete-btn  text-danger bg-transparent"  onclick=deleteProduct(${index})><i class="fa-solid fa-trash-can"></i></button>
    <button class="btn buy-btn">Buy Now</button>
 </div>
 <hr>
    `

  })
document.getElementById('cartList').innerHTML=result;
}
document.getElementById('close').addEventListener('click',function(){
  cartSection.style.display='none';  
})
document.getElementById('cart').addEventListener('click',function(){
    cartSection.style.display='unset';  
  })
function deleteProduct(id){
    let products;
    if(JSON.parse(localStorage.getItem('products'))==null){
      products=[];
    }else{
      products=JSON.parse(localStorage.getItem('products'));
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        products.splice(id,1);

localStorage.setItem("products",JSON.stringify(products));
displayCart();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
}
document.body.style.overflow='hidden';
window.addEventListener('load',function(){
setTimeout(function(){
loading.style.opacity='0';
loading.style.visibility='hidden';
loading.style.transition='1s';
document.body.style.overflow='auto'
},2000)})