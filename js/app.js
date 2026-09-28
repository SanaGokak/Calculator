// ==========================================================================
// MODESTY BY SANAGKK - INTERACTIVE APPLICATION CONTROLLER
// ==========================================================================

(function() {
  'use strict';

  // Global State
  const state = {
    cart: [],
    wishlist: [],
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    currency: 'USD',
    appliedCoupon: null,
    freeShippingThresholdUSD: 150,
    quickViewProduct: null,
    checkoutStep: 1,
    checkoutData: {
      customer: {},
      shippingMethod: 'free',
      shippingCostUSD: 0,
      paymentMethod: 'card'
    }
  };

  // DOM Elements cache
  const elements = {};

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    loadStateFromStorage();
    setupEventListeners();
    renderAll();
    setupHeightSlider();
  });

  function initDOMElements() {
    elements.productsGrid = document.getElementById('products-grid');
    elements.productCount = document.getElementById('product-count');
    elements.filterCategoryBtns = document.querySelectorAll('.filter-cat-btn');
    elements.searchInput = document.getElementById('product-search-input');
    elements.sortSelect = document.getElementById('product-sort-select');
    elements.currencySelect = document.getElementById('currency-selector');
    
    // Counters
    elements.cartBadge = document.getElementById('cart-count-badge');
    elements.wishlistBadge = document.getElementById('wishlist-count-badge');
    
    // Drawers
    elements.cartDrawer = document.getElementById('cart-drawer');
    elements.wishlistDrawer = document.getElementById('wishlist-drawer');
    elements.mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    elements.drawerBackdrop = document.getElementById('drawer-backdrop');
    
    // Cart Elements
    elements.cartItemsList = document.getElementById('cart-items-list');
    elements.cartSubtotal = document.getElementById('cart-subtotal-val');
    elements.cartDiscountRow = document.getElementById('cart-discount-row');
    elements.cartDiscountVal = document.getElementById('cart-discount-val');
    elements.cartShippingVal = document.getElementById('cart-shipping-val');
    elements.cartTotalVal = document.getElementById('cart-total-val');
    elements.freeShippingProgressBar = document.getElementById('free-shipping-progress');
    elements.freeShippingMessage = document.getElementById('free-shipping-message');
    elements.promoInput = document.getElementById('promo-code-input');
    elements.applyPromoBtn = document.getElementById('apply-promo-btn');
    elements.checkoutBtn = document.getElementById('checkout-trigger-btn');
    
    // Wishlist Drawer Elements
    elements.wishlistItemsList = document.getElementById('wishlist-items-list');
    
    // Modals
    elements.quickViewModal = document.getElementById('quick-view-modal');
    elements.sizeGuideModal = document.getElementById('size-guide-modal');
    elements.checkoutModal = document.getElementById('checkout-modal');
    
    // Toast Container
    elements.toastContainer = document.getElementById('toast-container');
  }

  // ==========================================================================
  // PERSISTENCE (LocalStorage)
  // ==========================================================================
  function loadStateFromStorage() {
    try {
      const savedCart = localStorage.getItem('modesty_cart');
      if (savedCart) state.cart = JSON.parse(savedCart);

      const savedWishlist = localStorage.getItem('modesty_wishlist');
      if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);

      const savedCurrency = localStorage.getItem('modesty_currency');
      if (savedCurrency && SANAGKK_DATA.currencies[savedCurrency]) {
        state.currency = savedCurrency;
        if (elements.currencySelect) elements.currencySelect.value = savedCurrency;
      }
    } catch (e) {
      console.warn("LocalStorage access failed:", e);
    }
  }

  function saveStateToStorage() {
    try {
      localStorage.setItem('modesty_cart', JSON.stringify(state.cart));
      localStorage.setItem('modesty_wishlist', JSON.stringify(state.wishlist));
      localStorage.setItem('modesty_currency', state.currency);
    } catch (e) {
      console.warn("LocalStorage write failed:", e);
    }
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Category Filter Buttons
    elements.filterCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.filterCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.getAttribute('data-category');
        renderProducts();
      });
    });

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    // Sort Select
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Currency Switcher
    if (elements.currencySelect) {
      elements.currencySelect.addEventListener('change', (e) => {
        state.currency = e.target.value;
        saveStateToStorage();
        renderAll();
        showToast(`Currency changed to ${SANAGKK_DATA.currencies[state.currency].label}`, 'fa-globe');
      });
    }

    // Open Drawers
    document.querySelectorAll('[data-open-drawer="cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer('cart');
      });
    });

    document.querySelectorAll('[data-open-drawer="wishlist"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer('wishlist');
      });
    });

    document.querySelectorAll('[data-open-drawer="mobile-nav"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer('mobile-nav');
      });
    });

    // Close Drawers
    document.querySelectorAll('[data-close-drawer]').forEach(btn => {
      btn.addEventListener('click', closeAllDrawers);
    });

    if (elements.drawerBackdrop) {
      elements.drawerBackdrop.addEventListener('click', closeAllDrawers);
    }

    // Close Modals
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Promo Code Application
    if (elements.applyPromoBtn && elements.promoInput) {
      elements.applyPromoBtn.addEventListener('click', applyPromoCode);
      elements.promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyPromoCode();
      });
    }

    // Checkout Trigger
    if (elements.checkoutBtn) {
      elements.checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast("Your shopping bag is empty.", "fa-bag-shopping");
          return;
        }
        closeAllDrawers();
        openCheckoutModal();
      });
    }

    // Size Guide Trigger buttons
    document.querySelectorAll('[data-open-size-guide]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('size-guide-modal');
      });
    });

    // VIP Newsletter Form
    const vipForm = document.getElementById('vip-newsletter-form');
    if (vipForm) {
      vipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = vipForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          showToast(`Welcome to the SanaGKK Circle! Use code WELCOME10 for 10% off.`, 'fa-crown');
          emailInput.value = '';
          // Auto-apply or pre-fill promo code
          if (elements.promoInput) elements.promoInput.value = 'WELCOME10';
        }
      });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
          if (!isActive) item.classList.add('active');
        });
      }
    });

    // Keyboard Shortcuts (Esc closes modals, Ctrl+K focuses search)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDrawers();
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.body.classList.remove('modal-open');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
          elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // ==========================================================================
  // CURRENCY & PRICE FORMATTING
  // ==========================================================================
  function formatPrice(amountUSD) {
    const curInfo = SANAGKK_DATA.currencies[state.currency] || SANAGKK_DATA.currencies.USD;
    const converted = amountUSD * curInfo.rate;
    // Format nicely
    return `${curInfo.symbol}${Math.round(converted).toLocaleString()}`;
  }

  // ==========================================================================
  // RENDERING HELPERS
  // ==========================================================================
  function renderAll() {
    renderProducts();
    renderCart();
    renderWishlist();
    updateBadges();
  }

  function updateBadges() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (elements.cartBadge) {
      elements.cartBadge.textContent = totalItems;
      elements.cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    const wishlistCount = state.wishlist.length;
    if (elements.wishlistBadge) {
      elements.wishlistBadge.textContent = wishlistCount;
      elements.wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    }
  }

  // ==========================================================================
  // PRODUCT CATALOG RENDERING & FILTERING
  // ==========================================================================
  function renderProducts() {
    if (!elements.productsGrid) return;

    let filtered = [...SANAGKK_DATA.products];

    // Filter by Category
    if (state.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === state.activeCategory);
    }

    // Filter by Search Query
    if (state.searchQuery) {
      filtered = filtered.filter(p => {
        return (
          p.title.toLowerCase().includes(state.searchQuery) ||
          p.fabric.toLowerCase().includes(state.searchQuery) ||
          p.description.toLowerCase().includes(state.searchQuery) ||
          p.colors.some(c => c.name.toLowerCase().includes(state.searchQuery))
        );
      });
    }

    // Sort
    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === 'newest') {
      filtered.reverse();
    }

    // Update Product Count
    if (elements.productCount) {
      elements.productCount.textContent = `Showing ${filtered.length} of ${SANAGKK_DATA.products.length} garments`;
    }

    // Empty state
    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = `
        <div class="empty-products-state">
          <i class="fa-solid fa-compass-drafting"></i>
          <h3>No garments match your selection</h3>
          <p>Try searching for "Navy", "Silk", "Beige", "Kaftan", or clear filters.</p>
          <button class="btn btn-navy btn-sm" style="margin-top: 1rem;" onclick="window.clearProductFilters()">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    // Render Cards
    elements.productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

      const colorDots = product.colors.map(c => `
        <span class="color-swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
      `).join('');

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-thumb-wrap">
            <img 
              src="${product.images[0]}" 
              alt="${product.title}" 
              loading="lazy" 
              onerror="this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'"
            />
            
            <div class="product-badge-tag">
              <span class="badge-pill badge-navy">${product.badge || 'Atelier'}</span>
            </div>

            <div class="card-actions-overlay">
              <button 
                class="card-action-icon wishlist-btn ${isWishlisted ? 'wishlist-active' : ''}" 
                data-wishlist-id="${product.id}"
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                aria-label="Wishlist"
              >
                <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
              </button>
            </div>

            <button class="quick-view-hover-btn" data-quickview-id="${product.id}">
              <i class="fa-regular fa-eye"></i> Quick View
            </button>
          </div>

          <div class="product-info-wrap">
            <span class="product-fabric-tag">${product.fabric.split('&')[0]}</span>
            <h3 class="product-card-title">${product.title}</h3>

            <div class="product-rating-row">
              <span class="star-rating">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating.toFixed(1)}</span>
              </span>
              <span>(${product.reviewsCount})</span>
            </div>

            <div class="product-color-swatches">
              ${colorDots}
            </div>

            <div class="product-card-footer">
              <div class="product-price-box">
                <span class="price-current">${formatPrice(product.price)}</span>
                <span class="price-original">${formatPrice(product.originalPrice)}</span>
              </div>
              <button class="add-to-bag-quick" data-add-cart-id="${product.id}">
                Add to Bag
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners to newly rendered items
    attachProductCardListeners();
  }

  function attachProductCardListeners() {
    // Quick View buttons
    document.querySelectorAll('[data-quickview-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-quickview-id');
        openQuickView(pId);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-wishlist-id');
        toggleWishlist(pId);
      });
    });

    // Quick Add to Bag
    document.querySelectorAll('[data-add-cart-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-add-cart-id');
        const prod = SANAGKK_DATA.products.find(p => p.id === pId);
        if (prod) {
          addToCart(prod, prod.sizes[0] || 'Standard', prod.colors[0]?.name || 'Default', 1);
        }
      });
    });
  }

  window.clearProductFilters = function() {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.sortBy = 'featured';
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.sortSelect) elements.sortSelect.value = 'featured';
    elements.filterCategoryBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
    });
    renderProducts();
  };

  // ==========================================================================
  // CART ACTIONS & RENDERING
  // ==========================================================================
  function addToCart(product, size, color, quantity = 1) {
    const existingIndex = state.cart.findIndex(item => 
      item.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        priceUSD: product.price,
        image: product.images[0],
        size: size,
        color: color,
        fabric: product.fabric,
        quantity: quantity
      });
    }

    saveStateToStorage();
    renderCart();
    updateBadges();
    showToast(`Added "${product.title}" to your bag.`, 'fa-bag-shopping');
    openDrawer('cart');
  }

  function updateCartQuantity(index, delta) {
    if (state.cart[index]) {
      state.cart[index].quantity += delta;
      if (state.cart[index].quantity <= 0) {
        state.cart.splice(index, 1);
        showToast("Item removed from bag.", "fa-trash-can");
      }
      saveStateToStorage();
      renderCart();
      updateBadges();
    }
  }

  function removeFromCart(index) {
    if (state.cart[index]) {
      const title = state.cart[index].title;
      state.cart.splice(index, 1);
      saveStateToStorage();
      renderCart();
      updateBadges();
      showToast(`Removed "${title}" from bag.`, "fa-trash-can");
    }
  }

  function renderCart() {
    if (!elements.cartItemsList) return;

    if (state.cart.length === 0) {
      elements.cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--slate-500);">
          <i class="fa-solid fa-basket-shopping" style="font-size: 2.8rem; color: var(--slate-300); margin-bottom: 1rem; display: block;"></i>
          <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--navy-900); margin-bottom: 0.5rem;">Your shopping bag is empty</h4>
          <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Discover our latest collection of luxury abayas, co-ords, and silks.</p>
          <button class="btn btn-navy btn-sm" onclick="window.closeAllDrawersAndShop()">Explore Collection</button>
        </div>
      `;

      if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(0);
      if (elements.cartDiscountRow) elements.cartDiscountRow.style.display = 'none';
      if (elements.cartShippingVal) elements.cartShippingVal.textContent = 'Calculated at checkout';
      if (elements.cartTotalVal) elements.cartTotalVal.textContent = formatPrice(0);

      // Shipping Progress
      if (elements.freeShippingProgressBar) elements.freeShippingProgressBar.style.width = '0%';
      if (elements.freeShippingMessage) {
        elements.freeShippingMessage.innerHTML = `Add <strong>${formatPrice(state.freeShippingThresholdUSD)}</strong> more for FREE Worldwide Delivery.`;
      }
      return;
    }

    // Render items
    elements.cartItemsList.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'" />
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <span class="cart-item-variant">Size: ${item.size} • ${item.color}</span>
          
          <div class="cart-item-bottom">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="window.modestyApp.updateQty(${idx}, -1)" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.modestyApp.updateQty(${idx}, 1)" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            
            <span class="cart-item-price">${formatPrice(item.priceUSD * item.quantity)}</span>
            
            <button class="remove-cart-btn" onclick="window.modestyApp.removeItem(${idx})" title="Remove item" aria-label="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Totals
    const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
    let discountUSD = 0;
    if (state.appliedCoupon) {
      discountUSD = (subtotalUSD * state.appliedCoupon.discountPercent) / 100;
    }

    const qualifiesFreeShipping = subtotalUSD >= state.freeShippingThresholdUSD || (state.appliedCoupon && state.appliedCoupon.freeShipping);
    const shippingUSD = qualifiesFreeShipping ? 0 : 15;
    const totalUSD = Math.max(0, subtotalUSD - discountUSD + (qualifiesFreeShipping ? 0 : 15));

    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(subtotalUSD);

    if (elements.cartDiscountRow && elements.cartDiscountVal) {
      if (discountUSD > 0) {
        elements.cartDiscountRow.style.display = 'flex';
        elements.cartDiscountVal.textContent = `-${formatPrice(discountUSD)} (${state.appliedCoupon.code})`;
      } else {
        elements.cartDiscountRow.style.display = 'none';
      }
    }

    if (elements.cartShippingVal) {
      elements.cartShippingVal.textContent = qualifiesFreeShipping ? 'FREE' : formatPrice(15);
      elements.cartShippingVal.style.color = qualifiesFreeShipping ? 'var(--success)' : 'inherit';
    }

    if (elements.cartTotalVal) elements.cartTotalVal.textContent = formatPrice(totalUSD);

    // Free Shipping Progress
    if (elements.freeShippingProgressBar && elements.freeShippingMessage) {
      const progressPercent = Math.min(100, Math.round((subtotalUSD / state.freeShippingThresholdUSD) * 100));
      elements.freeShippingProgressBar.style.width = `${progressPercent}%`;

      if (qualifiesFreeShipping) {
        elements.freeShippingMessage.innerHTML = `<span style="color: var(--success); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> You've qualified for FREE Worldwide Express Delivery!</span>`;
      } else {
        const remainingUSD = state.freeShippingThresholdUSD - subtotalUSD;
        elements.freeShippingMessage.innerHTML = `Add <strong>${formatPrice(remainingUSD)}</strong> more to unlock <strong>FREE Worldwide Shipping</strong>!`;
      }
    }
  }

  function applyPromoCode() {
    if (!elements.promoInput) return;
    const code = elements.promoInput.value.trim().toUpperCase();

    if (!code) {
      showToast("Please enter a promotion code.", "fa-circle-exclamation");
      return;
    }

    const coupon = SANAGKK_DATA.promoCodes[code];
    if (coupon) {
      state.appliedCoupon = { code: code, ...coupon };
      renderCart();
      showToast(`Promo "${code}" applied: ${coupon.description}`, "fa-tag");
    } else {
      showToast(`Invalid code "${code}". Try "MODEST10" for 10% off.`, "fa-triangle-exclamation");
    }
  }

  window.closeAllDrawersAndShop = function() {
    closeAllDrawers();
    const shopSec = document.getElementById('shop-section');
    if (shopSec) shopSec.scrollIntoView({ behavior: 'smooth' });
  };

  // ==========================================================================
  // WISHLIST ACTIONS & RENDERING
  // ==========================================================================
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    const product = SANAGKK_DATA.products.find(p => p.id === productId);
    const prodName = product ? product.title : 'Garment';

    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed "${prodName}" from wishlist.`, 'fa-heart');
    } else {
      state.wishlist.push(productId);
      showToast(`Saved "${prodName}" to your wishlist.`, 'fa-heart');
    }

    saveStateToStorage();
    renderProducts();
    renderWishlist();
    updateBadges();
  }

  function renderWishlist() {
    if (!elements.wishlistItemsList) return;

    if (state.wishlist.length === 0) {
      elements.wishlistItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--slate-500);">
          <i class="fa-regular fa-heart" style="font-size: 2.8rem; color: var(--slate-300); margin-bottom: 1rem; display: block;"></i>
          <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--navy-900); margin-bottom: 0.5rem;">Your wishlist is empty</h4>
          <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Save your favourite silhouettes to curate your bespoke modest wardrobe.</p>
          <button class="btn btn-navy btn-sm" onclick="window.closeAllDrawersAndShop()">Explore Collection</button>
        </div>
      `;
      return;
    }

    const items = state.wishlist.map(id => SANAGKK_DATA.products.find(p => p.id === id)).filter(Boolean);

    elements.wishlistItemsList.innerHTML = items.map(product => `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${product.images[0]}" alt="${product.title}" />
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${product.title}</h4>
          <span class="cart-item-variant">${product.fabric}</span>
          <span class="cart-item-price" style="margin-top: 0.25rem;">${formatPrice(product.price)}</span>
          
          <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
            <button class="btn btn-navy btn-sm" onclick="window.modestyApp.moveWishlistToCart('${product.id}')" style="padding: 0.35rem 0.75rem; font-size: 0.72rem;">
              Move to Bag
            </button>
            <button class="remove-cart-btn" onclick="window.modestyApp.toggleWishlist('${product.id}')" title="Remove" aria-label="Remove">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // QUICK VIEW MODAL
  // ==========================================================================
  function openQuickView(productId) {
    const product = SANAGKK_DATA.products.find(p => p.id === productId);
    if (!product) return;

    state.quickViewProduct = product;
    const modal = elements.quickViewModal;
    if (!modal) return;

    let selectedSize = product.sizes[0] || 'Standard';
    let selectedColor = product.colors[0]?.name || 'Signature';

    const modalContent = modal.querySelector('.modal-card');
    modalContent.innerHTML = `
      <button class="modal-close-corner" data-close-modal="quick-view-modal" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="quickview-grid">
        <div class="quickview-gallery">
          <img id="qv-main-img" src="${product.images[0]}" alt="${product.title}" />
        </div>

        <div class="quickview-details">
          <span class="eyebrow">${product.category.toUpperCase()} • ${product.badge || 'EXCLUSIVE'}</span>
          <h2 class="quickview-title">${product.title}</h2>

          <div class="product-rating-row" style="margin-bottom: 0.75rem;">
            <span class="star-rating">
              <i class="fa-solid fa-star"></i>
              <span>${product.rating.toFixed(1)}</span>
            </span>
            <span>(${product.reviewsCount} customer reviews)</span>
          </div>

          <div class="quickview-price-row">
            <span class="price-current" style="font-size: 1.5rem;">${formatPrice(product.price)}</span>
            <span class="price-original" style="font-size: 1.1rem;">${formatPrice(product.originalPrice)}</span>
            <span class="badge-pill badge-gold" style="font-size: 0.7rem;">SAVE ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
          </div>

          <p class="quickview-desc">${product.description}</p>

          <!-- Color selection -->
          <div style="margin-bottom: 1.25rem;">
            <div class="form-group-label">
              <span>COLOR: <strong id="qv-selected-color-label" style="color: var(--navy-900);">${selectedColor}</strong></span>
            </div>
            <div style="display: flex; gap: 0.6rem;">
              ${product.colors.map((c, i) => `
                <button 
                  class="color-variant-pill ${i === 0 ? 'active' : ''}" 
                  data-color-name="${c.name}"
                  style="width: 26px; height: 26px; border-radius: 50%; background: ${c.hex}; border: 2px solid ${i === 0 ? 'var(--navy-900)' : '#FFF'}; box-shadow: 0 0 0 1px #CBD5E1; cursor: pointer;"
                  title="${c.name}"
                  aria-label="${c.name}"
                ></button>
              `).join('')}
            </div>
          </div>

          <!-- Size selection -->
          <div style="margin-bottom: 1.5rem;">
            <div class="form-group-label">
              <span>SELECT SIZE / LENGTH:</span>
              <button type="button" style="color: var(--gold-600); text-decoration: underline; font-size: 0.75rem; font-weight: 600;" onclick="window.modestyApp.openSizeGuide()">
                <i class="fa-solid fa-ruler-horizontal"></i> Size Guide
              </button>
            </div>
            <div class="size-pill-selector">
              ${product.sizes.map((s, idx) => `
                <button class="size-pill ${idx === 0 ? 'active' : ''}" data-size-val="${s}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Garment Specs -->
          <div style="background: var(--beige-50); border: 1px solid var(--beige-300); border-radius: var(--border-radius-sm); padding: 0.85rem 1rem; margin-bottom: 1.5rem; font-size: 0.78rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span style="color: var(--slate-600);">Fabric:</span>
              <strong style="color: var(--navy-900);">${product.fabric}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--slate-600);">Opacity:</span>
              <strong style="color: var(--success);"><i class="fa-solid fa-shield-halved"></i> 100% Non-Transparent Guaranteed</strong>
            </div>
          </div>

          <!-- Quantity & Actions -->
          <div class="quickview-actions-row">
            <div class="qty-stepper" style="padding: 0.35rem 0.5rem;">
              <button class="qty-btn" id="qv-qty-minus"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-val" id="qv-qty-display" style="padding: 0 0.5rem;">1</span>
              <button class="qty-btn" id="qv-qty-plus"><i class="fa-solid fa-plus"></i></button>
            </div>

            <button class="btn btn-navy btn-full" id="qv-add-cart-btn">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;

    // Reattach listeners in Quick View
    let qty = 1;
    const qtyDisplay = modalContent.querySelector('#qv-qty-display');
    modalContent.querySelector('#qv-qty-minus').addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyDisplay.textContent = qty;
      }
    });
    modalContent.querySelector('#qv-qty-plus').addEventListener('click', () => {
      qty++;
      qtyDisplay.textContent = qty;
    });

    // Color picks
    modalContent.querySelectorAll('.color-variant-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        modalContent.querySelectorAll('.color-variant-pill').forEach(p => p.style.borderColor = '#FFF');
        pill.style.borderColor = 'var(--navy-900)';
        selectedColor = pill.getAttribute('data-color-name');
        const label = modalContent.querySelector('#qv-selected-color-label');
        if (label) label.textContent = selectedColor;
      });
    });

    // Size picks
    modalContent.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        modalContent.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSize = pill.getAttribute('data-size-val');
      });
    });

    // Add to cart from QV
    modalContent.querySelector('#qv-add-cart-btn').addEventListener('click', () => {
      addToCart(product, selectedSize, selectedColor, qty);
      closeModal('quick-view-modal');
    });

    modalContent.querySelector('[data-close-modal="quick-view-modal"]').addEventListener('click', () => {
      closeModal('quick-view-modal');
    });

    openModal('quick-view-modal');
  }

  // ==========================================================================
  // SIZE GUIDE SLIDER & CALCULATOR
  // ==========================================================================
  function setupHeightSlider() {
    const slider = document.getElementById('height-calc-slider');
    const heightDisplay = document.getElementById('height-calc-display');
    const recSizeDisplay = document.getElementById('rec-size-output');
    const recDescDisplay = document.getElementById('rec-size-desc');

    if (!slider || !heightDisplay || !recSizeDisplay) return;

    function updateSizeCalc() {
      const heightInches = parseInt(slider.value, 10);
      const feet = Math.floor(heightInches / 12);
      const inches = heightInches % 12;
      const cm = Math.round(heightInches * 2.54);

      heightDisplay.textContent = `${feet}'${inches}" (${cm} cm)`;

      let recSize = "56";
      let desc = "Standard length, gracefully falls right above ankle.";

      if (heightInches <= 62) { // <= 5'2"
        recSize = "52";
        desc = "Tailored for petite height (5'0\" - 5'2\"). Prevents fabric drag.";
      } else if (heightInches <= 64) { // 5'3" - 5'4"
        recSize = "54";
        desc = "Perfect floor-grazing length for 5'3\" to 5'4\".";
      } else if (heightInches <= 66) { // 5'5" - 5'6"
        recSize = "56";
        desc = "Our classic medium tall fit (5'5\" to 5'6\").";
      } else if (heightInches <= 68) { // 5'7" - 5'8"
        recSize = "58";
        desc = "Elongated silhouette tailored for taller frames (5'7\" to 5'8\").";
      } else { // 5'9"+
        recSize = "60";
        desc = "Tall / Statuesque cut (5'9\" - 6'0\") ensuring modesty while walking.";
      }

      recSizeDisplay.textContent = recSize;
      if (recDescDisplay) recDescDisplay.textContent = desc;
    }

    slider.addEventListener('input', updateSizeCalc);
    updateSizeCalc();
  }

  // ==========================================================================
  // SIMULATED CHECKOUT MODAL FLOW
  // ==========================================================================
  function openCheckoutModal() {
    state.checkoutStep = 1;
    renderCheckoutStep();
    openModal('checkout-modal');
  }

  function renderCheckoutStep() {
    const modal = elements.checkoutModal;
    if (!modal) return;

    const body = modal.querySelector('#checkout-modal-body');
    const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
    const qualifiesFree = subtotalUSD >= state.freeShippingThresholdUSD || (state.appliedCoupon && state.appliedCoupon.freeShipping);
    const shippingUSD = state.checkoutData.shippingCostUSD;
    const discountUSD = state.appliedCoupon ? (subtotalUSD * state.appliedCoupon.discountPercent) / 100 : 0;
    const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

    // Update Steps indicator
    const steps = modal.querySelectorAll('.step-node');
    steps.forEach((st, idx) => {
      st.classList.remove('active', 'completed');
      if (idx + 1 === state.checkoutStep) st.classList.add('active');
      else if (idx + 1 < state.checkoutStep) st.classList.add('completed');
    });

    if (state.checkoutStep === 1) {
      body.innerHTML = `
        <h4 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--navy-900); margin-bottom: 0.25rem;">1. Shipping & Delivery Address</h4>
        <p style="font-size: 0.82rem; color: var(--slate-600); margin-bottom: 1.5rem;">Enter your destination details for insured express delivery.</p>

        <form id="step-1-form">
          <div class="form-row">
            <div class="form-field">
              <label>First Name *</label>
              <input type="text" id="chk-fname" required value="${state.checkoutData.customer.firstName || 'Sarah'}" placeholder="e.g. Sarah" />
            </div>
            <div class="form-field">
              <label>Last Name *</label>
              <input type="text" id="chk-lname" required value="${state.checkoutData.customer.lastName || 'Al-Mansoor'}" placeholder="e.g. Al-Mansoor" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Email Address (For Tracking & Invoice) *</label>
              <input type="email" id="chk-email" required value="${state.checkoutData.customer.email || 'sarah.mansoor@example.com'}" placeholder="you@domain.com" />
            </div>
            <div class="form-field">
              <label>Phone Number *</label>
              <input type="tel" id="chk-phone" required value="${state.checkoutData.customer.phone || '+1 (555) 349-2910'}" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div class="form-field" style="margin-bottom: 1.25rem;">
            <label>Street Address *</label>
            <input type="text" id="chk-address" required value="${state.checkoutData.customer.address || '742 Evergreen Atelier Crescent'}" placeholder="Apartment, suite, unit, etc." />
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>City *</label>
              <input type="text" id="chk-city" required value="${state.checkoutData.customer.city || 'Dubai'}" placeholder="Dubai / London / New York" />
            </div>
            <div class="form-field">
              <label>Country *</label>
              <select id="chk-country">
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--slate-200);">
            <span style="font-size: 0.84rem; color: var(--slate-600);">Items in bag: <strong>${state.cart.length}</strong></span>
            <button type="submit" class="btn btn-navy">
              Continue to Shipping <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      `;

      body.querySelector('#step-1-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.checkoutData.customer = {
          firstName: body.querySelector('#chk-fname').value,
          lastName: body.querySelector('#chk-lname').value,
          email: body.querySelector('#chk-email').value,
          phone: body.querySelector('#chk-phone').value,
          address: body.querySelector('#chk-address').value,
          city: body.querySelector('#chk-city').value,
          country: body.querySelector('#chk-country').value
        };
        state.checkoutStep = 2;
        renderCheckoutStep();
      });

    } else if (state.checkoutStep === 2) {
      body.innerHTML = `
        <h4 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--navy-900); margin-bottom: 0.25rem;">2. Select Shipping Method</h4>
        <p style="font-size: 0.82rem; color: var(--slate-600); margin-bottom: 1.5rem;">All packages are shipped in SanaGKK luxury keepsake packaging with tracking.</p>

        <div class="shipping-radio-group">
          <label class="shipping-option ${qualifiesFree || state.checkoutData.shippingMethod === 'standard' ? 'selected' : ''}">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <input type="radio" name="shippingMethod" value="standard" ${qualifiesFree || state.checkoutData.shippingMethod === 'standard' ? 'checked' : ''} />
              <div>
                <strong style="color: var(--navy-900); display: block; font-size: 0.9rem;">SanaGKK Insured Standard Courier</strong>
                <span style="font-size: 0.75rem; color: var(--slate-500);">3-5 Business Days • Global Courier with SMS Tracking</span>
              </div>
            </div>
            <strong style="color: ${qualifiesFree ? 'var(--success)' : 'var(--navy-900)'};">${qualifiesFree ? 'FREE' : formatPrice(15)}</strong>
          </label>

          <label class="shipping-option ${state.checkoutData.shippingMethod === 'express' ? 'selected' : ''}">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <input type="radio" name="shippingMethod" value="express" ${state.checkoutData.shippingMethod === 'express' ? 'checked' : ''} />
              <div>
                <strong style="color: var(--navy-900); display: block; font-size: 0.9rem;">DHL VIP White Glove Priority Express</strong>
                <span style="font-size: 0.75rem; color: var(--slate-500);">1-2 Business Days • Guaranteed Time-Definite Air Freight</span>
              </div>
            </div>
            <strong style="color: var(--navy-900);">${formatPrice(28)}</strong>
          </label>
        </div>

        <div style="background: var(--beige-50); border: 1px solid var(--beige-300); border-radius: var(--border-radius-sm); padding: 1rem 1.25rem; margin-bottom: 1.5rem; font-size: 0.82rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <span>Subtotal:</span>
            <strong>${formatPrice(subtotalUSD)}</strong>
          </div>
          ${discountUSD > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: var(--success);">
              <span>Promotion (${state.appliedCoupon.code}):</span>
              <strong>-${formatPrice(discountUSD)}</strong>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <span>Shipping:</span>
            <strong id="chk-shipping-display">${state.checkoutData.shippingCostUSD === 0 ? 'FREE' : formatPrice(state.checkoutData.shippingCostUSD)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem; color: var(--navy-900); padding-top: 0.5rem; border-top: 1px solid var(--beige-300);">
            <span>Order Total:</span>
            <strong id="chk-total-display">${formatPrice(finalTotalUSD)}</strong>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
          <button type="button" class="btn btn-beige btn-sm" onclick="window.modestyApp.goToStep(1)">
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>
          <button type="button" class="btn btn-navy" id="to-payment-btn">
            Continue to Payment <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;

      // Radio change handler
      body.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', () => {
          body.querySelectorAll('.shipping-option').forEach(op => op.classList.remove('selected'));
          radio.closest('.shipping-option').classList.add('selected');
          
          if (radio.value === 'express') {
            state.checkoutData.shippingMethod = 'express';
            state.checkoutData.shippingCostUSD = 28;
          } else {
            state.checkoutData.shippingMethod = 'standard';
            state.checkoutData.shippingCostUSD = qualifiesFree ? 0 : 15;
          }
          
          const newTotal = Math.max(0, subtotalUSD - discountUSD + state.checkoutData.shippingCostUSD);
          body.querySelector('#chk-shipping-display').textContent = state.checkoutData.shippingCostUSD === 0 ? 'FREE' : formatPrice(state.checkoutData.shippingCostUSD);
          body.querySelector('#chk-total-display').textContent = formatPrice(newTotal);
        });
      });

      body.querySelector('#to-payment-btn').addEventListener('click', () => {
        state.checkoutStep = 3;
        renderCheckoutStep();
      });

    } else if (state.checkoutStep === 3) {
      body.innerHTML = `
        <h4 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--navy-900); margin-bottom: 0.25rem;">3. Secure Payment</h4>
        <p style="font-size: 0.82rem; color: var(--slate-600); margin-bottom: 1.5rem;">All transactions are encrypted with 256-bit bank-grade SSL security.</p>

        <div class="payment-radio-group">
          <div class="payment-option-card ${state.checkoutData.paymentMethod === 'card' ? 'selected' : ''}" data-pay-method="card">
            <i class="fa-solid fa-credit-card" style="font-size: 1.25rem; margin-bottom: 0.4rem; display: block;"></i>
            Credit / Debit Card
          </div>
          <div class="payment-option-card ${state.checkoutData.paymentMethod === 'applepay' ? 'selected' : ''}" data-pay-method="applepay">
            <i class="fa-brands fa-apple" style="font-size: 1.35rem; margin-bottom: 0.4rem; display: block;"></i>
            Apple / Google Pay
          </div>
          <div class="payment-option-card ${state.checkoutData.paymentMethod === 'cod' ? 'selected' : ''}" data-pay-method="cod">
            <i class="fa-solid fa-hand-holding-dollar" style="font-size: 1.25rem; margin-bottom: 0.4rem; display: block;"></i>
            Cash on Delivery
          </div>
        </div>

        <form id="step-3-form">
          <div id="credit-card-fields">
            <div class="form-field" style="margin-bottom: 1.25rem;">
              <label>Cardholder Name *</label>
              <input type="text" required value="${state.checkoutData.customer.firstName || ''} ${state.checkoutData.customer.lastName || ''}" placeholder="Name as printed on card" />
            </div>

            <div class="form-field" style="margin-bottom: 1.25rem;">
              <label>Card Number *</label>
              <div style="position: relative;">
                <input type="text" required value="4242 •••• •••• 4242" placeholder="4532 0000 0000 0000" maxlength="19" />
                <i class="fa-brands fa-cc-visa" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; color: var(--navy-900);"></i>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label>Expiration (MM/YY) *</label>
                <input type="text" required value="12/28" placeholder="MM/YY" maxlength="5" />
              </div>
              <div class="form-field">
                <label>CVV / CVC *</label>
                <input type="password" required value="888" placeholder="3 or 4 digits" maxlength="4" />
              </div>
            </div>
          </div>

          <div style="background: var(--navy-900); color: var(--beige-100); border-radius: var(--border-radius-sm); padding: 1.25rem; margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-500); display: block;">Final Payable Amount:</span>
              <strong style="font-size: 1.4rem; color: var(--beige-100);">${formatPrice(finalTotalUSD)}</strong>
            </div>
            <div style="font-size: 0.72rem; color: var(--slate-400); text-align: right;">
              <i class="fa-solid fa-lock"></i> 256-Bit Encrypted
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
            <button type="button" class="btn btn-beige btn-sm" onclick="window.modestyApp.goToStep(2)">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button type="submit" class="btn btn-navy" id="complete-order-btn">
              <i class="fa-solid fa-check"></i> Authorize & Place Order
            </button>
          </div>
        </form>
      `;

      // Payment method toggles
      body.querySelectorAll('.payment-option-card').forEach(card => {
        card.addEventListener('click', () => {
          body.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          const method = card.getAttribute('data-pay-method');
          state.checkoutData.paymentMethod = method;
          const ccFields = body.querySelector('#credit-card-fields');
          if (method === 'card') {
            ccFields.style.display = 'block';
          } else {
            ccFields.style.display = 'none';
          }
        });
      });

      body.querySelector('#step-3-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = body.querySelector('#complete-order-btn');
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Payment...`;
        submitBtn.disabled = true;

        setTimeout(() => {
          state.checkoutStep = 4;
          renderCheckoutStep();
          // Clear cart on successful order
          state.cart = [];
          saveStateToStorage();
          renderCart();
          updateBadges();
        }, 1200);
      });

    } else if (state.checkoutStep === 4) {
      // Order Confirmation
      const orderId = 'SG-' + Math.floor(100000 + Math.random() * 900000);
      body.innerHTML = `
        <div class="order-success-screen">
          <div class="success-icon-wrap">
            <i class="fa-solid fa-check"></i>
          </div>

          <span class="eyebrow" style="color: var(--success);">ORDER CONFIRMED</span>
          <h3 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Shukran, ${state.checkoutData.customer.firstName || 'Valued Guest'}</h3>
          <p style="font-size: 0.92rem; color: var(--slate-600); max-width: 480px; margin: 0 auto 1rem auto;">
            Your bespoke Modesty by SanaGKK order has been placed. We have sent a detailed receipt and tracking confirmation to <strong>${state.checkoutData.customer.email || 'your email'}</strong>.
          </p>

          <div class="order-number-box">
            ORDER REFERENCE: ${orderId}
          </div>

          <div style="background: var(--beige-50); border: 1px solid var(--beige-300); border-radius: var(--border-radius-md); padding: 1.25rem; max-width: 500px; margin: 1.5rem auto; text-align: left; font-size: 0.82rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
              <span>Delivery To:</span>
              <strong>${state.checkoutData.customer.firstName} ${state.checkoutData.customer.lastName}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
              <span>Destination:</span>
              <strong>${state.checkoutData.customer.city}, ${state.checkoutData.customer.country}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
              <span>Estimated Delivery:</span>
              <strong style="color: var(--navy-900);">3-5 Business Days via Tracked Express</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid var(--beige-300);">
              <span>Keepsake Packaging:</span>
              <strong style="color: var(--gold-600);">Complimentary SanaGKK Dustbag Included</strong>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
            <button class="btn btn-navy" onclick="window.modestyApp.printReceipt('${orderId}')">
              <i class="fa-solid fa-print"></i> Print Receipt
            </button>
            <button class="btn btn-beige" onclick="window.modestyApp.finishCheckout()">
              Continue Shopping
            </button>
          </div>
        </div>
      `;
    }
  }

  // ==========================================================================
  // DRAWER & MODAL MANAGEMENT
  // ==========================================================================
  function openDrawer(drawerName) {
    closeAllDrawers();
    if (elements.drawerBackdrop) elements.drawerBackdrop.classList.add('active');
    document.body.classList.add('modal-open');

    if (drawerName === 'cart' && elements.cartDrawer) {
      elements.cartDrawer.classList.add('active');
    } else if (drawerName === 'wishlist' && elements.wishlistDrawer) {
      elements.wishlistDrawer.classList.add('active');
    } else if (drawerName === 'mobile-nav' && elements.mobileNavDrawer) {
      elements.mobileNavDrawer.classList.add('active');
    }
  }

  function closeAllDrawers() {
    if (elements.cartDrawer) elements.cartDrawer.classList.remove('active');
    if (elements.wishlistDrawer) elements.wishlistDrawer.classList.remove('active');
    if (elements.mobileNavDrawer) elements.mobileNavDrawer.classList.remove('active');
    if (elements.drawerBackdrop) elements.drawerBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, iconClass = 'fa-circle-check') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <div class="toast-msg">${message}</div>
    `;

    elements.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 3.8s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3800);
  }

  // ==========================================================================
  // GLOBAL WINDOW EXPORTS
  // ==========================================================================
  window.modestyApp = {
    addToCart,
    updateQty: (idx, delta) => updateCartQuantity(idx, delta),
    removeItem: (idx) => removeFromCart(idx),
    toggleWishlist: (pId) => toggleWishlist(pId),
    moveWishlistToCart: (pId) => {
      const prod = SANAGKK_DATA.products.find(p => p.id === pId);
      if (prod) {
        addToCart(prod, prod.sizes[0] || 'Standard', prod.colors[0]?.name || 'Default', 1);
        toggleWishlist(pId);
      }
    },
    openQuickView: (pId) => openQuickView(pId),
    openSizeGuide: () => {
      closeModal('quick-view-modal');
      openModal('size-guide-modal');
    },
    goToStep: (step) => {
      state.checkoutStep = step;
      renderCheckoutStep();
    },
    printReceipt: (orderId) => {
      window.print();
    },
    finishCheckout: () => {
      closeModal('checkout-modal');
    },
    showToast
  };

})();
