// ===============================
// CART
// ===============================

function addToCart(name, price, image, quantity = 1, productSize = "50 ml")  {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let size = productSize;
    let finalPrice = selectedPrice || price;

    // Make sure quantity is a number
    quantity = Number(quantity) || 1;

    // Check if the SAME product + SAME size already exists
    let existingProduct = cart.find(
        product => product.name === name && product.size === size
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            name: name,
            price: finalPrice,
            image: image,
            quantity: quantity,
            size: size
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        if (cartTotal) {
            cartTotal.textContent = "0.00";
        }

        return;
    }

    cart.forEach((product, index) => {

        let itemTotal = Number(product.price) * Number(product.quantity);

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" 
                     alt="${product.name}">

                <div class="cart-info">

                    <h2>${product.name}</h2>

                    <p>Size: ${product.size || "50 ml"}</p>

                    <p>Price: LE ${Number(product.price).toFixed(2)}</p>

                    <div class="quantity">

                        <button 
                            type="button"
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>${product.quantity}</span>

                        <button 
                            type="button"
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                    <p>
                        Subtotal: LE ${itemTotal.toFixed(2)}
                    </p>

                    <button 
                        type="button"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}


// ===============================
// CHANGE CART QUANTITY
// ===============================

function changeQuantity(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}


// ===============================
// PRODUCT PAGE QUANTITY
// ===============================

let productQuantity = 1;

function increaseQuantity() {

    productQuantity++;

    let quantityElement = document.getElementById("quantity");

    if (quantityElement) {
        quantityElement.textContent = productQuantity;
    }
}


function decreaseQuantity() {

    if (productQuantity > 1) {

        productQuantity--;

        let quantityElement = document.getElementById("quantity");

        if (quantityElement) {
            quantityElement.textContent = productQuantity;
        }
    }
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {

        // Count ALL quantities
        let totalQuantity = cart.reduce(
            (total, product) => total + Number(product.quantity || 0),
            0
        );

        cartCount.textContent = totalQuantity;
    }
}


// ===============================
// PRODUCT SIZE
// ===============================

let selectedSize = "";
let selectedPrice = 0;

function selectSize(button, price) {

    let buttons = document.querySelectorAll(".size-btn");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedSize = button.textContent.trim();

    selectedPrice = Number(price);

    let priceElement = document.querySelector(".product-price");

    if (priceElement) {
        priceElement.textContent =
            "LE " + selectedPrice.toFixed(2);
    }
}


// ===============================
// BUY NOW
// ===============================

function buyNow(name, price, image, productSize = "50 ml") {
    let size = selectedSize || productSize;
    let finalPrice = selectedPrice || price;

    let cart = [{
        name: name,
        price: finalPrice,
        image: image,
        quantity: productQuantity,
        size: size
    }];

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "checkout.html";
}

// ===============================
// PAGE LOAD
// ===============================

displayCart();
updateCartCount();