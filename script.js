document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Апельсины, отборные", price: 229, category: "fruits", img: "assets/images/oranges.jpg" },
        { id: 2, name: "Гранат, 1 шт.", price: 159, category: "fruits", img: "assets/images/pomegranate.jpg" },
        { id: 3, name: "Киви, 3 шт.", price: 139, category: "fruits", img: "assets/images/kiwi.jpg" },
        { id: 4, name: "Киви, 600 г", price: 199, category: "fruits", img: "assets/images/kiwi-pack.jpg" }
    ];

    const productList = document.getElementById("products");
    let cart = [];

    function renderProducts(category = "all") {
        productList.innerHTML = "";
        products
            .filter(p => category === "all" || p.category === category)
            .forEach(product => {
                const productEl = document.createElement("div");
                productEl.className = "product";
                productEl.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Сейчас сезон</p>
                    <div class="price">${product.price} ₽</div>
                    <button onclick="addToCart(${product.id})">+</button>
                `;
                productList.appendChild(productEl);
            });
    }

    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        cart.push(product);
        document.getElementById("cart-count").textContent = cart.length;
    };

    window.openCart = () => {
        document.getElementById("cart-items").innerHTML = cart.map(p => `<p>${p.name} - ${p.price}₽</p>`).join("");
        document.getElementById("cart-modal").style.display = "block";
    };

    window.closeCart = () => {
        document.getElementById("cart-modal").style.display = "none";
    };

    window.checkout = () => {
        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        const message = cart.map(p => `${p.name} - ${p.price}₽`).join("%0A");
        const whatsappURL = `https://wa.me/79507249862?text=Заказ:%0A${message}`;
        window.open(whatsappURL, "_blank");

        cart = [];
        document.getElementById("cart-count").textContent = 0;
        closeCart();
    };

    renderProducts();
});
