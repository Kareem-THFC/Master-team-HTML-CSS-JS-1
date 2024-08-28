"use strict";

// Products data
const products = [
  {
    id: 1,
    name: "Iced Coffee",
    details:
      "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
    price: 100,
    image: "../assets/iced-coffee.png",
  },
  {
    id: 2,
    name: "Caramel Frappe",
    details:
      "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
    price: 200,
    image: "../assets/frappe.png",
  },
  {
    id: 3,
    name: "Mocha Late",
    details:
      "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
    price: 300,
    image: "../assets/latte.png",
  },
  {
    id: 4,
    name: "Double Espresso",
    details:
      "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.",
    price: 400,
    image: "../assets/double-esspresso.png",
  },
];

const defaultProduct = {
  id: 0,
  name: "Iced Coffee",
  details:
    " Coffee is a brewed drink prepared from roasted coffee beans, theseeds of berries from certain Coffea species. Coffee is a brewedrink prepared from roasted coffee beans, the seeds of berriesfrom certain Coffea species. Coffee is a brewed drink preparedfrom roasted coffee beans, the seeds of berries from certain Coffea species.",
  price: 500,
  image: "../assets/iced-coffee.png",
};
// Selecting elements
const navItems = document.querySelectorAll(".nav-item");
const navItemsList = document.querySelector(".nav-items-list");

const productsContainer = document.querySelector(".products");

const popupOverlay = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content");
const popupName = document.querySelector(".popup-name");
const popupImage = document.querySelector(".popup-img");
const popupDetails = document.querySelector(".popup-details");

const cartIcon = document.querySelector(".cart");
const cartNotification = document.querySelector(".notification");
const cartContent = document.querySelector(".cart-content");
const cartItemsContainer = document.querySelector(".cart-items");
const checkoutBtn = document.querySelector("#btn-checkout");

// Navigation styling
navItemsList.addEventListener("click", (e) => {
  e.preventDefault();
  const clickedItem = e.target.closest(".nav-item");
  if (!clickedItem) return;
  console.log("clicked");

  navItems.forEach((item) => item.classList.remove("active"));

  clickedItem.classList.add("active");
});

// Cart functionality
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const updateCart = function (product) {
  console.log(product);
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  cartNotification.textContent = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
};

cartNotification.textContent = cart.reduce(
  (acc, item) => acc + item.quantity,
  0
);

cartIcon.addEventListener("mouseover", () => {
  if (cart.length > 0) {
    cartItemsContainer.innerHTML = `<ul>
        ${cart
          .map((product) => `<li>${product.quantity} x ${product.name}</li>`)
          .join("")}
      </ul>`;
    if (checkoutBtn) {
      checkoutBtn.style.display = "inline-block";
    }
  } else {
    cartItemsContainer.innerHTML = "<p>No items in cart</p>";
    if (checkoutBtn) checkoutBtn.style.display = "none";
  }
});

// Popup functionality
const popupOpen = function (product = defaultProduct) {
  popupOverlay.classList.remove("hidden");
  popupContent.classList.remove("hidden");

  popupName.textContent = product.name;
  popupImage.src = product.image;
  popupDetails.textContent = product.details;
};

const popupClose = function (e) {
  popupOverlay.classList.add("hidden");
  popupContent.classList.add("hidden");
};

popupOverlay.addEventListener("click", popupClose);
popupContent.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popupClose();
});

// Rendering products
products.forEach((product) => {
  const markup = `
    <div class="card"  >
        <img src=${product.image} alt="coffee bag" class="card-img" />
        <div class="card-content">
          <h3 class="card-title">${product.name}</h3>
           <span class="card-price">
                ${`$${product.price}`}
            </span>
          <div class="card-btn-group">

           <button class="card-btn btn-learn">Learn more</button>

            <button class="card-btn btn-buy">Add to Cart</button>
          </div>
        </div>
      </div>`;

  productsContainer.insertAdjacentHTML("afterbegin", markup);

  productsContainer.firstElementChild
    .querySelector(".btn-learn")
    .addEventListener("click", () => {
      popupOpen(product);
    });

  productsContainer.firstElementChild
    .querySelector(".btn-buy")
    .addEventListener("click", () => updateCart(product));
});
