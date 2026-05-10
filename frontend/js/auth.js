const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

if(registerForm) {

    registerForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        const response = await fetch(
            "http://localhost:5000/api/users/register",
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

        alert(data.message);

        window.location.href = "login.html";
    });
}

if(loginForm) {

    loginForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        const response = await fetch(
            "http://localhost:5000/api/users/login",
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

            alert("Login Success");

            window.location.href = "index.html";

        } else {

            alert(data.message);
        }
    });
}