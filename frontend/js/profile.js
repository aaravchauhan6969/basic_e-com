async function loadProfile() {
  if (!requireAuth()) {
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to load profile");
    }

    const user = await response.json();

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileRole").textContent =
      user.role.charAt(0).toUpperCase() + user.role.slice(1);

    const createdDate = new Date(user.createdAt || Date.now());
    document.getElementById("profileJoined").textContent = createdDate.toLocaleDateString();

    document.getElementById("profileAdds").textContent = getCartCount();
    renderCartSummary();

    document.getElementById("editName").value = user.name;

    return user;
  } catch (error) {
    console.error("Profile load error:", error);
    showToast("Failed to load profile", "error");
  }
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}

async function renderCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryContainer = document.getElementById("cartSummary");

  if (!summaryContainer) {
    return;
  }

  if (cart.length === 0) {
    summaryContainer.innerHTML = `
      <div class="profile-card">
        <h2>Cart Overview</h2>
        <p>You have not added any products to your cart yet.</p>
        <a href="products.html" class="btn-primary">Browse Products</a>
      </div>
    `;
    return;
  }

  const items = await Promise.all(
    cart.map(async (item) => {
      try {
        const response = await fetch(`/api/products/${item.id}`);
        if (!response.ok) return null;
        const product = await response.json();
        return { ...product, quantity: item.quantity };
      } catch (error) {
        return null;
      }
    })
  );

  const validItems = items.filter(Boolean);

  summaryContainer.innerHTML = `
    <div class="profile-card">
      <h2>Cart Summary</h2>
      <p>You have added <strong>${getCartCount()}</strong> item(s) to your cart.</p>
      <div class="cart-summary-list">
        ${validItems
          .map(
            (product) => `
              <div class="profile-field">
                <label>${product.name}</label>
                <p class="profile-value">Quantity: ${product.quantity}</p>
              </div>
            `
          )
          .join("")}
      </div>
      <a href="cart.html" class="btn-primary">View Cart</a>
    </div>
  `;
}

function toggleEditForm() {
  const form = document.getElementById("editForm");
  const card = document.querySelector(".profile-card");

  if (form.style.display === "none") {
    form.style.display = "block";
    card.style.display = "none";
  } else {
    form.style.display = "none";
    card.style.display = "block";
  }
}

document.getElementById("editBtn")?.addEventListener("click", toggleEditForm);

document.getElementById("cancelBtn")?.addEventListener("click", toggleEditForm);

document.querySelector("#editForm form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const newName = document.getElementById("editName").value;
  const newPassword = document.getElementById("editPassword").value;

  const updateData = { name: newName };

  if (newPassword) {
    updateData.password = newPassword;
  }

  try {
    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedUser = await response.json();

    localStorage.setItem("user", JSON.stringify(updatedUser));

    showToast("Profile updated successfully", "success");

    loadProfile();

    toggleEditForm();
  } catch (error) {
    console.error("Update error:", error);
    showToast("Failed to update profile", "error");
  }
});

loadProfile();
