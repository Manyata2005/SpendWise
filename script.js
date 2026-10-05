// ==========================================
// SPENDWISE - MAXIMUM CUTE WORLD 🎀🐰
// ==========================================

let expenses = JSON.parse(localStorage.getItem("spendwiseExpenses")) || [];
let editingExpenseId = null;
let searchTerm = "";
let selectedCategory = "All";
let currentView = "dashboard";

// --- SVG CHARACTER GENERATORS ---
const getCoin = () => `<circle cx="20" cy="80" r="12" fill="#ffd56b"/><circle cx="20" cy="80" r="10" fill="#ffc954"/><text x="20" y="85" font-size="14" font-weight="900" text-anchor="middle" fill="#d99728">₹</text><path d="M 12 75 Q 16 70 20 72" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/>`;

function getBunny(size, state = "normal", accessory = "") {
    let eyes = `<circle cx="45" cy="58" r="4.5" fill="#2a2342"/><circle cx="75" cy="58" r="4.5" fill="#2a2342"/>`;
    let mouth = `M 55 68 Q 60 74 65 68`;
    let armR = `M 90 65 Q 100 65 95 55`;
    let eyeClass = "char-blink";
    let extra = "";

    if (state === "waving") { armR = `M 90 55 Q 100 40 110 45`; }
    if (state === "worried") {
        eyes = `<path d="M 40 55 Q 45 50 50 55" fill="none" stroke="#2a2342" stroke-width="3" stroke-linecap="round"/><path d="M 70 55 Q 75 50 80 55" fill="none" stroke="#2a2342" stroke-width="3" stroke-linecap="round"/>`;
        mouth = `M 55 70 Q 60 65 65 70`; eyeClass = ""; extra = `<path d="M 85 50 Q 88 55 85 60 Q 82 55 85 50" fill="#8ebbf0" opacity="0.8"/>`;
    }
    if (state === "crying") {
        eyes = `<path d="M 40 60 L 50 55 M 40 55 L 50 60" stroke="#2a2342" stroke-width="3" stroke-linecap="round"/><path d="M 70 60 L 80 55 M 70 55 L 80 60" stroke="#2a2342" stroke-width="3" stroke-linecap="round"/>`;
        mouth = `M 55 70 Q 60 76 65 70`; eyeClass = "";
        extra = `<path d="M 45 65 L 45 75 M 75 65 L 75 75" stroke="#8ebbf0" stroke-width="4" stroke-linecap="round"/>`;
    }

    if (accessory === "wallet") extra += `<rect x="85" y="65" width="24" height="18" rx="4" fill="#e5daf5"/><path d="M 85 74 Q 97 82 109 74" fill="none" stroke="#8c82a6" stroke-width="2"/>`;
    if (accessory === "heart") extra += `<path d="M 90 70 A 5 5 0 0 0 100 70 A 5 5 0 0 0 110 70 Q 110 80 100 85 Q 90 80 90 70" fill="#ff9cbd"/>`;

    const grad = `bG${Math.random()}`;
    return `<svg viewBox="0 0 120 120" class="svg-char bunny-svg" style="width:${size}px; height:${size}px;">
        <defs><linearGradient id="${grad}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d4bfff" /><stop offset="100%" stop-color="#b893ff" /></linearGradient></defs>
        <path d="M 40 30 Q 30 0 45 10 Q 55 10 50 30" fill="url(#${grad})" />
        <path d="M 80 30 Q 90 0 75 10 Q 65 10 70 30" fill="url(#${grad})" />
        <ellipse cx="60" cy="65" rx="35" ry="30" fill="url(#${grad})" />
        <ellipse cx="40" cy="95" rx="8" ry="6" fill="#b893ff" />
        <ellipse cx="80" cy="95" rx="8" ry="6" fill="#b893ff" />
        <path d="M 30 65 Q 20 65 25 55" fill="none" stroke="#b893ff" stroke-width="6" stroke-linecap="round" />
        <path d="${armR}" fill="none" stroke="#b893ff" stroke-width="6" stroke-linecap="round" class="${state === 'waving' ? 'char-wave' : ''}" />
        <g class="${eyeClass}">${eyes}</g>
        <ellipse cx="40" cy="65" rx="7" ry="5" fill="#ff9cbd" opacity="0.8" />
        <ellipse cx="80" cy="65" rx="7" ry="5" fill="#ff9cbd" opacity="0.8" />
        <path d="${mouth}" fill="none" stroke="#2a2342" stroke-width="3" stroke-linecap="round" />
        ${extra}
        ${accessory === 'coin' ? getCoin() : ''}
    </svg>`;
}

