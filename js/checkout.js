const orderSummary = document.getElementById("order-summary");
const checkoutForm = document.getElementById("checkout-form");

function renderSummary() {
  const details = getCartDetails();

  if (details.items.length === 0) {
    orderSummary.innerHTML = '<p class="empty-message">Кошик порожній. <a href="index.html">Перейти до каталогу</a></p>';
    checkoutForm.hidden = true;
    return;
  }

  const rowsHtml = details.items.map(function (item) {
    return `
      <div class="summary-row">
        <span>${item.name} × ${item.quantity}</span>
        <span>${item.price * item.quantity} грн</span>
      </div>
    `;
  }).join("");

  orderSummary.innerHTML = rowsHtml + `
    <div class="summary-row summary-total">
      <span>Разом</span>
      <span>${details.total} грн</span>
    </div>
  `;
}

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const details = getCartDetails();
  if (details.items.length === 0) return;

  const order = {
    id: "ORD-" + Date.now(),
    items: details.items,
    total: details.total
  };

  localStorage.setItem("candle-shop-last-order", JSON.stringify(order));
  localStorage.removeItem(CART_KEY);
  window.location.href = "thank-you.html";
});

renderSummary();