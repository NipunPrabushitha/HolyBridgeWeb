document.addEventListener('DOMContentLoaded', function() {
    // Check authentication and role
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    if (!token || role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    // Set user info
    document.getElementById('adminEmail').textContent = email;
    document.getElementById('dropdownUserEmail').textContent = email;
    document.getElementById('dropdownUserName').textContent = name || 'Admin User';
    document.getElementById('dropdownUserRole').textContent = `Role: ${role}`;

    // Initialize sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    }

    setTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        window.location.href = 'login.html';
    });

    // Load dashboard data
    loadDashboardData();

    // Button event listeners
    document.getElementById('addUserBtn').addEventListener('click', function() {
        window.location.href = 'add-user.html';
    });

    document.getElementById('createEventBtn').addEventListener('click', function() {
        window.location.href = 'add-event.html';
    });

    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('settingsBtn').addEventListener('click', function() {
        window.location.href = 'settings.html';
    });
    document.getElementById('generateReportBtn').addEventListener('click', generateReport);
    document.getElementById('refreshActivityBtn').addEventListener('click', loadRecentActivity);

    // Functions
    function loadDashboardData() {
        // Simulate API calls
        setTimeout(() => {
            // Update stats
            document.getElementById('usersCount').textContent = '1,248';
            document.getElementById('donationsAmount').textContent = '$24,750';
            document.getElementById('eventsCount').textContent = '15';
            document.getElementById('feedbackCount').textContent = '23';

            // Load recent activity
            loadRecentActivity();

            // Load recent users
            loadRecentUsers();
        }, 1000);
    }

    function loadRecentActivity() {
        const activityFeed = document.getElementById('recentActivity');
        activityFeed.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        // Simulate API call
        setTimeout(() => {
            const activities = [
                { time: "Just now", action: "You logged in to the system" },
                { time: "10 minutes ago", action: "New user 'Sarah Johnson' registered" },
                { time: "30 minutes ago", action: "Donation of $500 received from John Doe" },
                { time: "1 hour ago", action: "Event 'Sunday Service' was created" },
                { time: "2 hours ago", action: "System backup completed successfully" },
                { time: "3 hours ago", action: "New feedback received from Michael Brown" }
            ];

            const activityHtml = activities.map(activity => `
                <div class="feed-item">
                    <div class="date">${activity.time}</div>
                    <div class="text">${activity.action}</div>
                </div>
            `).join('');

            activityFeed.innerHTML = activityHtml;
        }, 800);
    }

    function loadRecentUsers() {
        const tableBody = document.querySelector('#recentUsersTable tbody');

        // Simulate API call
        setTimeout(() => {
            const users = [
                { name: "Sarah Johnson", email: "sarah@example.com", role: "user", joined: "2023-06-15" },
                { name: "Michael Brown", email: "michael@example.com", role: "user", joined: "2023-06-14" },
                { name: "Emily Davis", email: "emily@example.com", role: "user", joined: "2023-06-12" },
                { name: "Robert Wilson", email: "robert@example.com", role: "user", joined: "2023-06-10" },
                { name: "Jessica Lee", email: "jessica@example.com", role: "user", joined: "2023-06-08" }
            ];

            const usersHtml = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><span class="badge ${user.role === 'admin' ? 'bg-primary' : 'bg-success'}">${user.role}</span></td>
                    <td>${user.joined}</td>
                    <td>
                        <button class="btn btn-sm btn-info"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');

            tableBody.innerHTML = usersHtml;
        }, 1000);
    }

    function exportData() {
        // Simulate export functionality
        alert('Exporting data... This would download a CSV file in a real implementation.');
    }

    function generateReport() {
        // Simulate report generation
        alert('Generating report... This would create a PDF report in a real implementation.');
    }
});