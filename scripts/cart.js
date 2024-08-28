const cartList = document.querySelector(".cart-list");
const cartIcon = document.querySelector(".cart");
const cartNotification = document.querySelector(".notification");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.length > 0
  ? cart.forEach((product) => {
      const markup = `
    <li class="cart-item">
      <h3>${product.name} (x${product.quantity})</h3>
      <p>${`$${product.price * product.quantity}`}
      <button class="cart-btn btn-remove">&times;</button>
      </p>
    </li>`;

      cartList.insertAdjacentHTML("beforeend", markup);
    })
  : cartList.insertAdjacentHTML(
      "beforeend",
      `<li class="empty">Your cart is empty</li>`
    );

const cartTotal = cart.reduce(
  (acc, product) => acc + product.price * product.quantity,
  0
);
document.querySelector(".cart-price").textContent = `Total: $${cartTotal}`;

const btnRemove = document.querySelectorAll(".btn-remove");
btnRemove.forEach((btn, i) => {
  btn.addEventListener("click", function () {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  });
});
