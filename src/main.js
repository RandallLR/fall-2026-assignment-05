
import productsData from './data/products.json';

document.addEventListener('DOMContentLoaded', () => {
    // On store page?
    const productGrid = document.getElementById('product-grid');
    // EXIT if not on store page.
    if (!productGrid) return;

    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');

    const Products_per_page = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(productsData.length / Products_per_page);

    function renderProducts(page) {
        // DELETE existing grid data
        productGrid.innerHTML = '';

        const startIndex = (page - 1) * Products_per_page;
        const endIndex = startIndex + Products_per_page;
        const currentProducts = productsData.slice(startIndex, endIndex);

        currentProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `<img src="${product.imageUrl}" alt ="${product.name}"><span class="category-badge">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><div class="price">$${product.price.toFixed(2)}</div>`;
            
            productGrid.appendChild(card);
        });

        pageIndicator.textContent = `Page ${page} of ${totalPages}`;
        prevButton.disabled = page == 1;
        nextButton.disabled = page == totalPages;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentPage);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    });

    renderProducts(currentPage);
});