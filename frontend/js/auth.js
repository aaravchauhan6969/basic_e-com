const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const nextPage = getQueryParam("next") || "products.html";

if (localStorage.getItem("token") && loginForm) {
  window.location.href = nextPage;
}

if (localStorage.getItem("token") && registerForm) {
  window.location.href = "products.html";
}

if(registerForm) {

    registerForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const submitBtn = registerForm.querySelector("button");
        submitBtn.disabled = true;
        submitBtn.textContent = "Registering...";

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        try {
            const response = await fetch(
                "/api/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                showToast("Registration successful! Please login now.", "success");
                window.location.href = "login.html";
            } else {
                showToast(data.message || "Registration failed", "error");
            }
        } catch (error) {
            console.error("Register error:", error);
            showToast("An error occurred. Please try again.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Register";
        }
    });
}

if(loginForm) {

    loginForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const submitBtn = loginForm.querySelector("button");
        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        try {
            const response = await fetch(
                "/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                showToast("Login successful!", "success");

                window.location.href = nextPage;

            } else {

                showToast(data.message || "Login failed", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            showToast("An error occurred. Please try again.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Login";
        }
    });
}