const CART_KEY = "candle-shop-cart";

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const item = cart.find(entry => entry.id === productId);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
}

function getCartCount() {
    return getCart().reduce((sum, entry) => sum + entry.quantity, 0);
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;

        if (count > 0) {
            badge.style.display = "";
        } else {
            badge.style.display = "none";
        }
    }
}
function changeQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;

  item.quantity += delta;

  const updatedCart = cart.filter(entry => entry.quantity > 0);
  saveCart(updatedCart);
  updateCartCount();
}

function removeFromCart(productId) {
  const updatedCart = getCart().filter(entry => entry.id !== productId);
  saveCart(updatedCart);
  updateCartCount();
}
updateCartCount();