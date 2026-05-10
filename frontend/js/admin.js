const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async(e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const price = document.getElementById("price").value;

    const image = document.getElementById("image").value;

    const description = document.getElementById("description").value;

    const stock = document.getElementById("stock").value;

    const response = await fetch(
        "http://localhost:5000/api/products",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                price,
                image,
                description,
                stock
            })
        }
    );

    const data = await response.json();

    alert("Product Added");
});