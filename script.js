let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let item = cart.find(p => p.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) {
    count.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}

function loadCart() {
  let cartItems = document.getElementById("cart-items");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.qty})</span>
        <span>₹${item.price * item.qty}</span>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
    total += item.price * item.qty;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

updateCartCount();

if (window.location.pathname.includes("cart.html")) {
  loadCart();
}