function getChick(size, accessory = "") {
    let extra = "";
    if (accessory === "calendar") extra = `<rect x="75" y="65" width="24" height="24" rx="4" fill="white"/><rect x="75" y="65" width="24" height="8" fill="#ff9cbd"/><text x="87" y="83" font-size="12" font-weight="900" text-anchor="middle" fill="#2a2342">12</text>`;
    if (accessory === "piggy") extra = `<ellipse cx="90" cy="75" rx="16" ry="14" fill="#ff9cbd"/><path d="M 82 62 L 90 62 L 92 68" fill="#ff9cbd"/><line x1="86" y1="70" x2="94" y2="70" stroke="#d97a9f" stroke-width="3" stroke-linecap="round"/>`;
    if (accessory === "glass") extra = `<circle cx="85" cy="70" r="12" fill="#eff5fd" stroke="#a0aec0" stroke-width="3"/><line x1="93" y1="78" x2="105" y2="90" stroke="#a0aec0" stroke-width="4" stroke-linecap="round"/>`;

    return `<svg viewBox="0 0 120 120" class="svg-char chick-svg" style="width:${size}px; height:${size}px;">
        <ellipse cx="60" cy="70" rx="30" ry="28" fill="#ffea8c" />
        <path d="M 35 70 Q 20 60 30 50" fill="#ffea8c" />
        <path d="M 85 70 Q 100 60 90 50" fill="#ffea8c" />
        <path d="M 45 95 L 42 105 M 48 95 L 48 105 M 75 95 L 78 105 M 72 95 L 72 105" stroke="#ffb870" stroke-width="3" stroke-linecap="round"/>
        <g class="char-blink"><circle cx="48" cy="65" r="4" fill="#2a2342"/><circle cx="72" cy="65" r="4" fill="#2a2342"/></g>
        <ellipse cx="40" cy="72" rx="5" ry="3" fill="#ff9cbd" opacity="0.8" />
        <ellipse cx="80" cy="72" rx="5" ry="3" fill="#ff9cbd" opacity="0.8" />
        <path d="M 56 70 Q 60 75 64 70 Z" fill="#ffb870" />
        ${extra}
    </svg>`;
}

function getCat(size, accessory = "") {
    let extra = "";
    if (accessory === "receipt") extra = `<path d="M 75 55 L 95 55 L 95 85 L 90 80 L 85 85 L 80 80 L 75 85 Z" fill="white" /><line x1="79" y1="62" x2="91" y2="62" stroke="#d4bfff" stroke-width="2" stroke-linecap="round"/><line x1="79" y1="68" x2="91" y2="68" stroke="#d4bfff" stroke-width="2" stroke-linecap="round"/>`;

    return `<svg viewBox="0 0 120 120" class="svg-char cat-svg" style="width:${size}px; height:${size}px;">
        <path d="M 35 45 L 30 20 L 50 35 Z" fill="#ffd1dc" />
        <path d="M 85 45 L 90 20 L 70 35 Z" fill="#ffd1dc" />
        <ellipse cx="60" cy="65" rx="35" ry="30" fill="#ffd1dc" />
        <path d="M 35 85 Q 20 85 20 70 Q 20 60 30 65" fill="none" stroke="#ffd1dc" stroke-width="8" stroke-linecap="round" />
        <path d="M 40 60 Q 45 65 50 60" fill="none" stroke="#2a2342" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 70 60 Q 75 65 80 60" fill="none" stroke="#2a2342" stroke-width="2.5" stroke-linecap="round" />
        <ellipse cx="40" cy="68" rx="6" ry="4" fill="#ff9cbd" opacity="0.8" />
        <ellipse cx="80" cy="68" rx="6" ry="4" fill="#ff9cbd" opacity="0.8" />
        <path d="M 55 70 Q 60 74 65 70" fill="none" stroke="#2a2342" stroke-width="2.5" stroke-linecap="round" />
        ${extra}
    </svg>`;
}

