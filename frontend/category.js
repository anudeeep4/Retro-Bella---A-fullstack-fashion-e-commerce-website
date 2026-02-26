document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryTitle = document.getElementById('category-title');

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (!category) {
        productList.innerHTML = '<p>Category not specified.</p>';
        return;
    }

    categoryTitle.textContent = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    const fetchProductsByCategory = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
            if (!response.ok) throw new Error('Could not fetch products.');

            const products = await response.json();

            productList.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                // Removed Bootstrap col classes in favor of our symmetrical-grid CSS
                productCard.className = 'grid-item';

                productCard.innerHTML = `
                    <div class="glass-product-card">
                        <div class="position-relative overflow-hidden w-100">
                            <img src="${product.imageURL}" class="w-100" alt="${product.name}">
                            <button class="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center add-to-wishlist-btn" style="width: 40px; height: 40px; z-index: 2; opacity: 0.9;" data-product-id="${product.id}">
                                <span class="material-symbols-outlined text-danger">favorite_border</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <div class="price">₹${product.price.toFixed(2)}</div>
                            <button class="btn btn-premium w-100 add-to-cart-btn" data-product-id="${product.id}">
                                <span class="material-symbols-outlined me-2 align-middle">shopping_cart</span> Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            });
            // After products are loaded, initialize the Material Symbols
            loadMaterialSymbols();

        } catch (error) {
            console.error('Error:', error);
            productList.innerHTML = '<p class="text-danger text-center w-100 mt-5">Failed to load products for this category.</p>';
        }
    };

    fetchProductsByCategory();

    // Event listener for cart and wishlist buttons (remains the same)
    productList.addEventListener('click', async (e) => {
        const cartBtn = e.target.closest('.add-to-cart-btn');
        const wishlistBtn = e.target.closest('.add-to-wishlist-btn');

        if (!cartBtn && !wishlistBtn) return;

        const token = localStorage.getItem('token');
        if (!token) {
            showToast('Please log in to continue.', 'error');
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
            return;
        }

        const productId = (cartBtn || wishlistBtn).dataset.productId;

        if (cartBtn) {
            try {
                const res = await fetch('http://localhost:5000/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ productId })
                });
                if (!res.ok) throw new Error('Failed to add item to cart');
                showToast('Item added to cart!', 'success');
            } catch (err) {
                console.error(err);
                showToast('Error adding item to cart.', 'error');
            }
        }

        if (wishlistBtn) {
            try {
                const res = await fetch('http://localhost:5000/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ productId })
                });
                if (res.status === 400) {
                    showToast('Item is already in your wishlist.', 'info');
                    return;
                }
                if (!res.ok) throw new Error('Failed to add item to wishlist');
                showToast('Item added to wishlist!', 'success');
            } catch (err) {
                console.error(err);
                showToast('Error adding item to wishlist.', 'error');
            }
        }
    });

    // Function to dynamically load Material Symbols CSS
    function loadMaterialSymbols() {
        if (!document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
            document.head.appendChild(link);
        }
    }
});