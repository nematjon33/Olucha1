const products = [
    { id: 1, name: "Яблоки", price: 100 },
    { id: 2, name: "Бананы", price: 120 },
    { id: 3, name: "Морковь", price: 80 }
];

let cart = [];

function loadCatalog() {
    const catalog = document.getElementById("catalog");
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `<h3>${product.name}</h3><p>${product.price} ₽</p>
                          <button onclick="addToCart(${product.id})">Добавить</button>`;
        catalog.appendChild(item);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    document.getElementById("cart-count").innerText = cart.length;
}

function openCart() {
    document.getElementById("cart").classList.remove("hidden");
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - ${item.price} ₽</li>`;
    });

    document.getElementById("total-price").innerText = total;
}

function closeCart() {
    document.getElementById("cart").classList.add("hidden");
}

function checkout() {
    alert("Заказ оформлен!");
    cart = [];
    document.getElementById("cart-count").innerText = "0";
    closeCart();
}

window.onload = loadCatalog;
