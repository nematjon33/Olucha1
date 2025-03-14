let cart = [];

function addToCart(product) {
    cart.push(product);
    alert("Товар добавлен в корзину!");
}

function checkout() {
    let orderDetails = cart.join(", ");
    let email = "nematcon700@gmail.com";
    let subject = "Новый заказ";
    let body = "Заказанные товары: " + orderDetails;

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
