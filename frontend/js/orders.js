const ordersContainer = document.getElementById("orders");

async function getOrders() {

    if (!requireAuth()) {
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            "/api/orders/myorders",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) throw new Error("Failed to load orders");

        const orders = await response.json();

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
              <div class="empty-state">
                <h2>No orders yet</h2>
                <p>Start shopping and place your first order!</p>
                <a href="products.html" class="btn-primary">Shop Now</a>
              </div>
            `;
            return;
        }

        ordersContainer.innerHTML = "";

        orders.forEach(order => {

            const createdDate = new Date(order.createdAt).toLocaleDateString();

            ordersContainer.innerHTML += `

            <div class="card">

                <h2>Order #${order._id.substring(0, 8)}...</h2>

                <p><strong>Date:</strong> ${createdDate}</p>

                <h3>Total: ₹${order.totalPrice.toLocaleString()}</h3>

                <p>Status: <span style="color: #667eea; font-weight: 600;">${order.status}</span></p>

                <p><strong>Items:</strong> ${order.products.length}</p>

            </div>
            `;
        });
    } catch (error) {
        console.error("Orders load error:", error);
        ordersContainer.innerHTML = `
          <div class=\"empty-state\">
            <h2>Failed to load orders</h2>
            <p>Please try again later.</p>
          </div>
        `;
    }
}

getOrders();