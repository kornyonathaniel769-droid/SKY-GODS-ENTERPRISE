const inventory = [
{     id: "1", brand: "Apple",
model: "iphone 15 pro", price:999,
isNewArrival: true,
imageUrl: "images/iphone 1.jpg"
},
{id: "2",brand:"Apple",
model: "iphone",price:1400,
isNewArrival: true,
imageUrl: "images/iphone 2.jpg"
},
{  id:"3",brand: "Apple",
model:  "iphone",price:499,
isNewArrival: true,
imageUrl: "images/iphone 3.jpg"
},
{  id: "4", brand: "Apple",
model: "air pods",price:1100,
isNewArrival: true, 
imageUrl: "images/air pods.jpg"
}
];
function renderUI() {
    const applianceGrid =
document.getElementById('applianceGrid')
     if (applianceGrid) {
        applianceGrid.innerHTML =
inventory.map(item => `
            <div class="card"
style="border:1px solid #ddd;
padding:15px; margin:10px;border-
radius:10px; text-align:center;">
                 <img src="${item.imageUrl}" style="width:50%;
max-height:200px; object-
fit:contain; border-radius:8px;">
                <h4>${item.brand} 
${item.model}</h4>
               <p
style="color:green; font-
weight:bold">$${item.price}</p>
                <button
onclick="alert('Added ${item.model}
to cart!')">Add  to Cart</button>
            </div>
        `).join('');//Fixed .join and backtick here                
     }
}
// 1. App State & Testimonials Data
const testimonials = [
    { name: "Kofi Mensah", text: "Fast delivery to Kumasi! The iPhone was brand new as promised.", stars: 5 },
    { name: "Ama Serwaa", text: "Best prices in Accra. I paid via Momo and got my TV the same day.", stars: 5 },
    { name: "David Osei", text: "SKY GODS Enterprise is legit. Great customer service on WhatsApp.", stars: 4 }
];

let cartItems = JSON.parse(localStorage.getItem('skyGodsCart')) || [];
let isDarkMode = localStorage.getItem('theme') === 'dark';

// 2. Core Functions (Cart & Theme)
function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        cartItems.push(item);
        localStorage.setItem('skyGodsCart', JSON.stringify(cartItems));
        alert(`${item.brand} ${item.model} added to cart!`);
        // If you have a cart counter UI function, call it here (e.g., updateCartCount();)
        updateCartUI();// called to update cart countand total price on the UI
    }
}
function clearCart() {
    // 1. Empty the JavaScript array
    cartItems = []; 
    
    // 2. Wipe it from the browser's memory
    localStorage.removeItem('skyGodsCart'); 
    
    // 3. Force the screen to update back to 0 and 0.00
    updateCartUI(); 
    
    alert("Cart cleared successfully!");
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// 3. UI Rendering Functions
function renderArrivals() {
    const arrivalsGrid = document.getElementById('arrivalsGrid');
    if (!arrivalsGrid) return;

    const arrivals = inventory.filter(item => item.isNewArrival);
    arrivalsGrid.innerHTML = arrivals.map(item => `
        <div class="arrival-card">
            <img src="${item.imageUrl}" alt="${item.model}">
            <p style="font-size:0.8rem; font-weight:bold;">${item.brand} ${item.model}</p>
            <button class="checkout-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
        </div>
    `).join('');
}

function renderProducts(items) {
    const applianceGrid = document.getElementById('applianceGrid');
    if (!applianceGrid) return;

    applianceGrid.innerHTML = items.map(item => `
        <div class="card" style="border:1px solid #ddd; padding:15px; margin:10px; border-radius:10px; text-align:center;">
            <img src="${item.imageUrl}" style="width:50%; max-height:200px; object-fit:contain; border-radius:8px;" alt="${item.model}">
            <h4>${item.brand} ${item.model}</h4>
            <p style="color:green; font-weight:bold;">GH₵ ${item.price}</p>
            <button class="checkout-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
        </div>
    `).join('');
}
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartCountElement && cartTotalElement) {
        // 1. Update total item count
        cartCountElement.innerText = cartItems.length;
        
        // 2. Calculate total price (Make sure your inventory objects have a .price property)
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
        
        // 3. Update total price on screen
        cartTotalElement.innerText = total.toFixed(2);
    }
}
function renderTestimonials() {
    const testimonialGrid = document.getElementById('testimonialGrid');
    if (!testimonialGrid) return;

    testimonialGrid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <p>"${t.text}"</p>
            <p><strong>- ${t.name}</strong> <span style="color:var(--accent);">${'★'.repeat(t.stars)}</span></p>
        </div>
    `).join('');
}

// Single Combined Master Render
function renderUI() {
    // Apply theme on load
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    renderArrivals();
    renderTestimonials();
    renderProducts(inventory);
}

// Start the app
renderUI();