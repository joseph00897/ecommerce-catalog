const productContainer =
  document.getElementById("product-container");

const searchInput =
  document.getElementById("search-input");

const cartCount =
  document.getElementById("cart-count");

let products = [];

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

/* Update Cart Count */

function updateCartCount() {

  if (cartCount) {

    cartCount.textContent = cart.length;

  }

}

/* Save Cart */

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

}

/* Add To Cart */

function addToCart(product) {

  cart.push(product);

  saveCart();

  alert("Product added to cart");

}

/* Fetch Products */

async function fetchProducts() {

  if (!productContainer) return;

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    const data = await response.json();

    products = data;

    renderProducts(products);

  }

  catch (error) {

    console.log(error);

  }

}

/* Render Products */

function renderProducts(items) {

  if (!productContainer) return;

  productContainer.innerHTML = "";

  items.forEach(product => {

    const card =
      document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
      />

      <div class="product-info">

        <h3>
          ${product.title}
        </h3>

        <p class="price">
          $${product.price}
        </p>

        <button data-id="${product.id}">
          Add To Cart
        </button>

      </div>
    `;

    productContainer.appendChild(card);

  });

}

/* Search */

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const value =
      searchInput.value.toLowerCase();

    const filteredProducts =
      products.filter(product => {

        return product.title
          .toLowerCase()
          .includes(value);

      });

    renderProducts(filteredProducts);

  });

}

/* Event Delegation */

if (productContainer) {

  productContainer.addEventListener("click", (e) => {

    if (e.target.tagName === "BUTTON") {

      const id =
        Number(e.target.dataset.id);

      const product =
        products.find(p => p.id === id);

      addToCart(product);

    }

  });

}

/* Initial Load */

updateCartCount();

fetchProducts();