function getBear(size, accessory = "") {
    let extra = `<rect x="75" y="65" width="24" height="28" rx="4" fill="#2a2342"/><rect x="78" y="68" width="18" height="8" rx="2" fill="#eff5fd"/><circle cx="81" cy="80" r="2" fill="white"/><circle cx="87" cy="80" r="2" fill="white"/><circle cx="93" cy="80" r="2" fill="white"/><circle cx="81" cy="86" r="2" fill="white"/><circle cx="87" cy="86" r="2" fill="white"/><circle cx="93" cy="86" r="2" fill="#ffb870"/>`;
    if(accessory === "piggy") extra = `<ellipse cx="95" cy="75" rx="16" ry="14" fill="#ff9cbd"/><path d="M 87 62 L 95 62 L 97 68" fill="#ff9cbd"/><line x1="91" y1="70" x2="99" y2="70" stroke="#d97a9f" stroke-width="3" stroke-linecap="round"/>`;

    return `<svg viewBox="0 0 120 120" class="svg-char bear-svg" style="width:${size}px; height:${size}px;">
        <circle cx="35" cy="35" r="14" fill="#ffccb3" />
        <circle cx="85" cy="35" r="14" fill="#ffccb3" />
        <circle cx="35" cy="35" r="7" fill="#ffb870" opacity="0.5" />
        <circle cx="85" cy="35" r="7" fill="#ffb870" opacity="0.5" />
        <ellipse cx="60" cy="70" rx="40" ry="35" fill="#ffccb3" />
        <ellipse cx="60" cy="75" rx="15" ry="12" fill="#ffeedd" />
        <g class="char-blink"><circle cx="45" cy="60" r="4" fill="#2a2342"/><circle cx="75" cy="60" r="4" fill="#2a2342"/></g>
        <circle cx="45" cy="60" r="8" fill="none" stroke="#2a2342" stroke-width="2" />
        <circle cx="75" cy="60" r="8" fill="none" stroke="#2a2342" stroke-width="2" />
        <line x1="53" y1="60" x2="67" y2="60" stroke="#2a2342" stroke-width="2" />
        <ellipse cx="60" cy="72" rx="4" ry="3" fill="#2a2342" />
        <path d="M 55 78 Q 60 82 65 78" fill="none" stroke="#2a2342" stroke-width="2.5" stroke-linecap="round" />
        ${extra}
    </svg>`;
}

// INJECT STATIC CHARACTERS
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sidebarChick").innerHTML = getChick(80, "piggy");
    document.getElementById("heroMascot").innerHTML = getBunny(110, "waving", "heart");
    document.getElementById("dashCharTotal").innerHTML = getBunny(48, "normal", "coin");
    document.getElementById("dashCharMonth").innerHTML = getChick(48, "calendar");
    document.getElementById("dashCharTrans").innerHTML = getCat(48, "receipt");
    document.getElementById("dashCharBudget").innerHTML = getBear(48, "piggy");
    document.getElementById("dashGraphMascot").innerHTML = getBunny(64, "normal", "coin");
    document.getElementById("donutCharacter").innerHTML = getBunny(48, "normal", "");
    document.getElementById("analyticsHeroBear").innerHTML = getBear(90, "");
    document.getElementById("settingsMascot").innerHTML = getBunny(90, "normal", "heart");
    document.getElementById("modalMascot").innerHTML = getBunny(56, "normal", "heart");
});

// DOM
const expenseModal = document.getElementById("expenseModal");
const openExpenseModal = document.getElementById("openExpenseModal");
const closeExpenseModal = document.getElementById("closeExpenseModal");
const expenseForm = document.getElementById("expenseForm");

// Navigation
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const view = item.getAttribute("data-view");
        if (view) navigateTo(view);
    });
});

function navigateTo(viewId) {
    currentView = viewId;
    document.querySelectorAll(".nav-item").forEach(i => i.classList.toggle("active", i.getAttribute("data-view") === viewId));
    document.querySelectorAll(".view-section").forEach(s => s.classList.toggle("active", s.id === `view-${viewId}`));
    updateDashboard(); updateAnalytics(); renderExpenses();
    setTimeout(drawCharts, 50);
}

