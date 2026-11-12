const productGrid = document.getElementById("product-grid");

function getCategory() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

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

function renderProducts(list) {
  if (list.length === 0) {
    productGrid.innerHTML = '<p class="empty-message">У цій категорії поки що немає товарів.</p>';
    return;
  }
  productGrid.innerHTML = list.map(createCard).join("");
}

const category = getCategory();
const categoryNames = {
  candles: "Ароматизовані свічки",
  incense: "Ароматичні пахощі",
  diffusers: "Аромадифузори",
};
const pageTitle = document.getElementById("page-title");

if (category && categoryNames[category]) {
  pageTitle.textContent = categoryNames[category];
}
const visibleProducts = (category && categoryNames[category])
  ? products.filter(product => product.category === category)
  : products;

renderProducts(visibleProducts);
