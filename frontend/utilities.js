// frontend/utilities.js

/**
 * Displays a premium, glassmorphic toast notification.
 * @param {string} message - The text to display.
 * @param {string} type - 'success', 'error', 'info' (influences border/icon color).
 * @param {number} duration - How long the toast stays visible in ms.
 */
function showToast(message, type = 'success', duration = 3000) {
    // 1. Ensure a container exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed d-flex flex-column gap-3';
        // Position at bottom right
        container.style.bottom = '2rem';
        container.style.right = '2rem';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    // 2. Determine styling based on type
    let iconName = 'check_circle';
    let borderColor = 'rgba(0, 240, 255, 0.4)'; // Default cyan/success
    let iconClass = 'text-accent';

    if (type === 'error') {
        iconName = 'error';
        borderColor = 'rgba(255, 51, 102, 0.6)'; // Error red
        iconClass = 'text-danger';
    } else if (type === 'info') {
        iconName = 'info';
        borderColor = 'rgba(255, 255, 255, 0.2)'; // Neutral
        iconClass = 'text-white';
    }

    // 3. Create the toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification glass-panel d-flex align-items-center gap-3 py-3 px-4';
    toast.style.borderColor = borderColor;

    // Animate in
    toast.style.animation = 'slideInRight 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';

    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconClass} fs-4">${iconName}</span>
        <div class="toast-message text-white m-0 fw-medium">${message}</div>
    `;

    // 4. Add to container
    container.appendChild(toast);

    // 5. Remove after duration
    setTimeout(() => {
        // Animate out
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            toast.remove();
            // Clean up container if empty
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, duration);
}

// Make globally available
window.showToast = showToast;
