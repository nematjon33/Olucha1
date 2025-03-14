document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Яблоки", price: 100, category: "fruits", img: "assets/images/apple.jpg" },
        { id: 2, name: "Огурцы", price: 80, category: "vegetables", img: "assets/images/cucumber.jpg" },
        { id: 3, name: "Курага", price: 200, category: "dried", img: "assets/images/apricot.jpg" },
        { id: 4, name: "Сок апельсиновый", price: 150, category: "drinks", img: "assets/images/orange-juice.jpg" }
    ];

    const productList = document.getElementById("products");
    const cartModal = document.getElementById("cart-modal");
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
                    <p>${product.price}₽</p>
                    <button onclick="addToCart(${product.id})">Добавить в корзину</button>
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
        cartModal.style.display = "block";
    };

    window.closeCart = () => {
        cartModal.style.display = "none";
    };

    window.checkout = () => {
        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        const orderDetails = cart.map(p => `${p.name} - ${p.price}₽`).join("%0A");
        const message = `Здравствуйте!%0AЯ хочу сделать заказ:%0A${orderDetails}%0A%0AАдрес: [укажите]%0AВремя доставки: [укажите]%0AТелефон: [укажите]`;

        const whatsappURL = `https://wa.me/79507249862?text=${message}`;
        window.open(whatsappURL, "_blank");

        cart = [];
        document.getElementById("cart-count").textContent = 0;
        closeCart();
    };

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            renderProducts(btn.dataset.category);
        });
    });

    renderProducts();
});
