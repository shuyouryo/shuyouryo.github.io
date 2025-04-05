// Centralized login state management
window.loginState = {
    _status: 'none',
    
    get status() {
        return this._status;
    },
    
    set status(value) {
        this._status = value;
        this.updateAllUI();
    },
    
    updateAllUI: function() {
        updateLoginUI();
        updateNavUI();
        if (window.updateMemberContent) {
            updateMemberContent();
        }
    }
};

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Update navigation UI
function updateNavUI() {
    const navSection = document.getElementById('navSection');
    if (!navSection) return;
    
    if (window.loginState.status === 'none') {
        navSection.innerHTML = `
            <button class="nav-button" id="bookListBtn">Book List</button>
            <button class="nav-button" id="eventsBtn">Events</button>
            <button class="nav-button disabled" disabled>Member Details</button>
            <div class="search-bar ms-auto">
                <input type="text" class="search-input" placeholder="Search by Book Title, Author, Publisher, ISBN">
            </div>
        `;
    } else {
        navSection.innerHTML = `
            <button class="nav-button" id="bookListBtn">Book List</button>
            <button class="nav-button" id="eventsBtn">Events</button>
            <button class="nav-button" id="memberDetailsBtn">Member Details</button>
            <div class="search-bar ms-auto">
                <input type="text" class="search-input" placeholder="Search by Book Title, Author, Publisher, ISBN">
            </div>
        `;
    }
    
    // Add navigation event listeners
    document.getElementById('bookListBtn')?.addEventListener('click', () => navigateTo('book-list.html'));
    document.getElementById('eventsBtn')?.addEventListener('click', () => navigateTo('events.html'));
    document.getElementById('memberDetailsBtn')?.addEventListener('click', () => navigateTo('member-details.html'));
}

// Update login UI
function updateLoginUI() {
    const loginSection = document.getElementById('loginSection');
    if (!loginSection) return;
    
    if (window.loginState.status === 'none') {
        loginSection.innerHTML = `
            <div class="login-container">
                <input type="text" class="form-control login-input" id="loginId" placeholder="Library ID">
                <input type="password" class="form-control login-input" id="loginPassword" placeholder="Password">
                <button type="button" class="btn btn-login" id="loginButton">Log In</button>
            </div>
        `;
        
        document.getElementById('loginButton')?.addEventListener('click', handleLogin);
        document.getElementById('loginPassword')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleLogin();
        });
    } else {
        const roleText = window.loginState.status === 'member' ? 'Member' : 'Staff';
        loginSection.innerHTML = `
            <div class="login-container">
                <div class="welcome-text">Welcome</div>
                <div class="role-text">${roleText}</div>
                <button type="button" class="btn btn-logout" id="logoutButton">Log Out</button>
            </div>
        `;
        
        document.getElementById('logoutButton')?.addEventListener('click', handleLogout);
    }
}

// Login handler
function handleLogin() {
    const id = document.getElementById('loginId')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();
    
    if (id === 'member' && password === 'member') {
        window.loginState.status = 'member';
    } else if (id === 'staff' && password === 'staff') {
        window.loginState.status = 'staff';
    } else {
        alert('Invalid credentials. Please try again.');
        if (document.getElementById('loginId')) {
            document.getElementById('loginId').value = '';
            document.getElementById('loginPassword').value = '';
        }
    }
}

// Logout handler
function handleLogout() {
    window.loginState.status = 'none';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    window.loginState.updateAllUI();
    
    // Add navigation event listeners
    document.getElementById('homeLink')?.addEventListener('click', () => navigateTo('index.html'));
    document.getElementById('footerTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('footerAbout')?.addEventListener('click', () => navigateTo('about-us.html'));
    document.getElementById('footerPrivacy')?.addEventListener('click', () => navigateTo('privacy-policy.html'));
    document.getElementById('footerContacts')?.addEventListener('click', () => navigateTo('contacts.html'));
    document.getElementById('footerSitemap')?.addEventListener('click', () => navigateTo('sitemap.html'));
});  // This closes the DOMContentLoaded event listener