let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [
    {name:"Clothes", image:"box1_image.jpg", price:1200},
    {name:"Health & Care", image:"box2_image.jpg", price:800},
    {name:"Furniture", image:"box3_image.jpg", price:15000},
    {name:"Electronics", image:"box4_image.jpg", price:25000},
    {name:"Beauty", image:"box5_image.jpg", price:2000},
    {name:"Pets", image:"box6_image.jpg", price:1000},
    {name:"Toys", image:"box7_image.jpg", price:1800},
    {name:"Fashion", image:"box8_image.jpg", price:2200}
];

function updateCartCount() {
    let el = document.getElementById("cart-count");
    if (el) el.innerText = cart.length;
}
updateCartCount();

function addToCart(name,image,price) {
    let item = cart.find(p=>p.name===name);
    if(item) item.quantity++;
    else cart.push({name,image,price,quantity:1});

    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
}

function viewProduct(name,image,price){
    localStorage.setItem("selectedProduct",
        JSON.stringify({name,image,price}));
    window.location.href="product.html";
}

function searchProduct(){
    let input=document.getElementById("searchInput").value.toLowerCase();
    let filtered=products.filter(p=>p.name.toLowerCase().includes(input));
    let container=document.querySelector(".products");
    container.innerHTML="";

    filtered.forEach(p=>{
        container.innerHTML+=`
        <div class="box" onclick="viewProduct('${p.name}','${p.image}',${p.price})">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>Rs ${p.price}</p>
        </div>`;
    });
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

function logout(){
    localStorage.removeItem("user");
    location.reload();
}