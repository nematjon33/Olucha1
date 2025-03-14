document.addEventListener("DOMContentLoaded", () => {
  // Массив товаров с 10 товарами в каждой категории
  const products = [
    // Фрукты (category: "fruits")
    { id: 1, name: "Яблоки", price: 100, category: "fruits", img: "assets/images/fruit1.jpg" },
    { id: 2, name: "Бананы", price: 120, category: "fruits", img: "assets/images/fruit2.jpg" },
    { id: 3, name: "Апельсины", price: 150, category: "fruits", img: "assets/images/fruit3.jpg" },
    { id: 4, name: "Груши", price: 130, category: "fruits", img: "assets/images/fruit4.jpg" },
    { id: 5, name: "Киви", price: 170, category: "fruits", img: "assets/images/fruit5.jpg" },
    { id: 6, name: "Ананасы", price: 200, category: "fruits", img: "assets/images/fruit6.jpg" },
    { id: 7, name: "Манго", price: 250, category: "fruits", img: "assets/images/fruit7.jpg" },
    { id: 8, name: "Персики", price: 140, category: "fruits", img: "assets/images/fruit8.jpg" },
    { id: 9, name: "Сливы", price: 110, category: "fruits", img: "assets/images/fruit9.jpg" },
    { id: 10, name: "Виноград", price: 160, category: "fruits", img: "assets/images/fruit10.jpg" },

    // Овощи (category: "vegetables")
    { id: 11, name: "Огурцы", price: 80, category: "vegetables", img: "assets/images/vegetable1.jpg" },
    { id: 12, name: "Помидоры", price: 90, category: "vegetables", img: "assets/images/vegetable2.jpg" },
    { id: 13, name: "Морковь", price: 70, category: "vegetables", img: "assets/images/vegetable3.jpg" },
    { id: 14, name: "Капуста", price: 60, category: "vegetables", img: "assets/images/vegetable4.jpg" },
    { id: 15, name: "Болгарский перец", price: 110, category: "vegetables", img: "assets/images/vegetable5.jpg" },
    { id: 16, name: "Брокколи", price: 130, category: "vegetables", img: "assets/images/vegetable6.jpg" },
    { id: 17, name: "Цветная капуста", price: 120, category: "vegetables", img: "assets/images/vegetable7.jpg" },
    { id: 18, name: "Сельдерей", price: 95, category: "vegetables", img: "assets/images/vegetable8.jpg" },
    { id: 19, name: "Лук", price: 50, category: "vegetables", img: "assets/images/vegetable9.jpg" },
    { id: 20, name: "Чеснок", price: 55, category: "vegetables", img: "assets/images/vegetable10.jpg" },

    // Сухофрукты (category: "dried")
    { id: 21, name: "Курага", price: 200, category: "dried", img: "assets/images/dried1.jpg" },
    { id: 22, name: "Изюм", price: 180, category: "dried", img: "assets/images/dried2.jpg" },
    { id: 23, name: "Инжир", price: 220, category: "dried", img: "assets/images/dried3.jpg" },
    { id: 24, name: "Финики", price: 250, category: "dried", img: "assets/images/dried4.jpg" },
    { id: 25, name: "Клюква", price: 190, category: "dried", img: "assets/images/dried5.jpg" },
    { id: 26, name: "Чернослив", price: 210, category: "dried", img: "assets/images/dried6.jpg" },
    { id: 27, name: "Сушёная вишня", price: 230, category: "dried", img: "assets/images/dried7.jpg" },
    { id: 28, name: "Сушёная клюква", price: 195, category: "dried", img: "assets/images/dried8.jpg" },
    { id: 29, name: "Сушёная ананас", price: 240, category: "dried", img: "assets/images/dried9.jpg" },
    { id: 30, name: "Сушёные яблоки", price: 205, category: "dried", img: "assets/images/dried10.jpg" },

    // Напитки (category: "drinks")
    { id: 31, name: "Сок апельсиновый", price: 150, category: "drinks", img: "assets/images/drink1.jpg" },
    { id: 32, name: "Сок яблочный", price: 140, category: "drinks", img: "assets/images/drink2.jpg" },
    { id: 33, name: "Лимонад", price: 130, category: "drinks", img: "assets/images/drink3.jpg" },
    { id: 34, name: "Мохито", price: 160, category: "drinks", img: "assets/images/drink4.jpg" },
    { id: 35, name: "Кола", price: 120, category: "drinks", img: "assets/images/drink5.jpg" },
    { id: 36, name: "Минеральная вода", price: 100, category: "drinks", img: "assets/images/drink6.jpg" },
    { id: 37, name: "Чай холодный", price: 110, category: "drinks", img: "assets/images/drink7.jpg" },
    { id: 38, name: "Энергетик", price: 170, category: "drinks", img: "assets/images/drink8.jpg" },
    { id: 39, name: "Компот", price: 115, category: "drinks", img: "assets/images/drink9.jpg" },
    { id: 40, name: "Свежевыжатый сок", price: 190, category: "drinks", img: "assets/images/drink10.jpg" }
  ];

  const productList = document.getElementById("products");
  let cart = [];
  let currentCategory = "all";
  let filteredProducts = [...products];

  // Рендер товаров с фильтрацией по категории, поиску и сортировке
  const renderProducts = (arr = filteredProducts) => {
    productList.innerHTML = "";
    arr.forEach(product => {
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <div class="price">${product.price} ₽</div>
        <button class="add-btn" data-id="${product.id}">Добавить</button>
      `;
      productList.appendChild(productEl);
    });
  };

  // Фильтрация по категории
  const filterByCategory = (category) => {
    currentCategory = category;
    filteredProducts = products.filter(p => category === "all" || p.category === category);
    filterBySearch(document.getElementById("search-input").value.trim());
  };

  // Поиск по названию
  const filterBySearch = (query) => {
    let searched = filteredProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    // Сортировка товаров
    const sortValue = document.getElementById("sort-select").value;
    if(sortValue === "price-asc"){
      searched.sort((a, b) => a.price - b.price);
    } else if(sortValue === "price-desc"){
      searched.sort((a, b) => b.price - a.price);
    }
    renderProducts(searched);
  };

  // Добавление товара в корзину
  const addToCart = (id) => {
    const product = products.find(p => p.id === +id);
    if (product) {
      cart.push(product);
      document.getElementById("cart-count").textContent = cart.length;
    }
  };

  // Открытие/закрытие модальных окон
  const openModal = id => document.getElementById(id).style.display = "flex";
  const closeModal = id => document.getElementById(id).style.display = "none";

  // Открытие корзины и отображение товаров
  const openCart = () => {
    document.getElementById("cart-items").innerHTML =
      cart.length
        ? cart.map(p => `<p>${p.name} - ${p.price}₽</p>`).join("")
        : "<p>Корзина пуста</p>";
    openModal("cart-modal");
  };

  // Оформление заказа через WhatsApp (для корзины)
  const checkout = () => {
    if (!cart.length) {
      alert("Корзина пуста!");
      return;
    }
    const message = cart.map(p => `${p.name} - ${p.price}₽`).join("%0A");
    const whatsappURL = `https://wa.me/79507249862?text=Заказ:%0A${message}`;
    window.open(whatsappURL, "_blank");
    cart = [];
    document.getElementById("cart-count").textContent = 0;
    closeModal("cart-modal");
  };

  // Быстрый заказ "Самокат от 15 минут"
  const quickOrder = () => {
    const name = document.getElementById("qo-name").value.trim();
    const address = document.getElementById("qo-address").value.trim();
    const time = document.getElementById("qo-time").value.trim();
    const phone = document.getElementById("qo-phone").value.trim();
    if (!name || !address || !time || !phone) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }
    const message = encodeURIComponent(
      `Заказ доставки «Самокат от 15 минут»%0AИмя: ${name}%0AАдрес: ${address}%0AВремя: ${time}%0AТелефон: ${phone}%0AГород: Челябинск`
    );
    const whatsappURL = `https://wa.me/79507249862?text=${message}`;
    window.open(whatsappURL, "_blank");
    document.getElementById("quick-order-form").reset();
    closeModal("quick-order-modal");
  };

  // Обработчики событий
  // Делегирование для кнопок "Добавить"
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      addToCart(e.target.dataset.id);
    }
  });

  // Фильтрация по категориям
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filterByCategory(this.dataset.category);
    });
  });

  // Поиск товаров
  document.getElementById("search-input").addEventListener("keyup", (e) => {
    filterBySearch(e.target.value.trim());
  });

  // Сортировка товаров
  document.getElementById("sort-select").addEventListener("change", () => {
    filterBySearch(document.getElementById("search-input").value.trim());
  });

  // Открытие/закрытие модальных окон
  document.getElementById("openCart").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", () => closeModal("cart-modal"));
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
  document.getElementById("openQuickOrder").addEventListener("click", () => openModal("quick-order-modal"));
  document.getElementById("closeQuickOrder").addEventListener("click", () => closeModal("quick-order-modal"));
  document.getElementById("quick-order-form").addEventListener("submit", (e) => {
    e.preventDefault();
    quickOrder();
  });

  // Кнопка "Наверх"
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Инициализация товаров
  renderProducts();
});
