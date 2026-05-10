const productsContainer = document.getElementById("products");

async function getProducts() {

    const response = await fetch(
        "http://localhost:5000/api/products"
    );

    const products = await response.json();

    displayProducts(products);
}

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}">

            <h2>${product.name}</h2>

            <p>${product.description}</p>

            <h3>₹${product.price}</h3>

            <button onclick="addToCart('${product._id}')">
                Add To Cart
            </button>

        </div>
        `;
    });
}

function addToCart(id) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const existing = cart.find(item => item.id === id);

    if(existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product Added To Cart");
}

getProducts();