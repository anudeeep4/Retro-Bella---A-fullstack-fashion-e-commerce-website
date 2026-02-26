// frontend/cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const fetchCartItems = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch cart items.');

            const items = await res.json();
            let total = 0;
            cartItemsContainer.innerHTML = ''; // Clear previous content

            if (items.length === 0) {
                cartItemsContainer.innerHTML = '<div class="glass-panel text-center w-100 py-5"><span class="material-symbols-outlined display-3 text-secondary mb-3">shopping_cart</span><h4 class="text-secondary">Your cart is empty.</h4></div>';
                cartTotalContainer.innerHTML = '₹0.00';
                document.getElementById('checkout-btn-container').style.display = 'none';
                return;
            }

            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'glass-list-item d-flex align-items-center p-0';
                itemElement.innerHTML = `
                    <img src="${item.Product.imageURL}" class="cart-img" alt="${item.Product.name}">
                    <div class="flex-grow-1 p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-1 text-white">${item.Product.name}</h5>
                            <p class="mb-0 text-secondary small">Qty: <span class="text-white">${item.quantity}</span></p>
                        </div>
                        <div class="text-end d-flex flex-column align-items-end justify-content-between h-100">
                            <span class="fs-5 fw-bold text-accent mb-2">₹${(item.Product.price * item.quantity).toFixed(2)}</span>
                            <button class="btn btn-outline-danger btn-sm remove-from-cart-btn px-3 rounded-pill d-flex align-items-center gap-1" data-cart-item-id="${item.id}">
                                <span class="material-symbols-outlined" style="font-size: 14px; pointer-events: none;">delete</span> Remove
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.Product.price * item.quantity;
            });

            cartTotalContainer.innerHTML = `₹${total.toFixed(2)}`;
            document.getElementById('checkout-btn-container').style.display = 'block';

        } catch (err) {
            console.error(err);
            cartItemsContainer.innerHTML = '<p class="text-danger">Could not load your cart.</p>';
        }
    };

    // Initial fetch of cart items when the page loads
    fetchCartItems();

    // ADD THIS EVENT LISTENER for the remove button
    cartItemsContainer.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('remove-from-cart-btn')) {
            const cartItemId = e.target.dataset.cartItemId;

            try {
                const res = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to remove item');
                }

                // Easiest way to update the view is to just re-fetch the cart items
                fetchCartItems();

            } catch (err) {
                console.error(err);
                showToast('Error removing item from cart.', 'error');
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
});