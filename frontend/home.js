// --- PAGE PROTECTION GUARD ---
// This code checks if a 'token' exists in the browser's storage.
const token = localStorage.getItem('token');
if (!token) {
    // If no token is found, redirect them to the login page.
    window.location.href = 'index.html';
}
const categoryCarousel = document.querySelector('#categoryCarousel');
if (categoryCarousel) {
    const carousel = new bootstrap.Carousel(categoryCarousel, {
      interval: false, // Set to false to disable auto-sliding
      wrap: true       // Allows the carousel to loop
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryCarousel = document.querySelector('#categoryCarousel');
    if (categoryCarousel) {
        const carousel = new bootstrap.Carousel(categoryCarousel, {
          interval: false, // Set to false to disable auto-sliding
          wrap: true       // Allows the carousel to loop
        });
    }
    
    // DOCK ANIMATION LOGIC
    const dock = document.querySelector('.dock');
    if (dock) {
        const dockItems = dock.querySelectorAll('.dock-item');
        const defaultItemScale = 1;
        const hoverItemScale = 1.8;
        const neighboringItemScale = 1.4;

        dock.addEventListener('mouseleave', () => {
            dockItems.forEach(item => {
                item.style.transform = `scale(${defaultItemScale})`;
            });
        });

        dockItems.forEach(item => {
            item.addEventListener('mousemove', () => {
                dockItems.forEach(otherItem => {
                    let scale = defaultItemScale;
                    if (otherItem === item) {
                        scale = hoverItemScale;
                    } else if (otherItem.previousElementSibling === item || otherItem.nextElementSibling === item) {
                        scale = neighboringItemScale;
                    }
                    otherItem.style.transform = `scale(${scale})`;
                });
            });
        });
    }

    // LOGOUT LOGIC
    const logoutButton = document.getElementById('logout-button-dock');
    if (logoutButton) 
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
});
