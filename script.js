/* Tasty Bites Restaurant — vanilla JS */
/* Handles: nav toggle, year stamp, team rendering, menu, cart, and contact form validation */

const FORM_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/sadiqabdulmumini124@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  // Each feature checks for its page element before starting, so this shared
  // script can run safely on every page of the site.

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ---- Year in footer ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Menu page: filter + search ----
  const grid = document.getElementById("menu-grid");
  if (grid) initMenu(grid);
  // ---- Team page: load member records ----
  const teamGrid = document.getElementById("team-grid");
  if (teamGrid) initTeam(teamGrid);
  // ---- Cart: load + init ----
  initCart();
  // ---- Contact page: form validation ----
  const form = document.getElementById("contact-form");
  if (form) initContactForm(form);
});

/* ===========================================================
   TEAM DATA + RENDER
   =========================================================== */
async function initTeam(grid) {
  try {
    // Team records live in one JSON file so new members can be added without
    // copying and editing HTML card markup.
    const response = await fetch("team.json");
    if (!response.ok) throw new Error(`Unable to load team data (${response.status})`);

    const members = await response.json();
    if (!Array.isArray(members)) throw new Error("Team data must be an array");

    // Convert every JSON record into a card, then insert all cards at once.
    grid.innerHTML = members.map(renderTeamMember).join("");
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<p class="team-status team-error">Team information could not be loaded.</p>`;
  }
}

function renderTeamMember(member) {
  // Contact details are optional, so only display links that exist.
  const email = member.email
    ? `<a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>`
    : "";
  const phone = member.phone
    ? `<a href="tel:${escapeHtml(member.phone.replace(/\s+/g, ""))}">${escapeHtml(member.phone)}</a>`
    : "";
  const linkedin = member.linkedin
    ? `<a href="${escapeHtml(member.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn profile</a>`
    : "";
  const links = [email, phone, linkedin].filter(Boolean).join("<br/>");

  return `
    <article class="member member-featured">
      <div class="avatar">
        <img src="${escapeHtml(member.image)}" alt="${escapeHtml(member.fullName)}" loading="lazy" />
      </div>
      <h3>${escapeHtml(member.fullName)}</h3>
      <p class="role"><strong>Role in the Project:</strong> ${escapeHtml(member.role)}</p>
      <p class="meta">
        <strong>ID Number:</strong> ${escapeHtml(member.idNumber)}<br/>
        <strong>Level:</strong> ${escapeHtml(member.level)}<br/>
        <strong>Programme/Department:</strong> ${escapeHtml(member.programme)}<br/>
        <strong>Faculty:</strong> ${escapeHtml(member.faculty)}<br/>
        <strong>Institution:</strong> ${escapeHtml(member.institution)}
      </p>
      <p class="bio">${escapeHtml(member.bio)}</p>
      ${links ? `<p class="links">${links}</p>` : ""}
    </article>
  `;
}

/* ===========================================================
   MENU DATA + RENDER
   =========================================================== */
const MENU = [
  { name: "Jollof Rice & Chicken", category: "mains", price: 4500, image: "images/hero.jpg",
    desc: "Our signature smoky jollof with grilled chicken, fried plantain, and house coleslaw.", tag: "Signature" },
  { name: "Special Fried Rice", category: "mains", price: 4000, image: "images/waakye.jpg",
    desc: "Fried rice with mixed vegetables, prawns, beef, and a perfectly fried egg on top." },
  { name: "Pounded Yam & Egusi", category: "mains", price: 5500, image: "images/banku.jpg",
    desc: "Soft pounded yam served with rich egusi soup, assorted meat, and stockfish." },
  { name: "Beans & Plantain", category: "mains", price: 3500, image: "images/redred.jpg",
    desc: "Spiced honey beans porridge served with sweet fried ripe plantain." },
  { name: "Egusi Soup & Fufu", category: "mains", price: 5000, image: "images/groundnut.jpg",
    desc: "Creamy melon-seed soup with goat meat, served with soft fufu." },
  { name: "Suya Plantain Bites", category: "sides", price: 2500, image: "images/kelewele.jpg",
    desc: "Spicy peppered plantain cubes tossed with peanuts and suya spice." },
  { name: "Zobo Drink", category: "drinks", price: 1500, image: "images/sobolo.jpg",
    desc: "Chilled hibiscus drink infused with ginger, pineapple, and cloves." },
  { name: "Puff Puff", category: "desserts", price: 1200, image: "images/bofrot.jpg",
    desc: "Soft Nigerian doughnut balls dusted with sugar — perfect with tea." },
];

function initMenu(grid) {
  const searchInput = document.getElementById("menu-search");
  const filterBtns = document.querySelectorAll(".filter");
  // This small state object keeps the current search and category selections
  // together. Every change updates the state and calls render().
  const state = { query: "", category: "all" };

  function render() {
    const q = state.query.trim().toLowerCase();
    // A dish remains visible only when it matches both active filters.
    const filtered = MENU.filter(item => {
      const matchesCat = state.category === "all" || item.category === state.category;
      const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="empty">No dishes match your search. Try a different keyword.</p>`;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="menu-card">
        <div class="menu-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <span class="tag">${item.tag || capitalize(item.category)}</span>
        </div>
        <div class="body">
          <h3>${item.name}</h3>
          <p class="desc">${item.desc}</p>
          <div class="row">
            <span class="price">₦${item.price.toLocaleString()}</span>
            <button class="add-cart btn" data-name="${escapeHtml(item.name)}" data-price="${item.price}">Add to order</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.query = e.target.value;
      render();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.category = btn.dataset.category;
      render();
    });
  });

  render();
}

/* ===========================================================
   CART + CHECKOUT
   =========================================================== */
const CART_KEY = 'tasty_cart_v1';
let CART = [];

function initCart() {
  loadCart();

  // One delegated listener handles current and future cart buttons. This also
  // works for menu cards created dynamically with innerHTML.
  document.addEventListener('click', e => {
    const t = e.target.closest('button');
    if (!t) return;
    if (t.matches('.add-cart')) {
      const name = t.dataset.name;
      const price = Number(t.dataset.price || 0);
      addToCart({ name, price });
    }
    if (t.id === 'cart-button') toggleCart(true);
    if (t.id === 'cart-close') toggleCart(false);
    if (t.id === 'checkout-btn') doCheckout();
    if (t.id === 'clear-btn') clearCart();
    if (t.matches('.remove-item')) {
      const idx = Number(t.dataset.index);
      removeFromCart(idx);
    }
    if (t.matches('.qty-change')) {
      const idx = Number(t.dataset.index);
      if (CART[idx]) updateQuantity(idx, CART[idx].qty + Number(t.dataset.change));
    }
    if (t.id === 'checkout-close' || t.id === 'success-close') closeCheckout();
  });

  document.addEventListener('change', e => {
    if (e.target.matches('.qty-input')) {
      updateQuantity(Number(e.target.dataset.index), Number(e.target.value));
    }

    if (e.target.matches('input[name="fulfilment"]')) {
      updateCheckoutTotals();
    }
  });

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', submitOrder);

  const checkoutDialog = document.getElementById('checkout-dialog');
  if (checkoutDialog) {
    checkoutDialog.addEventListener('click', e => {
      if (e.target === checkoutDialog) closeCheckout();
    });
  }

  // close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleCart(false); });
}

function loadCart() {
  try {
    // Restore the saved order and normalize every value before using it.
    // Invalid or outdated localStorage data falls back to an empty cart.
    const raw = localStorage.getItem(CART_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    CART = Array.isArray(saved) ? saved
      .filter(item => item && item.name && Number(item.price) > 0)
      .map(item => ({
        name: String(item.name),
        price: Number(item.price),
        qty: clampQuantity(item.qty)
      })) : [];
  } catch (err) { CART = []; }
  renderCart();
}

function saveCart() {
  // Keep the browser's saved cart and the visible cart in sync.
  localStorage.setItem(CART_KEY, JSON.stringify(CART));
  renderCart();

  // If checkout is already open, refresh its totals after any cart change.
  const dialog = document.getElementById('checkout-dialog');
  const checkoutContent = document.getElementById('checkout-content');
  if (dialog?.open && checkoutContent && !checkoutContent.hidden) {
    if (CART.length === 0) {
      closeCheckout();
      toggleCart(true);
      showMessage('Your order is now empty');
    } else {
      renderCheckout();
    }
  }
}

function addToCart(item) {
  const found = CART.find(c => c.name === item.name);
  if (found) found.qty = clampQuantity(found.qty + 1);
  else CART.push({ name: item.name, price: item.price, qty: 1 });
  saveCart();
  toggleCart(true);
  showMessage(`${item.name} added`);
}

function removeFromCart(index) {
  if (index >= 0 && index < CART.length) {
    CART.splice(index, 1);
    saveCart();
  }
}

function updateQuantity(index, quantity) {
  if (!CART[index]) return;
  const nextQuantity = Math.round(Number(quantity));

  if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
    removeFromCart(index);
    return;
  }

  CART[index].qty = clampQuantity(nextQuantity);
  saveCart();
  showMessage('Quantity updated');
}

function clampQuantity(quantity) {
  // Quantities are whole numbers between 1 and 99.
  const value = Math.round(Number(quantity));
  return Number.isFinite(value) ? Math.min(99, Math.max(1, value)) : 1;
}

function clearCart() {
  if (CART.length === 0) return;
  CART = [];
  saveCart();
  showMessage('Cart cleared');
}

function doCheckout() {
  if (CART.length === 0) { showMessage('Cart is empty'); return; }
  toggleCart(false);
  renderCheckout();

  const dialog = document.getElementById('checkout-dialog');
  if (!dialog) return;
  document.getElementById('checkout-content').hidden = false;
  document.getElementById('checkout-success').hidden = true;
  dialog.showModal();
}

function renderCheckout() {
  const container = document.getElementById('checkout-items');
  if (!container) return;

  container.innerHTML = CART.map((it, index) => `
    <div class="checkout-item">
      <div>
        <strong>${escapeHtml(it.name)}</strong>
        <div class="quantity-control checkout-quantity" aria-label="Quantity for ${escapeHtml(it.name)}">
          <button class="qty-change" type="button" data-index="${index}" data-change="-1" aria-label="Decrease ${escapeHtml(it.name)} quantity">−</button>
          <input class="qty-input" data-index="${index}" type="number" value="${it.qty}" min="1" max="99" aria-label="${escapeHtml(it.name)} quantity" />
          <button class="qty-change" type="button" data-index="${index}" data-change="1" aria-label="Increase ${escapeHtml(it.name)} quantity">+</button>
        </div>
      </div>
      <span>₦${(it.price * it.qty).toLocaleString()}</span>
    </div>
  `).join('');

  updateCheckoutTotals();
}

function updateCheckoutTotals() {
  const subtotal = CART.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const fulfilment = document.querySelector('input[name="fulfilment"]:checked')?.value;
  const deliveryFee = fulfilment === 'Pickup' ? 0 : 1000;
  const addressField = document.getElementById('address-field');
  const addressInput = addressField?.querySelector('input');
  const feeEl = document.getElementById('delivery-fee');

  if (addressField && addressInput) {
    // Pickup orders do not need an address; delivery orders do.
    const isPickup = fulfilment === 'Pickup';
    addressField.hidden = isPickup;
    addressInput.required = !isPickup;
  }
  if (feeEl) feeEl.textContent = deliveryFee ? `₦${deliveryFee.toLocaleString()}` : 'Free';
  setText('checkout-subtotal', subtotal.toLocaleString());
  setText('checkout-total', (subtotal + deliveryFee).toLocaleString());
}

async function submitOrder(event) {
  event.preventDefault();
  if (CART.length === 0) return;

  const form = event.currentTarget;
  const submitButton = document.querySelector('.checkout-submit');
  const status = document.getElementById('checkout-email-status');
  const data = new FormData(event.currentTarget);
  const fullName = String(data.get('name') || '').trim();
  const customerName = fullName.split(/\s+/)[0];
  const fulfilment = String(data.get('fulfilment') || 'Delivery');
  const subtotal = CART.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = fulfilment === 'Pickup' ? 0 : 1000;
  // Use the final six timestamp digits as a simple client-side order reference.
  const orderNumber = `#TB${String(Date.now()).slice(-6)}`;
  const orderItems = CART
    .map(item => `${item.qty} x ${item.name} - NGN ${(item.price * item.qty).toLocaleString()}`)
    .join("\n");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending order...';
  }
  if (status) status.textContent = '';

  try {
    await sendEmailSubmission({
      _subject: `New Tasty Bites order ${orderNumber}`,
      _template: "table",
      "Order number": orderNumber,
      "Customer name": fullName,
      "Phone number": String(data.get('phone') || ''),
      "Fulfilment": fulfilment,
      "Delivery address": fulfilment === 'Pickup' ? 'Pickup order' : String(data.get('address') || ''),
      "Order notes": String(data.get('notes') || 'None'),
      "Order items": orderItems,
      "Subtotal": `NGN ${subtotal.toLocaleString()}`,
      "Delivery fee": deliveryFee ? `NGN ${deliveryFee.toLocaleString()}` : 'Free',
      "Total": `NGN ${(subtotal + deliveryFee).toLocaleString()}`
    });

    setText('customer-name', customerName);
    setText('order-number', orderNumber);
    document.getElementById('checkout-content').hidden = true;
    document.getElementById('checkout-success').hidden = false;

    CART = [];
    saveCart();
    form.reset();
  } catch (error) {
    console.error(error);
    if (status) status.textContent = 'Order could not be sent. Check your connection and try again.';
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Place order';
    }
  }
}

function closeCheckout() {
  const dialog = document.getElementById('checkout-dialog');
  if (dialog?.open) dialog.close();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const countEl = document.getElementById('cart-count');
  if (!container || !totalEl || !countEl) return;

  if (CART.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-mark">+</span>
        <h4>Your order is empty</h4>
        <p>Add something delicious from the menu to get started.</p>
      </div>
    `;
    totalEl.textContent = '0';
    countEl.textContent = '0';
    setCartButtonsDisabled(true);
    return;
  }

  container.innerHTML = CART.map((it, i) => `
    <div class="cart-item">
      <div class="meta">
        <h4>${escapeHtml(it.name)}</h4>
        <small>₦${Number(it.price).toLocaleString()} each</small>
        <div class="quantity-control" aria-label="Quantity for ${escapeHtml(it.name)}">
          <button class="qty-change" data-index="${i}" data-change="-1" aria-label="Decrease ${escapeHtml(it.name)} quantity">−</button>
          <input class="qty-input" data-index="${i}" type="number" value="${it.qty}" min="1" max="99" aria-label="${escapeHtml(it.name)} quantity" />
          <button class="qty-change" data-index="${i}" data-change="1" aria-label="Increase ${escapeHtml(it.name)} quantity">+</button>
        </div>
      </div>
      <div class="cart-item-side">
        <strong>₦${(it.price * it.qty).toLocaleString()}</strong>
        <button class="remove-item" data-index="${i}">Remove</button>
      </div>
    </div>
  `).join('');

  const total = CART.reduce((s, it) => s + (it.price * it.qty), 0);
  totalEl.textContent = total.toLocaleString();
  countEl.textContent = CART.reduce((s, it) => s + it.qty, 0);
  setCartButtonsDisabled(false);
}

function setCartButtonsDisabled(disabled) {
  const checkout = document.getElementById('checkout-btn');
  const clear = document.getElementById('clear-btn');
  if (checkout) checkout.disabled = disabled;
  if (clear) clear.disabled = disabled;
}

function toggleCart(open) {
  const panel = document.getElementById('cart-panel');
  const button = document.getElementById('cart-button');
  if (!panel) return;
  panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (button) button.setAttribute('aria-expanded', String(open));
}

function showMessage(msg) {
  const el = document.getElementById('cart-msg');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHtml(str) {
  // Escape data before placing it inside template strings to prevent supplied
  // text from being interpreted as HTML.
  return String(str).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

async function sendEmailSubmission(fields) {
  const response = await fetch(FORM_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(fields)
  });

  if (!response.ok) {
    throw new Error(`Email service returned ${response.status}`);
  }
}

/* ===========================================================
   CONTACT FORM VALIDATION
   =========================================================== */
function initContactForm(form) {
  const success = document.getElementById("form-success");
  const sendError = document.getElementById("form-error");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    let valid = true;

    // Each field defines its own validation rule and user-facing error.
    const fields = [
      { id: "name",    rule: v => v.trim().length >= 2, msg: "Please enter your full name." },
      { id: "email",   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Please enter a valid email." },
      { id: "subject", rule: v => v.trim().length >= 3, msg: "Subject is too short." },
      { id: "message", rule: v => v.trim().length >= 10, msg: "Message must be at least 10 characters." },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errorEl = document.getElementById(`err-${f.id}`);
      if (!f.rule(input.value)) {
        errorEl.textContent = f.msg;
        valid = false;
      } else {
        errorEl.textContent = "";
      }
    });

    if (!valid) return;

    const submitButton = form.querySelector('button[type="submit"]');
    success.classList.remove("show");
    sendError.classList.remove("show");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      await sendEmailSubmission({
        _subject: `Tasty Bites contact: ${document.getElementById("subject").value.trim()}`,
        _template: "table",
        _replyto: document.getElementById("email").value.trim(),
        "Full name": document.getElementById("name").value.trim(),
        "Email address": document.getElementById("email").value.trim(),
        "Subject": document.getElementById("subject").value.trim(),
        "Message": document.getElementById("message").value.trim()
      });

      success.classList.add("show");
      form.reset();
      setTimeout(() => success.classList.remove("show"), 6000);
    } catch (error) {
      console.error(error);
      sendError.classList.add("show");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
    }
  });
}
