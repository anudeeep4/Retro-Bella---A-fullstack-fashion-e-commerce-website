// frontend/checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const checkoutItemsContainer = document.getElementById('checkout-items');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('place-order-btn');

    let orderTotal = 0;

    // Load Cart Items for Summary
    const fetchCartSummary = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch cart items');

            const items = await res.json();

            if (items.length === 0) {
                showToast('Your cart is empty. Redirecting...', 'info');
                setTimeout(() => { window.location.href = 'cart.html'; }, 2000);
                return;
            }

            checkoutItemsContainer.innerHTML = '';
            orderTotal = 0;

            items.forEach(item => {
                const itemTotal = item.Product.price * item.quantity;
                orderTotal += itemTotal;

                const itemEl = document.createElement('div');
                itemEl.className = 'd-flex align-items-center gap-3';
                itemEl.innerHTML = `
                    <div style="width: 60px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid var(--glass-border); flex-shrink: 0;">
                        <img src="${item.Product.imageURL}" class="w-100 h-100" style="object-fit: cover;" alt="${item.Product.name}">
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-0 text-white text-truncate" style="max-width: 150px;">${item.Product.name}</h6>
                        <small class="text-secondary">Qty: ${item.quantity}</small>
                    </div>
                    <div class="fw-bold text-white">
                        ₹${itemTotal.toFixed(2)}
                    </div>
                `;
                checkoutItemsContainer.appendChild(itemEl);
            });

            const formattedTotal = `₹${orderTotal.toFixed(2)}`;
            summarySubtotal.textContent = formattedTotal;
            summaryTotal.textContent = formattedTotal;

        } catch (err) {
            console.error(err);
            checkoutItemsContainer.innerHTML = '<div class="text-danger text-center py-3">Failed to load order summary.</div>';
            showToast('Could not load order details.', 'error');
        }
    };

    fetchCartSummary();

    // Prevent default form submission and simulate order placement
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable button to prevent double submission
        placeOrderBtn.disabled = true;
        const originalText = placeOrderBtn.innerHTML;
        placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';

        // Simulate API delay
        setTimeout(() => {
            showToast('Order placed successfully! 🎉', 'success', 3000);

            // Redirect to home after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2500);

        }, 1500);
    });
});
