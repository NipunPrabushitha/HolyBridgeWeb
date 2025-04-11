document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Redirect if not authenticated or not a regular user
    if (!token || userRole !== 'user') {
        window.location.href = 'login.html';
        return;
    }

    // Load user dashboard data
    loadUserDashboardData();
});

function loadUserDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        document.getElementById('userDonationAmount').textContent = '$1,250.00';
        document.getElementById('userLastLogin').textContent = new Date().toLocaleString();

        // Populate recent donations
        const donations = [
            { date: "2023-06-15", amount: "$500.00", purpose: "Building Fund", status: "Completed" },
            { date: "2023-05-28", amount: "$250.00", purpose: "General Fund", status: "Completed" },
            { date: "2023-05-10", amount: "$500.00", purpose: "Mission Trip", status: "Completed" }
        ];

        const donationsHtml = donations.map(donation => `
            <tr>
                <td>${donation.date}</td>
                <td>${donation.amount}</td>
                <td>${donation.purpose}</td>
                <td><span class="badge bg-success">${donation.status}</span></td>
            </tr>
        `).join('');

        document.getElementById('recentDonations').innerHTML = donationsHtml;
    }, 1000);
}