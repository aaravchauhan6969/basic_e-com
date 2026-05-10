const cartItems = document.getElementById("cartItems");

const totalElement = document.getElementById("total");

let total = 0;

async function loadCart() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cartItems.innerHTML = "";

    total = 0;

    for(const item of cart) {

        const response = await fetch(
            `http://localhost:5000/api/products/${item.id}`
        );

        const product = await response.json();

        total += product.price * item.quantity;

        cartItems.innerHTML += `

        <div class="card">

            <img src="${product.image}" width="200">

            <h2>${product.name}</h2>

            <h3>₹${product.price}</h3>

            <p>Quantity: ${item.quantity}</p>

            <button onclick="increaseQuantity('${item.id}')">
                +
            </button>

            <button onclick="decreaseQuantity('${item.id}')">
                -
            </button>

            <button onclick="removeItem('${item.id}')">
                Remove
            </button>

        </div>
        `;
    }

    totalElement.innerText = `Total: ₹${total}`;
}

function increaseQuantity(id) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    );

    cart = cart.map(item => {

        if(item.id === id) {
            item.quantity += 1;
        }

        return item;
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

function decreaseQuantity(id) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    );

    cart = cart.map(item => {

        if(item.id === id && item.quantity > 1) {
            item.quantity -= 1;
        }

        return item;
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

function removeItem(id) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    );

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

async function checkout() {

    const token = localStorage.getItem("token");

    if(!token) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;
    }

    const cart = JSON.parse(
        localStorage.getItem("cart")
    );

    const response = await fetch(
        "http://localhost:5000/api/orders",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },

            body: JSON.stringify({
                products: cart,
                totalPrice: total
            })
        }
    );

    const data = await response.json();

    alert("Order Placed Successfully");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}

loadCart();