// Base API URL
const API_BASE_URL = 'http://localhost:8080/api/v1';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    // Redirect to login if not authenticated
    if (!token && (window.location.pathname.includes('dashboard.html') ||
        window.location.pathname.includes('admin.html'))) {
        window.location.href = 'login.html';
        return;
    }

    // Set user info in UI if logged in
    if (token && userRole && email) {
        // Common elements
        if (document.getElementById('userEmail')) {
            document.getElementById('userEmail').textContent = email;
        }
        if (document.getElementById('adminEmail')) {
            document.getElementById('adminEmail').textContent = email;
        }
        if (document.getElementById('dropdownUserEmail')) {
            document.getElementById('dropdownUserEmail').textContent = email;
        }
        if (document.getElementById('dropdownUserRole')) {
            document.getElementById('dropdownUserRole').textContent = `Role: ${userRole}`;
        }
        if (document.getElementById('userRoleBadge')) {
            document.getElementById('userRoleBadge').textContent = userRole;
        }
        if (name && document.getElementById('dropdownUserName')) {
            document.getElementById('dropdownUserName').textContent = name;
        }
        if (name && document.getElementById('userName')) {
            document.getElementById('userName').textContent = name;
        }

        // Check if we're on the correct page based on role
        const onAdminPage = window.location.pathname.includes('admin.html');
        const onDashboardPage = window.location.pathname.includes('dashboard.html');

        // Redirect if on wrong page
        if (userRole === 'admin' && !onAdminPage) {
            window.location.href = 'admin.html';
        } else if (userRole === 'user' && !onDashboardPage) {
            window.location.href = 'dashboard.html';
        }
    }
});

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

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

            if (response.ok && data.data && data.data.token) {
                // Save token and user info to localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('email', data.data.email);
                if (data.data.name) {
                    localStorage.setItem('name', data.data.name);
                }

                // Decode token to get role
                try {
                    const payload = JSON.parse(atob(data.data.token.split('.')[1]));
                    const role = payload.role;
                    localStorage.setItem('role', role);

                    // Redirect based on role
                    if (role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                    return; // Important to return after redirect
                } catch (parseError) {
                    console.error('Token parse error:', parseError);
                    throw new Error('Invalid token received');
                }
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            errorElement.textContent = error.message || 'An error occurred. Please try again.';
            errorElement.classList.remove('d-none');
            console.error('Login error:', error);
        }
    });
}

// Registration Form Submission
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        const errorElement = document.getElementById('registerError');
        const successElement = document.getElementById('registerSuccess');

        // Clear previous messages
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        successElement.classList.add('d-none');

        // Basic validation
        if (password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            errorElement.classList.remove('d-none');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: 'user'
                })
            });

            const data = await response.json();

            if (response.status === 201) {
                // Registration successful
                successElement.textContent = 'Registration successful! Redirecting to login...';
                successElement.classList.remove('d-none');
                errorElement.classList.add('d-none');

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            errorElement.textContent = error.message || 'An error occurred. Please try again.';
            errorElement.classList.remove('d-none');
            successElement.classList.add('d-none');
            console.error('Registration error:', error);
        }
    });
}

// Logout Functionality
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    window.location.href = 'login.html';
}

// Add logout event listeners
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', logout);
}