// Modal
function openModal(id = null) {
    editingExpenseId = id;
    if (id !== null) {
        const e = expenses.find(e => e.id === id);
        if (e) {
            document.getElementById("expenseName").value = e.name;
            document.getElementById("expenseAmount").value = e.amount;
            document.getElementById("expenseCategory").value = e.category;
            document.getElementById("expenseDate").value = e.date;
            document.getElementById("expenseModalTitle").innerHTML = "✨ Edit expense";
        }
    } else {
        expenseForm.reset();
        document.getElementById("expenseDate").value = new Date().toISOString().split("T")[0];
        document.getElementById("expenseModalTitle").innerHTML = "✨ Add a new expense";
    }
    expenseModal.classList.add("show");
}

function closeModal() { expenseModal.classList.remove("show"); expenseForm.reset(); editingExpenseId = null; }
if(openExpenseModal) openExpenseModal.addEventListener("click", () => openModal());
if(closeExpenseModal) closeExpenseModal.addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if (e.key === "Escape" && expenseModal.classList.contains("show")) closeModal(); });

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    if (!name || !amount || amount <= 0 || !category || !date) return;

    if (editingExpenseId !== null) {
        const exp = expenses.find(e => e.id === editingExpenseId);
        if (exp) { exp.name = name; exp.amount = amount; exp.category = category; exp.date = date; }
        showCuteToast("Expense updated! 🌸", getBunny(36, "normal", "heart"));
        triggerCelebration();
    } else {
        expenses.push({ id: Date.now(), name, amount, category, date });
        showCuteToast("Added! 💜", getBunny(36, "normal", "heart"));
        addNotification("✨", "Expense added", `${name} — ₹${amount}`);
        triggerCelebration();
    }
    saveExpenses(); updateDashboard(); updateAnalytics(); renderExpenses(); drawCharts(); closeModal();
});

function triggerCelebration() {
    const overlay = document.getElementById("celebrationOverlay");
    if(!overlay) return;
    overlay.classList.add("show");
    const elements = ['♡', '✦', '✧', '🪙', '✨'];
    for(let i=0; i<40; i++) {
        const el = document.createElement("div"); el.className = "confetti";
        el.textContent = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + "vw"; el.style.top = -30 + "px";
        el.style.animationDelay = Math.random() * 0.6 + "s";
        el.style.color = ['var(--primary)', 'var(--pink)', 'var(--peach)', 'var(--yellow)', 'var(--blue)'][Math.floor(Math.random()*5)];
        overlay.appendChild(el);
    }
    setTimeout(() => { overlay.innerHTML = ""; overlay.classList.remove("show"); }, 2000);
}

