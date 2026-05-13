const cartItems = document.getElementById("cartItems");

const totalElement = document.getElementById("total");

let total = 0;

async function loadCart() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <a href="products.html" class="btn-primary">Continue Shopping</a>
          </div>
        `;
        totalElement.innerHTML = "";
        return;
    }

    cartItems.innerHTML = "";

    total = 0;

    for(const item of cart) {

        try {
            const response = await fetch(
                `/api/products/${item.id}`
            );

            if (!response.ok) throw new Error("Product not found");

            const product = await response.json();

            total += product.price * item.quantity;

            cartItems.innerHTML += `

            <div class="card">

                <img src="${product.image}" width="200" alt="${product.name}">

                <h2>${product.name}</h2>

                <h3>₹${product.price.toLocaleString()}</h3>

                <p>Quantity: <strong>${item.quantity}</strong></p>

                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button onclick="increaseQuantity('${item.id}')" class="btn-secondary" style="flex: 1; margin: 0;">+</button>

                    <button onclick="decreaseQuantity('${item.id}')" class="btn-secondary" style="flex: 1; margin: 0;">-</button>

                    <button onclick="removeItem('${item.id}')" class="btn-secondary" style="flex: 1; margin: 0;">Remove</button>
                </div>

            </div>
            `;
        } catch (error) {
            console.error("Error loading product:", error);
        }
    }

    totalElement.innerHTML = `<strong>Total Amount: ₹${total.toLocaleString()}</strong>`;
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

        showToast("Please login first.", "error");

        window.location.href = "login.html";

        return;
    }

    const cart = JSON.parse(
        localStorage.getItem("cart")
    );

    if (cart.length === 0) {
        showToast("Your cart is empty!", "info");
        return;
    }

    try {
        const response = await fetch(
            "/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    products: cart,
                    totalPrice: total
                })
            }
        );

        if (!response.ok) throw new Error("Failed to place order");

        const data = await response.json();

        showToast("Order placed successfully!", "success");

        localStorage.removeItem("cart");

        window.location.href = "orders.html";
    } catch (error) {
        console.error("Checkout error:", error);
        showToast("Failed to place order. Please try again.", "error");
    }
}

loadCart();