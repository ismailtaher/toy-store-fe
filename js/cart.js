// js/cart.js

// Initialize cart from localStorage or empty array
function getCart() {
    return JSON.parse(localStorage.getItem('toyStoreCart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('toyStoreCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(slug, quantity = 1) {
    let cart = getCart();
    const product = getProductBySlug(slug);
    
    if (!product) return;

    const existingItem = cart.find(item => item.slug === slug);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0], // Store main image reference
            quantity: quantity
        });
    }

    saveCart(cart);
    updateCartUI();
    
    // Optional: Show a brief toast/alert here
    showToast(`${product.name} added to cart!`);
}

// Remove item
function removeFromCart(slug) {
    let cart = getCart();
    cart = cart.filter(item => item.slug !== slug);
    saveCart(cart);
    updateCartUI();
}

// Get total item count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Compute total price
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart counter in the navigation
function updateCartUI() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartItemCount();
    countElements.forEach(el => {
        el.textContent = count;
        // Basic animation effect
        el.style.transform = 'scale(1.2)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    });
}

// Simple toast notification system
let toastTimeout;
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, 50px)';
        toast.style.opacity = '0';
        toast.style.pointerEvents = 'none';
        toast.style.background = 'var(--dark-color)';
        toast.style.color = 'var(--white)';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '50px';
        toast.style.zIndex = '1000';
        toast.style.transition = 'all 0.3s ease';
        toast.style.boxShadow = 'var(--shadow-lg)';
        toast.style.textAlign = 'center';
        toast.style.maxWidth = '90%';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    
    if (toastTimeout) clearTimeout(toastTimeout);
    
    // Force a small delay to ensure the DOM updates before animating in
    setTimeout(() => {
        toast.style.transform = 'translate(-50%, 0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Animate out
    toastTimeout = setTimeout(() => {
        toast.style.transform = 'translate(-50%, 50px)';
        toast.style.opacity = '0';
    }, 3000);
}

// Initialize UI on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
