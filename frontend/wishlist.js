// frontend/wishlist.js
document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const fetchWishlistItems = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/wishlist', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch wishlist items.');

            const items = await res.json();
            wishlistItemsContainer.innerHTML = '';

            if (items.length === 0) {
                wishlistItemsContainer.innerHTML = '<div class="glass-panel text-center w-100 py-5" style="grid-column: 1 / -1;"><span class="material-symbols-outlined display-3 text-secondary mb-3">favorite</span><h4 class="text-secondary">Your wishlist is empty.</h4></div>';
                return;
            }

            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'grid-item'; // Symmetrical grid layout

                // Add error checking for item.Product and default values just in case
                const product = item.Product || {};
                const name = product.name || 'Unknown Product';
                const price = product.price ? product.price.toFixed(2) : '0.00';
                const imageUrl = product.imageURL || '/frontend/pics/placeholder.jpg'; // Assuming there's a placeholder image

                // Use a slightly modified version of the glass-product-card for wishlist items
                itemElement.innerHTML = `
                    <div class="glass-product-card h-100">
                        <div class="position-relative overflow-hidden w-100">
                            <img src="${imageUrl}" class="w-100" alt="${name}">
                             <button class="btn btn-danger rounded-circle shadow-sm position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center remove-from-wishlist-btn" title="Remove from wishlist" style="width: 40px; height: 40px; z-index: 2;" data-wishlist-item-id="${item.id}">
                                <span class="material-symbols-outlined" style="pointer-events: none;">delete</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <div class="price mt-auto mb-3">₹${price}</div>
                            <button class="btn btn-premium w-100 add-to-cart-btn" data-product-id="${product.id}">
                                <span class="material-symbols-outlined me-2 align-middle">shopping_cart</span> Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                wishlistItemsContainer.appendChild(itemElement);
            });

        } catch (err) {
            console.error(err);
            wishlistItemsContainer.innerHTML = '<p class="text-danger">Could not load your wishlist.</p>';
        }
    };

    fetchWishlistItems();

    // Event listener for the remove button
    wishlistItemsContainer.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('remove-from-wishlist-btn')) {
            const wishlistItemId = e.target.dataset.wishlistItemId;

            try {
                const res = await fetch(`http://localhost:5000/api/wishlist/${wishlistItemId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) throw new Error('Failed to remove item');

                // Re-fetch the wishlist to update the view
                fetchWishlistItems();

            } catch (err) {
                console.error(err);
                showToast('Error removing item from wishlist.', 'error');
            }
        }
    });

    // Logout Logic
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
    wishlistItemsContainer.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('remove-from-wishlist-btn')) {
            const wishlistItemId = e.target.dataset.wishlistItemId;

            // This part sends the DELETE request to your server
            try {
                const res = await fetch(`http://localhost:5000/api/wishlist/${wishlistItemId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) throw new Error('Failed to remove item');

                // This refreshes the wishlist on the page
                fetchWishlistItems();

            } catch (err) {
                console.error(err);
                showToast('Error removing item from wishlist.', 'error');
            }
        }
    });
});