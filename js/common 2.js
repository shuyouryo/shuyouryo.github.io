// common.js
// Initial login status
let login = 'none';

// Function to navigate to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Function to update the navigation UI based on login status
function updateNavUI() {
    const navSection = document.getElementById('navSection');
    if (!navSection) return;
    
    if (login === 'none') {
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
    
    // Add event listeners to header buttons
    document.getElementById('bookListBtn')?.addEventListener('click', () => navigateTo('book-list.html'));
    document.getElementById('eventsBtn')?.addEventListener('click', () => navigateTo('events.html'));
    document.getElementById('memberDetailsBtn')?.addEventListener('click', () => navigateTo('member-details.html'));
}

// Function to update the login UI based on current state
function updateLoginUI() {
    const loginSection = document.getElementById('loginSection');
    if (!loginSection) return;
    
    if (login === 'none') {
        loginSection.innerHTML = `
            <div class="login-container">
                <input type="text" class="form-control login-input" id="loginId" placeholder="Library ID">
                <input type="password" class="form-control login-input" id="loginPassword" placeholder="Password">
                <button type="button" class="btn btn-login" id="loginButton">Log In</button>
            </div>
        `;
        
        // Reattach event listeners
        document.getElementById('loginButton')?.addEventListener('click', handleLogin);
        document.getElementById('loginPassword')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    } else {
        // For both 'member' and 'staff' states
        const roleText = login === 'member' ? 'Member' : 'Staff';
        loginSection.innerHTML = `
            <div class="login-container">
                <div class="welcome-text">Welcome</div>
                <div class="role-text">${roleText}</div>
                <button type="button" class="btn btn-logout" id="logoutButton">Log Out</button>
            </div>
        `;
        
        // Attach logout handler
        document.getElementById('logoutButton')?.addEventListener('click', handleLogout);
    }
    
    updateNavUI();
}

// Login function
function handleLogin() {
    const id = document.getElementById('loginId')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();
    
    if (id === 'member' && password === 'member') {
        login = 'member';
        updateLoginUI();
    } else if (id === 'staff' && password === 'staff') {
        login = 'staff';
        updateLoginUI();
    } else {
        alert('Invalid credentials. Please try again.');
        if (document.getElementById('loginId')) {
            document.getElementById('loginId').value = '';
            document.getElementById('loginPassword').value = '';
        }
    }
}

// Logout function
function handleLogout() {
    login = 'none';
    updateLoginUI();
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateLoginUI();
    
    // Add event listener for navigation to index page
    document.getElementById('homeLink')?.addEventListener('click', () => navigateTo('index.html'));
    
    // Add event listener for navigation to top of page
    document.getElementById('footerTop')?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add event listener for navigation to privacy page
    document.getElementById('footerPrivacy')?.addEventListener('click', () => navigateTo('privacy-policy.html'));
    
    // Add event listener for navigation to contacts page
    document.getElementById('footerContacts')?.addEventListener('click', () => navigateTo('contacts.html'));
});