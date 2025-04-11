document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let donationChart;
    let allDonations = [];
    let allUsers = [];

    // DOM Elements
    const totalDonationsCount = document.getElementById('totalDonationsCount');
    const totalDonationsAmount = document.getElementById('totalDonationsAmount');
    const monthlyDonationsAmount = document.getElementById('monthlyDonationsAmount');
    const averageDonationAmount = document.getElementById('averageDonationAmount');
    const donationsTable = document.getElementById('donationsTable').getElementsByTagName('tbody')[0];
    const topDonorsList = document.getElementById('topDonorsList');
    const addDonationBtn = document.getElementById('addDonationBtn');
    const donationUserSelect = document.getElementById('donationUser');
    const donationAmountInput = document.getElementById('donationAmount');
    const donationDateInput = document.getElementById('donationDate');
    const donationNoteInput = document.getElementById('donationNote');
    const saveDonationBtn = document.getElementById('saveDonationBtn');
    const donationSearch = document.getElementById('donationSearch');
    const donationSearchBtn = document.getElementById('donationSearchBtn');

    // Set today's date as default
    donationDateInput.valueAsDate = new Date();

    // Initialize the page
    loadUsers();
    loadDonations();

    // Event Listeners
    addDonationBtn.addEventListener('click', showAddDonationModal);
    saveDonationBtn.addEventListener('click', saveDonation);
    donationSearchBtn.addEventListener('click', searchDonations);
    donationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDonations();
        }
    });

    // Chart period dropdown
    document.querySelectorAll('.chart-period').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const period = parseInt(this.getAttribute('data-period'));
            document.querySelector('.chart-period.active').classList.remove('active');
            this.classList.add('active');
            document.getElementById('chartPeriodDropdown').textContent = this.textContent;
            updateChart(period);
        });
    });

    // Load users for dropdown
    function loadUsers() {
        // In a real app, this would be an API call
        // For demo, we'll use mock data
        allUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
            { id: 4, name: 'Emily Davis', email: 'emily@example.com' }
        ];

        // Populate user dropdown
        donationUserSelect.innerHTML = '<option value="">Select a user</option>';
        allUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.name} (${user.email})`;
            donationUserSelect.appendChild(option);
        });
    }

    // Load donations data
    function loadDonations() {
        // In a real app, this would be an API call
        // For demo, we'll use mock data
        allDonations = [
            { donationId: 1, amount: 100.50, date: '2023-06-15', note: 'Monthly tithe', user: { id: 1, name: 'John Doe' } },
            { donationId: 2, amount: 50.00, date: '2023-06-10', note: 'Building fund', user: { id: 2, name: 'Jane Smith' } },
            { donationId: 3, amount: 200.00, date: '2023-05-20', note: 'Special offering', user: { id: 3, name: 'Robert Johnson' } },
            { donationId: 4, amount: 75.25, date: '2023-05-15', note: 'Monthly tithe', user: { id: 1, name: 'John Doe' } },
            { donationId: 5, amount: 150.00, date: '2023-04-30', note: 'Missions fund', user: { id: 4, name: 'Emily Davis' } },
            { donationId: 6, amount: 60.00, date: '2023-04-15', note: 'Monthly tithe', user: { id: 2, name: 'Jane Smith' } },
            { donationId: 7, amount: 120.00, date: '2023-03-22', note: '', user: { id: 3, name: 'Robert Johnson' } },
            { donationId: 8, amount: 80.50, date: '2023-03-15', note: 'Monthly tithe', user: { id: 1, name: 'John Doe' } }
        ];

        updateDonationStats();
        renderDonationsTable(allDonations);
        updateTopDonors();
        updateChart(6); // Default to 6 months
    }

    // Update donation statistics
    function updateDonationStats() {
        const totalCount = allDonations.length;
        const totalAmount = allDonations.reduce((sum, donation) => sum + donation.amount, 0);

        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        // Filter donations for current month
        const monthlyDonations = allDonations.filter(donation => {
            const date = new Date(donation.date);
            return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear;
        });

        const monthlyAmount = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);
        const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

        // Update UI
        totalDonationsCount.textContent = totalCount;
        totalDonationsAmount.textContent = `$${totalAmount.toFixed(2)}`;
        monthlyDonationsAmount.textContent = `$${monthlyAmount.toFixed(2)}`;
        averageDonationAmount.textContent = `$${averageAmount.toFixed(2)}`;
    }

    // Render donations table
    function renderDonationsTable(donations) {
        donationsTable.innerHTML = '';

        if (donations.length === 0) {
            const row = donationsTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6;
            cell.textContent = 'No donations found';
            cell.classList.add('text-center');
            return;
        }

        donations.forEach(donation => {
            const row = donationsTable.insertRow();

            // ID
            const idCell = row.insertCell();
            idCell.textContent = donation.donationId;

            // Donor
            const donorCell = row.insertCell();
            donorCell.textContent = donation.user.name;

            // Amount
            const amountCell = row.insertCell();
            amountCell.textContent = `$${donation.amount.toFixed(2)}`;

            // Date
            const dateCell = row.insertCell();
            const date = new Date(donation.date);
            dateCell.textContent = date.toLocaleDateString();

            // Note
            const noteCell = row.insertCell();
            noteCell.textContent = donation.note || '--';

            // Actions
            const actionsCell = row.insertCell();
            actionsCell.className = 'donation-actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-outline-primary me-1';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.title = 'Edit';
            editBtn.addEventListener('click', () => editDonation(donation.donationId));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-outline-danger';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.title = 'Delete';
            deleteBtn.addEventListener('click', () => deleteDonation(donation.donationId));

            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });
    }

    // Update top donors list
    function updateTopDonors() {
        // Group donations by user and sum amounts
        const donorMap = new Map();

        allDonations.forEach(donation => {
            if (!donorMap.has(donation.user.id)) {
                donorMap.set(donation.user.id, {
                    id: donation.user.id,
                    name: donation.user.name,
                    amount: 0,
                    count: 0
                });
            }

            const donor = donorMap.get(donation.user.id);
            donor.amount += donation.amount;
            donor.count++;
        });

        // Convert to array and sort by amount (descending)
        const topDonors = Array.from(donorMap.values())
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5); // Get top 5

        topDonorsList.innerHTML = '';

        if (topDonors.length === 0) {
            topDonorsList.innerHTML = '<div class="text-muted text-center py-2">No donors found</div>';
            return;
        }

        topDonors.forEach(donor => {
            const donorItem = document.createElement('a');
            donorItem.className = 'list-group-item list-group-item-action';
            donorItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${donor.name}</h6>
                    <small>${donor.count} donation${donor.count !== 1 ? 's' : ''}</small>
                </div>
                <p class="mb-1">Total: <strong>$${donor.amount.toFixed(2)}</strong></p>
            `;
            topDonorsList.appendChild(donorItem);
        });
    }

    // Update donation chart
    function updateChart(months) {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate date range
        let startDate;
        if (months === 0) {
            // All time
            startDate = new Date(Math.min(...allDonations.map(d => new Date(d.date).getTime())));
        } else {
            startDate = new Date(currentYear, currentMonth - months, 1);
        }

        // Filter donations within date range
        const filteredDonations = allDonations.filter(donation => {
            const donationDate = new Date(donation.date);
            return donationDate >= startDate;
        });

        // Group by month
        const monthlyData = {};
        filteredDonations.forEach(donation => {
            const date = new Date(donation.date);
            const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = 0;
            }

            monthlyData[monthYear] += donation.amount;
        });

        // Prepare labels and data for chart
        const labels = [];
        const data = [];

        // Generate all months in the range
        const endDate = new Date(currentYear, currentMonth + 1, 0); // Last day of current month
        const dateIterator = new Date(startDate);

        while (dateIterator <= endDate) {
            const monthYear = `${dateIterator.getFullYear()}-${(dateIterator.getMonth() + 1).toString().padStart(2, '0')}`;
            labels.push(new Date(dateIterator).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
            data.push(monthlyData[monthYear] || 0);

            dateIterator.setMonth(dateIterator.getMonth() + 1);
        }

        // Create or update chart
        const ctx = document.getElementById('donationChart').getContext('2d');

        if (donationChart) {
            donationChart.data.labels = labels;
            donationChart.data.datasets[0].data = data;
            donationChart.update();
        } else {
            donationChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Donations ($)',
                        data: data,
                        backgroundColor: 'rgba(78, 115, 223, 0.5)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value;
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.raw.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // Show add donation modal
    function showAddDonationModal() {
        // Reset form
        document.getElementById('donationForm').reset();
        donationDateInput.valueAsDate = new Date();

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addDonationModal'));
        modal.show();
    }

    // Save donation
    function saveDonation() {
        // Validate form
        if (!donationUserSelect.value || !donationAmountInput.value || !donationDateInput.value) {
            alert('Please fill in all required fields');
            return;
        }

        // Create donation object
        const newDonation = {
            donationId: allDonations.length > 0 ? Math.max(...allDonations.map(d => d.donationId)) + 1 : 1,
            amount: parseFloat(donationAmountInput.value),
            date: donationDateInput.value,
            note: donationNoteInput.value,
            user: allUsers.find(user => user.id === parseInt(donationUserSelect.value))
        };

        // In a real app, this would be an API call to save to the server
        allDonations.push(newDonation);

        // Update UI
        updateDonationStats();
        renderDonationsTable(allDonations);
        updateTopDonors();
        updateChart(6); // Update chart with current period

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addDonationModal'));
        modal.hide();

        // Show success message
        alert('Donation saved successfully!');
    }

    // Edit donation
    function editDonation(donationId) {
        const donation = allDonations.find(d => d.donationId === donationId);
        if (!donation) return;

        // Set form values
        donationUserSelect.value = donation.user.id;
        donationAmountInput.value = donation.amount;
        donationDateInput.value = donation.date;
        donationNoteInput.value = donation.note || '';

        // Change modal title
        document.getElementById('addDonationModalLabel').textContent = 'Edit Donation';

        // Change save button to update
        saveDonationBtn.textContent = 'Update Donation';
        saveDonationBtn.onclick = function() {
            updateDonation(donationId);
        };

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addDonationModal'));
        modal.show();
    }

    // Update donation
    function updateDonation(donationId) {
        const donationIndex = allDonations.findIndex(d => d.donationId === donationId);
        if (donationIndex === -1) return;

        // Validate form
        if (!donationUserSelect.value || !donationAmountInput.value || !donationDateInput.value) {
            alert('Please fill in all required fields');
            return;
        }

        // Update donation
        allDonations[donationIndex] = {
            donationId: donationId,
            amount: parseFloat(donationAmountInput.value),
            date: donationDateInput.value,
            note: donationNoteInput.value,
            user: allUsers.find(user => user.id === parseInt(donationUserSelect.value))
        };

        // Update UI
        updateDonationStats();
        renderDonationsTable(allDonations);
        updateTopDonors();
        updateChart(6); // Update chart with current period

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addDonationModal'));
        modal.hide();

        // Show success message
        alert('Donation updated successfully!');

        // Reset save button
        saveDonationBtn.textContent = 'Save Donation';
        saveDonationBtn.onclick = saveDonation;
    }

    // Delete donation
    function deleteDonation(donationId) {
        if (!confirm('Are you sure you want to delete this donation?')) {
            return;
        }

        // In a real app, this would be an API call to delete from the server
        allDonations = allDonations.filter(d => d.donationId !== donationId);

        // Update UI
        updateDonationStats();
        renderDonationsTable(allDonations);
        updateTopDonors();
        updateChart(6); // Update chart with current period

        // Show success message
        alert('Donation deleted successfully!');
    }

    // Search donations
    function searchDonations() {
        const searchTerm = donationSearch.value.toLowerCase();

        if (!searchTerm) {
            renderDonationsTable(allDonations);
            return;
        }

        const filteredDonations = allDonations.filter(donation => {
            return (
                donation.donationId.toString().includes(searchTerm) ||
                donation.user.name.toLowerCase().includes(searchTerm) ||
                donation.amount.toString().includes(searchTerm) ||
                donation.date.includes(searchTerm) ||
                (donation.note && donation.note.toLowerCase().includes(searchTerm))
            );
        });

        renderDonationsTable(filteredDonations);
    }
});