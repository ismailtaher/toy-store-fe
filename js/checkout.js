// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Checkout Summary
    const summaryContainer = document.getElementById('checkoutSummary');
    const cart = getCart();

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let summaryItems = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        summaryItems += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.95rem;">
                <span>${item.name} <span style="color: var(--text-light)">x ${item.quantity}</span></span>
                <span>${formatPrice(itemTotal)}</span>
            </div>
        `;
    });

    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem;">
                ${summaryItems}
            </div>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>Rs. 300</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total:</span>
                <span style="color: var(--primary-color);">${formatPrice(total + 300)}</span>
            </div>
        `;
    }

    // 2. Setup Location Dropdowns
    const pakistanLocations = {
        "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha", "Gujrat", "Sheikhupura", "Other"],
        "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas", "Jacobabad", "Other"],
        "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad", "Mingora", "Kohat", "Bannu", "Swabi", "Dera Ismail Khan", "Other"],
        "Balochistan": ["Quetta", "Turbat", "Khuzdar", "Hub", "Chaman", "Gwadar", "Zhob", "Other"],
        "Islamabad Capital Territory": ["Islamabad"],
        "Gilgit-Baltistan": ["Gilgit", "Skardu", "Chilas", "Hunza", "Other"],
        "Azad Kashmir": ["Muzaffarabad", "Mirpur", "Kotli", "Bhimber", "Rawalakot", "Other"]
    };

    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');

    if (provinceSelect && citySelect) {
        // Populate Provinces
        Object.keys(pakistanLocations).forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });

        // Handle Province Change
        provinceSelect.addEventListener('change', function () {
            const selectedProvince = this.value;
            // Reset City Dropdown
            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';

            if (selectedProvince && pakistanLocations[selectedProvince]) {
                pakistanLocations[selectedProvince].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                citySelect.disabled = false;
            } else {
                citySelect.disabled = true;
            }
        });
    }

    // 3. Handle Form Submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing... <i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i>';

            // Generate Order ID
            const orderId = 'ORD-' + Date.now().toString().slice(-6);

            // Gather Data
            const formData = {
                order_id: orderId,
                name: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                province: document.getElementById('province').value,
                city: document.getElementById('city').value,
                address: document.getElementById('address').value,
                notes: document.getElementById('notes').value,
                total: formatPrice(total + 300),
                items: cart.map(i => `${i.name} (x${i.quantity})`).join(', '),
                timestamp: new Date().toISOString(),
                secret_key: 'TOY_STORE_SECURE_123'
            };

            try {
                // Step 1: Send via EmailJS (using placeholders since requested)
                // Initialize with dummy public key
                // emailjs.init("YOUR_PUBLIC_KEY");
                // await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                //     to_name: "Admin",
                //     customer_name: formData.name,
                //     customer_phone: formData.phone,
                //     city: formData.city,
                //     address: formData.address,
                //     order_id: formData.order_id,
                //     items: formData.items,
                //     total: formData.total,
                //     notes: formData.notes
                // });

                // Step 2: Save to Google Sheets via Apps Script (Dummy Fetch)
                // const googleScriptURL = "YOUR_APPS_SCRIPT_WEB_APP_URL";
                // await fetch(googleScriptURL, {
                //     method: 'POST',
                //     body: JSON.stringify(formData),
                //     headers: { 'Content-Type': 'application/json' }
                // });

                // Simulate network request delay for UX
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success State!
                // Clear cart
                localStorage.removeItem('toyStoreCart');
                updateCartUI();

                // Show Success Screen
                document.getElementById('checkoutMain').style.display = 'none';
                document.getElementById('orderIdDisplay').textContent = orderId;
                const successMsg = document.getElementById('successMessage');
                successMsg.style.display = 'block';

                // Scroll to top
                window.scrollTo(0, 0);

            } catch (error) {
                console.error("Order processing error:", error);
                alert("There was an error processing your order. Please try again or contact us on WhatsApp.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Place Order (COD) <i class="ri-checkbox-circle-line"></i>';
            }
        });
    }
});

// Adding spin animation dynamically for the loader
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