function showCuteToast(message, iconSvg) {
    const toast = document.getElementById("cuteToast");
    if(!toast) return;
    toast.innerHTML = (iconSvg ? iconSvg : '✨') + `<span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// Button Ripple
document.addEventListener("click", function(e) {
    if(e.target.closest(".btn-primary")) {
        const btn = e.target.closest(".btn-primary");
        const rect = btn.getBoundingClientRect();
        const circle = document.createElement("span");
        const d = Math.max(btn.clientWidth, btn.clientHeight);
        circle.style.width = circle.style.height = `${d}px`;
        circle.style.left = `${e.clientX - rect.left - d/2}px`;
        circle.style.top = `${e.clientY - rect.top - d/2}px`;
        circle.className = "btn-click-sparkle";
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    }
});

// Filters
const expenseSearch = document.getElementById("expenseSearch");
const categoryFilter = document.getElementById("categoryFilter");
if (expenseSearch) expenseSearch.addEventListener("input", () => { searchTerm = expenseSearch.value.trim().toLowerCase(); renderExpenses(); });
if (categoryFilter) categoryFilter.addEventListener("change", () => { selectedCategory = categoryFilter.value; renderExpenses(); });
document.getElementById("clearFilters")?.addEventListener("click", () => { searchTerm = ""; selectedCategory = "All"; expenseSearch.value = ""; categoryFilter.value = "All"; renderExpenses(); });

function saveExpenses() { localStorage.setItem("spendwiseExpenses", JSON.stringify(expenses)); }
function deleteExpense(id) {
    const e = expenses.find(e => e.id === id);
    if (!e || !confirm(`Delete "${e.name}"?`)) return;
    expenses = expenses.filter(ex => ex.id !== id);
    saveExpenses();
    addNotification("🗑️", "Expense deleted", `${e.name} was removed.`);
    showCuteToast("Bye bye, expense! 🐱", getCat(36, ""));
    updateDashboard(); updateAnalytics(); renderExpenses(); drawCharts();
}
window.deleteExpense = deleteExpense; window.editExpense = openModal;

function getCategoryEmoji(cat) { const e = { Food: "🍓", Travel: "🚗", Shopping: "🛍️", Education: "📚", Other: "✨" }; return e[cat] || "✨"; }
function getCategoryIcon(cat) { return String(cat).toLowerCase().replace(/\s+/g, "-") + "-icon"; }
function formatDate(d) { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }); }

function renderExpenses() {
    const listAll = document.getElementById("transactionList");
    const listDash = document.getElementById("dashTransactionList");
    
    let filtered = expenses.filter(e => {
        const ms = String(e.name).toLowerCase().includes(searchTerm);
        const mc = selectedCategory === "All" || e.category === selectedCategory;
        return ms && mc;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const renderHTML = (data, emptyMsg, type) => {
        if (data.length === 0) {
            if(type === "search") {
                return `<div class="no-results">
                    <div class="float-anim">${getChick(100, "glass")}</div>
                    <h3>Hmm... I can't find that! 🥺</h3><p>Let's try another search.</p>
                </div>`;
            } else {
                return `<div class="empty-state">
                    <div class="float-anim" style="position:relative;">
                        <div class="sparkle-decor" style="top:10%; right:10%; color:var(--peach); font-size:24px;">✦</div>
                        <div class="sparkle-decor" style="bottom:20%; left:10%; color:var(--pink); font-size:18px;">♡</div>
                        ${getBunny(160, "normal", "wallet")}
                    </div>
                    <h3>Your wallet is feeling lonely...</h3><p>Add your first expense and let's start tracking together! 💜</p>
                </div>`;
            }
        }
        return data.map(expense => `
            <div class="transaction">
                <div class="transaction-icon-wrapper ${getCategoryIcon(expense.category)}">${getCategoryEmoji(expense.category)}</div>
                <div class="transaction-info"><strong>${expense.name}</strong><span>${expense.category} · ${formatDate(expense.date)}</span></div>
                <div class="transaction-actions"><strong class="transaction-amount">-₹${Number(expense.amount).toLocaleString('en-IN')}</strong>
                    <div class="transaction-buttons">
                        <button class="action-btn edit-btn" onclick="editExpense(${expense.id})" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg></button>
                        <button class="action-btn delete-btn" onclick="deleteExpense(${expense.id})" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </div>
                </div>
            </div>
        `).join("");
    };

    if (listAll) listAll.innerHTML = renderHTML(filtered, "", searchTerm || selectedCategory !== "All" ? "search" : "all");
    if (listDash) listDash.innerHTML = renderHTML([...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5), "", "all");
}

function updateDashboard() {
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const monthly = expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).reduce((s, e) => s + Number(e.amount), 0);
    
    if (document.getElementById("dashTotalSpending")) document.getElementById("dashTotalSpending").textContent = `₹${total.toLocaleString("en-IN")}`;
    if (document.getElementById("dashMonthlySpending")) document.getElementById("dashMonthlySpending").textContent = `₹${monthly.toLocaleString("en-IN")}`;
    if (document.getElementById("dashTransactionCount")) document.getElementById("dashTransactionCount").textContent = expenses.length;
    
    const budget = 5000;
    const remaining = budget - monthly;
    const pct = Math.min(Math.max((monthly / budget) * 100, 0), 100);
    
    if (document.getElementById("dashBudgetProgress")) {
        document.getElementById("dashBudgetProgress").style.width = `${pct}%`;
        document.getElementById("dashBudgetProgress").style.background = pct >= 100 ? "var(--pink)" : "linear-gradient(90deg, var(--primary), var(--pink))";
    }
    if (document.getElementById("dashBudgetText")) document.getElementById("dashBudgetText").textContent = remaining >= 0 ? `₹${remaining.toLocaleString("en-IN")} remaining` : `₹${Math.abs(remaining).toLocaleString("en-IN")} over budget`;

    const r = document.getElementById("budgetMascotReaction");
    if(r) {
        if(pct <= 30) r.innerHTML = getBunny(40, "normal") + " You're doing amazing! ✨";
        else if(pct <= 60) r.innerHTML = getBunny(40, "normal") + " Nice and steady 💜";
        else if(pct <= 80) r.innerHTML = getBunny(40, "normal") + " Let's keep an eye on it 👀";
        else if(pct <= 100) r.innerHTML = getBunny(40, "worried") + " Almost there! 😳";
        else r.innerHTML = getBunny(40, "crying") + " Oh nooo! 😭";
    }
    
    const b = document.getElementById("dashGraphBubble");
    if(b) {
        if(monthly === 0) b.textContent = "So quiet... 🥺";
        else if(pct <= 50) b.textContent = "Looking good! 💜";
        else if(pct <= 90) b.textContent = "Let's save a little! ✨";
        else b.textContent = "We spent a lot! 😳";
    }
}

function updateAnalytics() {
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const avg = expenses.length ? total / expenses.length : 0;
    const high = expenses.length ? Math.max(...expenses.map(e => Number(e.amount))) : 0;

    if (document.getElementById("analyticsTotalAll")) document.getElementById("analyticsTotalAll").textContent = `₹${total.toLocaleString("en-IN")}`;
    if (document.getElementById("analyticsAvg")) document.getElementById("analyticsAvg").textContent = `₹${Math.round(avg).toLocaleString("en-IN")}`;
    if (document.getElementById("analyticsHigh")) document.getElementById("analyticsHigh").textContent = `₹${high.toLocaleString("en-IN")}`;

    const c = {}; expenses.forEach(e => { c[e.category] = (c[e.category] || 0) + Number(e.amount); });
    let max = 0; let topCat = "-";
    for (const [cat, val] of Object.entries(c)) { if(val > max) { max = val; topCat = cat; } }

    const box = document.getElementById("analyticsMascotBox");
    const text = document.getElementById("smartInsightText");
    if (box && text) {
        if (total === 0) {
            box.innerHTML = getBear(80, "");
            text.innerHTML = "Give me a little more data! 📊<br>Once you add expenses, I'll show you where your money goes.";
        } else {
            box.innerHTML = getBear(80, "piggy");
            text.innerHTML = `💜 Biggest category: <strong>${topCat}</strong><br>🪙 Average expense: <strong>₹${Math.round(avg).toLocaleString("en-IN")}</strong><br>✨ Total tracked: <strong>₹${total.toLocaleString("en-IN")}</strong>`;
        }
    }
    
    document.querySelectorAll(".category-item").forEach(item => {
        const cat = item.getAttribute("data-cat");
        const pctSpan = item.querySelector("strong");
        if (cat && pctSpan) pctSpan.textContent = `${total === 0 ? 0 : Math.round(((c[cat]||0)/total)*100)}%`;
    });
}

function drawCharts() { drawTrendChart("dashWeeklyChartArea"); drawTrendChart("analyticsWeeklyChartArea"); drawDonutChart("dashDonutContainer"); drawDonutChart("analyticsDonutContainer"); }

function drawTrendChart(containerId) {
    const ca = document.getElementById(containerId);
    if (!ca || ca.offsetParent === null) return;
    let maxTotal = 0;
    const dailyData = Array.from({length:7}, (_,i) => {
        const d = new Date(); d.setDate(d.getDate() - (6-i));
        const t = expenses.filter(e => { const ed=new Date(e.date); return ed.getDate()===d.getDate() && ed.getMonth()===d.getMonth() && ed.getFullYear()===d.getFullYear(); }).reduce((s,e) => s+Number(e.amount),0);
        if(t > maxTotal) maxTotal = t;
        return { date: d, label: d.toLocaleDateString("en-IN", { weekday: "short" }), total: t };
    });
    maxTotal = maxTotal > 0 ? maxTotal * 1.3 : 100;

    let svgC = ca.querySelector(".trend-svg-container");
    if (!svgC) {
        svgC = document.createElement("div"); svgC.className = "trend-svg-container"; svgC.style.position = "absolute"; svgC.style.inset = "0 0 20px 0"; svgC.style.zIndex = "2";
        ca.appendChild(svgC);
        const lC = document.createElement("div"); lC.className = "trend-labels-container"; lC.style.position = "absolute"; lC.style.bottom = "-5px"; lC.style.left = "0"; lC.style.right = "0";
        ca.appendChild(lC);
    }
    
    let tt = document.getElementById("chartTooltip");
    if (!tt) { tt = document.createElement("div"); tt.id = "chartTooltip"; tt.className = "chart-tooltip"; document.body.appendChild(tt); }

    const w = svgC.clientWidth || 600; const h = svgC.clientHeight || 180;
    let svgHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none" style="overflow: visible;" class="chart-svg"><defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--primary)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary)" stop-opacity="0.0"/></linearGradient></defs>`;
    const pts = dailyData.map((d, i) => ({ x: (i/6)*w, y: h - (d.total/maxTotal)*h, data: d }));
    let pathD = `M ${pts[0].x},${pts[0].y} `;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i===0?0:i-1]; const p1 = pts[i]; const p2 = pts[i+1]; const p3 = pts[i+2===pts.length?i+1:i+2];
        const t = 0.2; pathD += `C ${p1.x+(p2.x-p0.x)*t},${p1.y+(p2.y-p0.y)*t} ${p2.x-(p3.x-p1.x)*t},${p2.y-(p3.y-p1.y)*t} ${p2.x},${p2.y} `;
    }
    svgHTML += `<path d="${pathD} L ${pts[pts.length-1].x},${h} L ${pts[0].x},${h} Z" fill="url(#areaGradient)" class="trend-area-anim" /><path d="${pathD}" fill="none" stroke="var(--primary)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="trend-line-anim" /></svg>`;
    
    let hits = ''; let lbls = '';
    pts.forEach((pt) => {
        hits += `<div class="chart-point-hit" style="left:${pt.x}px; top:${pt.y}px;" data-label="${pt.data.label}" data-value="${pt.data.total}"><div class="chart-point-dot"></div></div>`;
        lbls += `<span class="chart-x-label" style="left: ${(pt.x/w)*100}%;">${pt.data.label}</span>`;
    });
    svgC.innerHTML = svgHTML + hits;
    const lC = ca.querySelector(".trend-labels-container"); if (lC) lC.innerHTML = lbls;

    svgC.querySelectorAll(".chart-point-hit").forEach(hit => {
        hit.addEventListener("mouseenter", (e) => {
            const rect = hit.getBoundingClientRect();
            tt.innerHTML = `<span class="tooltip-lbl">${hit.getAttribute("data-label")}</span><span class="tooltip-val">₹${Number(hit.getAttribute("data-value")).toLocaleString("en-IN")}</span>`;
            tt.classList.add("show");
            tt.style.top = (rect.top - tt.offsetHeight - 15) + "px"; tt.style.left = (rect.left + (rect.width/2) - (tt.offsetWidth/2)) + "px";
            hit.classList.add("active");
        });
        hit.addEventListener("mouseleave", () => { tt.classList.remove("show"); hit.classList.remove("active"); });
    });
}

