function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function getAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

function requireAuth() {
  if (!getToken()) {
    showToast("Please login first.", "error");
    const next = encodeURIComponent(window.location.pathname);
    window.location.href = `login.html?next=${next}`;
    return false;
  }

  return true;
}

function renderNav() {
  const authLinks = document.getElementById("authLinks");
  const userStatus = document.getElementById("userStatus");

  if (!authLinks) {
    return;
  }

  const user = getUser();

  if (getToken()) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : "";

    authLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="cart.html">Cart ${cartBadge}</a>
      <a href="orders.html">My Orders</a>
      <a href="profile.html">Profile</a>
      <a href="#" id="logoutLink">Logout</a>
    `;

    if (userStatus) {
      userStatus.textContent = `Hello, ${user?.name || "User"}`;
    }

    document.getElementById("logoutLink")?.addEventListener("click", (event) => {
      event.preventDefault();
      clearSession();
      window.location.href = "login.html";
    });
  } else {
    authLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="cart.html">Cart</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;

    if (userStatus) {
      userStatus.textContent = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", renderNav);
