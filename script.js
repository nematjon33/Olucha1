let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        let product = event.target.parentElement;
        let name = product.dataset.name;
        let price = parseInt(product.dataset.price);
        
        cart.push({ name, price });
        updateCartCount();
    });
});

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("cart-button").addEventListener("click", () => {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} ₽`;
        cartItems.appendChild(li);
    });

    document.getElementById("total-price").textContent = total;
    document.getElementById("cart-modal").style.display = "block";
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "none";
});

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    let orderDetails = cart.map(item => `${item.name} - ${item.price} ₽`).join("\n");
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    let email = "nematcon700@gmail.com";
    let subject = encodeURIComponent("Новый заказ");
    let body = encodeURIComponent(`Заказ:\n${orderDetails}\n\nИтого: ${total} ₽`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
