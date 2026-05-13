const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

async function getProducts() {
    try {
        const response = await fetch("/api/products");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error loading products:", error);
        showToast("Failed to load products", "error");
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";

    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h2 style="color: #999;">No products found</h2>
                <p style="color: #999;">Try a different search term</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <h3>₹${product.price.toLocaleString()}</h3>
                <p style="font-size: 12px; color: #999;">Stock: ${product.stock || "Available"}</p>
                <button onclick="addToCart('${product._id}')" class="btn-primary" style="width: auto;">
                    Add To Cart
                </button>
            </div>
        `;
    });
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    displayProducts(filtered);
}

function addToCart(id) {
    if (!localStorage.getItem("token")) {
        showToast("Please login to add items to your cart.", "error");
        window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname)}`;
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);
    const product = allProducts.find(p => p._id === id);

    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: id,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(`${product?.name} added to cart!`, "success");

    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartLinks = document.querySelectorAll("#authLinks a");
    cartLinks.forEach(link => {
        if (link.textContent.includes("Cart")) {
            let badge = link.querySelector(".cart-badge");
            if (cartCount > 0) {
                if (!badge) {
                    badge = document.createElement("span");
                    badge.className = "cart-badge";
                    link.appendChild(badge);
                }
                badge.textContent = cartCount;
            } else if (badge) {
                badge.remove();
            }
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

getProducts();
updateCartBadge();