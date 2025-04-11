// navigation.js
document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar link clicks
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('.sidebar-link').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Update page title
            document.title = 'HolyBridge - ' + this.querySelector('span').textContent;
        });
    });

    // Handle logout button
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your logout logic here
        window.location.href = 'login.html';
    });

    // Handle sidebar toggle
    document.getElementById('sidebarToggle')?.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });
});