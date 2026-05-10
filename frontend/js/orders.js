const ordersContainer = document.getElementById("orders");

async function getOrders() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/orders/myorders",
        {
            headers: {
                "Authorization": token
            }
        }
    );

    const orders = await response.json();

    orders.forEach(order => {

        ordersContainer.innerHTML += `

        <div class="card">

            <h2>Order ID</h2>

            <p>${order._id}</p>

            <h3>Total: ₹${order.totalPrice}</h3>

            <p>Status: ${order.status}</p>

        </div>
        `;
    });
}

getOrders();