function drawDonutChart(containerId) {
    const cont = document.getElementById(containerId);
    if (!cont || cont.offsetParent === null) return;
    
    const centerTxt = cont.querySelector(".donut-total-text");
    const cats = { Food: 0, Travel: 0, Shopping: 0, Education: 0, Other: 0 };
    expenses.forEach(e => { if (cats[e.category] !== undefined) cats[e.category] += Number(e.amount); });
    const tot = Object.values(cats).reduce((s, v) => s + v, 0);
    if (centerTxt) centerTxt.textContent = `₹${tot.toLocaleString("en-IN")}`;

    const cols = { Food: "var(--primary)", Travel: "var(--pink)", Shopping: "var(--peach)", Education: "var(--mint)", Other: "var(--blue)" };

    let svgC = cont.querySelector(".donut-svg-wrapper");
    if (!svgC) {
        svgC = document.createElement("div"); svgC.className = "donut-svg-wrapper"; svgC.style.position = "absolute"; svgC.style.inset = "-10px"; svgC.style.zIndex = "1";
        cont.appendChild(svgC); cont.style.width = "180px"; cont.style.height = "180px";
    }

    let tt = document.getElementById("chartTooltip");
    if (tot === 0) { svgC.innerHTML = `<svg viewBox="0 0 100 100" style="width:100%; height:100%;"><circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" stroke-width="12" stroke-linecap="round" /></svg>`; return; }

    const r = 42; const circ = 2 * Math.PI * r; let currA = 0; let paths = '';
    Object.entries(cats).forEach(([cat, amt]) => {
        if (amt <= 0) return;
        const pct = amt / tot;
        paths += `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${cols[cat]}" stroke-width="12" stroke-dasharray="${pct * circ} ${circ}" stroke-dashoffset="${-currA * circ}" stroke-linecap="round" class="donut-slice" data-label="${cat}" data-value="${amt}" style="transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; transform-origin: center;"></circle>`;
        currA += pct;
    });
    
    svgC.innerHTML = `<svg viewBox="0 0 100 100" style="width:100%; height:100%; transform: rotate(-90deg); overflow: visible;" class="donut-svg-anim">${paths}</svg>`;

    svgC.querySelectorAll(".donut-slice").forEach(sl => {
        sl.addEventListener("mouseenter", (e) => {
            sl.style.strokeWidth = "18"; sl.style.transform = "scale(1.08)";
            tt.innerHTML = `<span class="tooltip-lbl">${sl.getAttribute("data-label")}</span><span class="tooltip-val">₹${Number(sl.getAttribute("data-value")).toLocaleString("en-IN")}</span>`;
            tt.classList.add("show");
        });
        sl.addEventListener("mousemove", (e) => { tt.style.top = (e.pageY - tt.offsetHeight - 15) + "px"; tt.style.left = (e.pageX - (tt.offsetWidth / 2)) + "px"; });
        sl.addEventListener("mouseleave", () => { sl.style.strokeWidth = "12"; sl.style.transform = "scale(1)"; tt.classList.remove("show"); });
    });
}

