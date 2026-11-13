const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-message">Кошик порожній. <a href="index.html">Перейти до каталогу</a></p>';
    cartTotal.textContent = "";
    return;
  }

  let total = 0;

  const rowsHtml = cart.map(function (entry) {
    const product = products.find(item => item.id === entry.id);
    if (!product) return "";

    const lineTotal = product.price * entry.quantity;
    total += lineTotal;

    return `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}" width="80" height="80">
        <div class="cart-info">
          <h2>${product.name}</h2>
          <p>${product.price} грн</p>
          <div class="quantity-controls">
            <button type="button" class="qty-btn" data-action="decrease" data-id="${product.id}" aria-label="Зменшити кількість">−</button>
            <span class="qty-value">${entry.quantity}</span>
            <button type="button" class="qty-btn" data-action="increase" data-id="${product.id}" aria-label="Збільшити кількість">+</button>
            <button type="button" class="remove-btn" data-action="remove" data-id="${product.id}">Видалити</button>
          </div>
        </div>
        <p class="cart-line-total">${lineTotal} грн</p>
      </div>
    `;
  }).join("");

  cartItems.innerHTML = rowsHtml;
  cartTotal.textContent = "Разом: " + total + " грн";
}

cartItems.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const productId = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(productId, 1);
  if (action === "decrease") changeQuantity(productId, -1);
  if (action === "remove") removeFromCart(productId);

  renderCart();
});

renderCart();