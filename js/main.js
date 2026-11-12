const productGrid = document.getElementById("product-grid");

function createCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="Ароматична свічка «${product.name}»" width="400" height="400" loading="lazy">
      <h2>${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">${product.price} грн</p>
      <button type="button" data-id="${product.id}">Додати в кошик</button>
    </article>
  `;
}

function renderProducts() {
  const cardsHtml = products.map(createCard).join("");
  productGrid.innerHTML = cardsHtml;
}

renderProducts();