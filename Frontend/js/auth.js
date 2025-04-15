// Base API URL
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Improved getAuthToken function with better redirect handling
function getAuthToken() {
    const token = localStorage.getItem('token');

    // Skip token check if we're already on the login page
    if (window.location.pathname.includes('login.html') ||
        window.location.pathname.includes('register.html')) {
        return null;
    }

    // If token doesn't exist and we're on a protected page, redirect to login
    if (!token && (window.location.pathname.includes('dashboard.html') ||
        window.location.pathname.includes('admin.html'))) {
        console.log("No token found, redirecting to login");
        window.location.href = 'login.html';
        return null;
    }

    // Basic token format validation
    if (token && token.split('.').length !== 3) {
        console.error("Invalid token format");
        localStorage.removeItem('token');
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }

    return token;
}

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = getAuthToken();
    const userRole = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    // Set user info in UI if logged in
    if (token && userRole && email) {
        // Common elements
        const updateElement = (id, content) => {
            const el = document.getElementById(id);
            if (el) el.textContent = content;
        };

        updateElement('userEmail', email);
        updateElement('adminEmail', email);
        updateElement('dropdownUserEmail', email);
        updateElement('dropdownUserRole', `Role: ${userRole}`);
        updateElement('userRoleBadge', userRole);
        if (name) {
            updateElement('dropdownUserName', name);
            updateElement('userName', name);
        }

        // Check if we're on the correct page based on role
        const onAdminPage = window.location.pathname.includes('admin.html');
        const onDashboardPage = window.location.pathname.includes('dashboard.html');

        // Redirect if on wrong page (with delay to prevent multiple redirects)
        setTimeout(() => {
            if (userRole === 'admin' && !onAdminPage) {
                window.location.href = 'admin.html';
            } else if (userRole === 'user' && !onDashboardPage) {
                window.location.href = 'dashboard.html';
            }
        }, 100);
    }
});

// Improved Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('loginError');

        // Clear previous errors
        errorElement.textContent = '';
        errorElement.classList.add('d-none');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.data?.token) {
                // Save token and user info to localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('email', data.data.email);
                if (data.data.name) {
                    localStorage.setItem('name', data.data.name);
                }

                // Decode token to get role
                try {
                    const payload = JSON.parse(atob(data.data.token.split('.')[1]));
                    const role = payload.role || 'user';
                    localStorage.setItem('role', role);

                    // Redirect based on role after a brief delay
                    setTimeout(() => {
                        window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
                    }, 300);
                } catch (parseError) {
                    console.error('Token parse error:', parseError);
                    throw new Error('Invalid token received');
                }
            } else {
                throw new Error('No token received in response');
            }
        } catch (error) {
            errorElement.textContent = error.message || 'An error occurred. Please try again.';
            errorElement.classList.remove('d-none');
            console.error('Login error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Rest of your code (registration and logout) remains the same...
// [Keep your existing registerForm and logout code exactly as is]