// Notifications
const nBtn = document.getElementById("notificationButton");
const nPanel = document.getElementById("notificationPanel");
let notifications = JSON.parse(localStorage.getItem("spendwiseNotifications")) || [];

function saveNotifications() { localStorage.setItem("spendwiseNotifications", JSON.stringify(notifications)); renderNotifications(); }
function addNotification(icon, title, desc) {
    notifications.unshift({ id: Date.now(), icon, title, desc, time: "Just now" });
    if (notifications.length > 20) notifications.pop();
    saveNotifications();
    if(nBtn) { nBtn.classList.remove("bell-wiggle"); void nBtn.offsetWidth; nBtn.classList.add("bell-wiggle"); }
}

function renderNotifications() {
    const list = document.getElementById("notificationList");
    const dot = document.getElementById("notificationDot");
    if (!list) return;
    
    dot.style.display = notifications.length > 0 ? "block" : "none";
    if (notifications.length === 0) {
        list.innerHTML = `<div class="empty-notification"><div class="float-anim">🎀</div><p>No new notifications</p><small>You're all caught up!</small></div>`;
        return;
    }
    list.innerHTML = notifications.map(n => `
        <div class="notification-item">
            <div class="notification-icon">${n.icon}</div>
            <div class="notification-content"><strong>${n.title}</strong><p>${n.desc}</p><small>${n.time}</small></div>
        </div>
    `).join("");
}

if (nBtn) nBtn.addEventListener("click", (e) => { e.stopPropagation(); nPanel.classList.toggle("show"); });
document.getElementById("clearNotifications")?.addEventListener("click", () => { notifications = []; saveNotifications(); });
document.addEventListener("click", (e) => { if (nPanel && !e.target.closest(".notification-wrapper")) nPanel.classList.remove("show"); });

// Theme Toggle
const themeToggleSwitch = document.getElementById("themeToggleSwitch");
if (localStorage.getItem("spendwiseTheme") === "dark") { document.body.classList.add("dark-mode"); if (themeToggleSwitch) themeToggleSwitch.checked = true; }
if (themeToggleSwitch) themeToggleSwitch.addEventListener("change", (e) => { document.body.classList.toggle("dark-mode", e.target.checked); localStorage.setItem("spendwiseTheme", e.target.checked ? "dark" : "light"); });

window.addEventListener("resize", () => { clearTimeout(window.resizeTimer); window.resizeTimer = setTimeout(drawCharts, 200); });

// Init
document.getElementById("currentDateDisplay").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
updateDashboard(); updateAnalytics(); renderExpenses(); renderNotifications();
setTimeout(drawCharts, 100);
