const products = [
    {
        id: 1,
        title: "Apple Watch Series 9",
        category: "Tech",
        price: "$399.00",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Sony WH-1000XM5",
        category: "Audio",
        price: "$348.00",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Minimalist Leather Backpack",
        category: "Fashion",
        price: "$145.00",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Nike Air Max 270",
        category: "Footwear",
        price: "$160.00",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Aura Smart Ring",
        category: "Tech",
        price: "$199.00",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1611078714088-757e7d9b93fc?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Aesop Resurrection Balm",
        category: "Lifestyle",
        price: "$31.00",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Pro 4K Drone Explorer",
        category: "Tech",
        price: "$899.00",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 8,
        title: "Geometric Ceramic Vase",
        category: "Home",
        price: "$85.00",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612086300185-508544cb4820?q=80&w=800&auto=format&fit=crop"
    }
];

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    products.forEach((product, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animation = `slideUp 0.6s ease-out ${i * 0.1}s backwards`;
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="card-actions">
                    <button class="action-btn" title="Add to Wishlist"><i class="ph ph-heart"></i></button>
                    <button class="action-btn" title="Add to Cart" onclick="addToCart('${product.title.replace(/'/g, "\\'")}')"><i class="ph ph-shopping-cart-simple"></i></button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-bottom">
                    <div class="product-price">${product.price}</div>
                    <div class="product-rating">
                        <i class="ph-fill ph-star"></i>
                        <span>${product.rating}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize effects and renders
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Product Grid
    renderProducts();

    // 2. Scroll effect for navbar glassmorphism
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)';
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(255, 255, 255, 0.75)';
        }
    });

    // 3. Simple filter interactivity
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // add to clicked
            btn.classList.add('active');
            
            // Re-trigger animation on product grid
            const gridCards = document.querySelectorAll('.product-card');
            gridCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = `slideUp 0.5s ease-out ${index * 0.05}s backwards`;
            });
        });
    });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

function showCart() {
  let message = "Your Cart:\n\n";
  if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
  }
  cart.forEach((item, index) => {
    message += (index + 1) + "- " + item + "\n";
  });
  alert(message);
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

window.onload = updateCartUI;
