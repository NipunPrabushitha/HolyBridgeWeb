// dynamic-content.js

document.addEventListener('DOMContentLoaded', function() {
    // Load user info in dropdown
    loadUserDropdownInfo();

    // Initialize dropdown toggle (if using Bootstrap 4)
    $('.dropdown-toggle').dropdown();

    // Logout functionality
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });

    // Function to load user info in dropdown
    function loadUserDropdownInfo() {
        // Get user data from storage or API
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            name: 'Admin User',
            email: 'admin@holybridge.com',
            role: 'Administrator'
        };

        // Update dropdown elements
        document.getElementById('dropdownUserName').textContent = userData.name;
        document.getElementById('dropdownUserEmail').textContent = userData.email;
        document.getElementById('dropdownUserRole').textContent = userData.role;
        document.getElementById('navbarUserName').textContent = userData.name;
    }

    // Logout function
    async function logoutUser() {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        });

        if (result.isConfirmed) {
            try {
                // Optional: Send logout request to server
                const token = getAuthToken();
                if (token) {
                    await fetch(`${API_BASE_URL}/auth/logout`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
            } catch (error) {
                console.error('Logout API error:', error);
                // Continue with client-side logout even if API fails
            } finally {
                // Clear all authentication data
                localStorage.clear();
                sessionStorage.clear();

                // Redirect to login page
                window.location.href = 'login.html';
            }
        }
    }

    // Helper function to get auth token
    function getAuthToken() {
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Main content area where we'll load our dynamic content
    const mainContent = document.getElementById('main-content');

    // Default view (dashboard)
    loadDashboard();

    // Handle navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.sidebar-link').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Load the appropriate content
            const target = this.getAttribute('href').replace('#', '');
            loadContent(target);
        });
    });

    // Function to load content dynamically
    function loadContent(view) {
        switch(view) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'users':
                loadUsers();
                break;
            case 'members':
                loadMembers();
                break;
            case 'dues':
                loadDues();
                break;
            case 'categories':
                loadCategories();
                break;
            case 'dioceses':
                loadDioceses();
                break;
            case 'parishes':
                loadParishes();
                break;
            case 'donations':
                loadDonations();
                break;
            case 'eventFacilities':
                loadEventFacilities()
                break;
            case 'settings':
                loadSettings();
                break;
            default:
                loadDashboard();
        }
    }

    // ======================
    // DASHBOARD CONTENT
    // ======================
    function loadDashboard() {
        document.title = 'HolyBridge - Dashboard';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Dashboard Overview</h1>
                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="generateReportBtn">
                        <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
                    </a>
                </div>
                
                <!-- Content Row -->
                <div class="row">
                    <!-- Members Card -->
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Members</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="membersCount">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-users fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Dues Card -->
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Monthly Dues</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="duesAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Donations Card -->
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                            Total Donations</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="donationsAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-hand-holding-usd fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Parishes Card -->
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Parishes</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="parishesCount">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-church fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">Recent Activity</h6>
                                <button class="btn btn-sm btn-primary" id="refreshActivityBtn">
                                    <i class="fas fa-sync-alt"></i> Refresh
                                </button>
                            </div>
                            <div class="card-body">
                                <div class="activity-feed" id="recentActivity">
                                    <div class="text-center py-4">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load dashboard data
        fetchDashboardData();

        // Add event listeners
        document.getElementById('refreshActivityBtn')?.addEventListener('click', fetchDashboardData);
    }




// ======================
// USER MANAGEMENT
// ======================


    async function loadUsers() {
        document.title = 'HolyBridge - User Management';
        mainContent.innerHTML = `
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">User Management</h1>
                <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addUserBtn">
                    <i class="fas fa-plus fa-sm text-white-50"></i> Add User
                </button>
            </div>
            
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="usersTableBody">
                                <tr>
                                    <td colspan="4" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add User Modal -->
        <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="userForm">
                            <div class="mb-3">
                                <label for="userName" class="form-label">Name *</label>
                                <input type="text" class="form-control" id="userName" required>
                            </div>
                            <div class="mb-3">
                                <label for="userEmail" class="form-label">Email *</label>
                                <input type="email" class="form-control" id="userEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="userPassword" class="form-label">Password *</label>
                                <input type="password" class="form-control" id="userPassword" required>
                            </div>
                            <div class="mb-3">
                                <label for="userRole" class="form-label">Role *</label>
                                <select class="form-control" id="userRole" required>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveUserBtn">Save User</button>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Set up event listeners
        document.getElementById('addUserBtn').addEventListener('click', showAddUserModal);
        document.getElementById('saveUserBtn').addEventListener('click', saveUser);

        await fetchUsers();
    }

    async function fetchUsers() {
        const token = getAuthToken();
        if (!token) {
            showLoginMessage();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();

            if (data.code === 200 && data.data) {
                renderUsersTable(data.data);
            } else {
                throw new Error(data.message || 'No user data received');
            }
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Failed to load users');
        }
    }

    function renderUsersTable(users) {
        const tableBody = document.getElementById('usersTableBody');

        if (!users || users.length === 0) {
            tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No users found</td>
            </tr>
        `;
            return;
        }

        tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>
                <span class="badge ${user.role.toLowerCase() === 'admin' ? 'bg-danger' : 'bg-primary'}">
                    ${user.role || 'USER'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-danger delete-user" data-id="${user.uid}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.getAttribute('data-id');
                confirmDeleteUser(userId);
            });
        });
    }

    function showAddUserModal() {
        const modal = new bootstrap.Modal(document.getElementById('userModal'));
        document.getElementById('userForm').reset();
        modal.show();
    }

    async function saveUser() {
        const token = getAuthToken();
        if (!token) {
            showLoginMessage();
            return;
        }

        const saveBtn = document.getElementById('saveUserBtn');
        const originalText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Saving...';

        const userData = {
            name: document.getElementById('userName').value.trim(),
            email: document.getElementById('userEmail').value.trim(),
            password: document.getElementById('userPassword').value.trim(),
            role: document.getElementById('userRole').value
        };

        // Basic validation
        if (!userData.name || !userData.email || !userData.password) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill all required fields'
            });
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalText;
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save user');
            }

            if (data.code === 201) {
                // Close modal
                bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User created successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Refresh the table
                await fetchUsers();
            } else {
                throw new Error(data.message || 'Failed to save user');
            }
        } catch (error) {
            console.error('Error saving user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to save user'
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalText;
        }
    }

    function confirmDeleteUser(userId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(userId);
            }
        });
    }

    async function deleteUser(userId) {
        const token = getAuthToken();
        if (!token) {
            showLoginMessage();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            const data = await response.json();

            if (data.code === 200) {
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                );
                // Refresh the table
                fetchUsers();
            } else {
                throw new Error(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Error!',
                error.message || 'Could not delete user',
                'error'
            );
        }
    }

    function showLoginMessage() {
        const tableBody = document.getElementById('usersTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Please login first
                    <div class="mt-2">
                        <a href="login.html" class="btn btn-sm btn-primary">
                            <i class="fas fa-sign-in-alt me-1"></i> Go to Login
                        </a>
                    </div>
                </div>
            </td>
        </tr>
    `;
    }

    function showError(message) {
        const tableBody = document.getElementById('usersTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center text-danger">
                <i class="fas fa-exclamation-circle me-2"></i>
                ${message}
            </td>
        </tr>
    `;
    }

// Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('usersTableBody')) {
            loadUsers();
        }
    });

    // ======================
    // MEMBERS CONTENT
    // ======================
    async function loadMembers() {
        document.title = 'HolyBridge - Member Management';
        mainContent.innerHTML = `
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Member Management</h1>
                <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addMemberBtn">
                    <i class="fas fa-plus fa-sm text-white-50"></i> Add Member
                </button>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">All Members</h6>
                    <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search..." id="memberSearch">
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Contact</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Parish</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="membersTableBody">
                                <tr>
                                    <td colspan="9" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Load initial data
        fetchMembers();

        // Set up event listeners
        document.getElementById('addMemberBtn')?.addEventListener('click', () => showMemberEditModal(null));
        document.getElementById('memberSearch')?.addEventListener('input', searchMembers);
    }

    async function fetchMembers() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('membersTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="9" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/member/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const members = await response.json();
            renderMembersTable(members);
        } catch (error) {
            console.error('Error fetching members:', error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-danger">
                    Error loading members: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    function renderMembersTable(members) {
        const tableBody = document.getElementById('membersTableBody');

        if (members.length === 0) {
            tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">No members found</td>
            </tr>
        `;
            return;
        }

        tableBody.innerHTML = members.map(member => `
        <tr>
            <td>${member.memberId}</td>
            <td>${member.name}</td>
            <td>${member.address || '-'}</td>
            <td>${member.contactNumber || '-'}</td>
            <td>${member.gender || '-'}</td>
            <td>${member.dateOfBirth || '-'}</td>
            <td>${member.parishDTO?.name || '-'}</td>
            <td>
                <button class="btn btn-sm ${member.imagepath === 'true' ? 'btn-success' : 'btn-secondary'} toggle-status" 
                    data-id="${member.memberId}" 
                    data-status="${member.imagepath}">
                    ${member.imagepath === 'true' ? 'Active' : 'Inactive'}
                </button>
            </td>
            <td>
                <button class="btn btn-sm btn-primary edit-member"
                    data-id="${member.memberId}"
                    data-name="${member.name}"
                    data-address="${member.address || ''}"
                    data-contact="${member.contactNumber || ''}"
                    data-gender="${member.gender || ''}"
                    data-dob="${member.dateOfBirth || ''}"
                    data-parish="${member.parishDTO?.parishId || ''}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-member" data-id="${member.memberId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-member').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberData = {
                    memberId: btn.dataset.id,
                    name: btn.dataset.name,
                    address: btn.dataset.address,
                    contactNumber: btn.dataset.contact,
                    gender: btn.dataset.gender,
                    dateOfBirth: btn.dataset.dob,
                    parishDTO: { parishId: btn.dataset.parish }
                };
                showMemberEditModal(memberData);
            });
        });

        document.querySelectorAll('.delete-member').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteMember(btn.dataset.id));
        });

        document.querySelectorAll('.toggle-status').forEach(btn => {
            btn.addEventListener('click', () => toggleMemberStatus(btn.dataset.id, btn.dataset.status));
        });
    }

    async function toggleMemberStatus(memberId, currentStatus) {
        const newStatus = currentStatus === 'true' ? 'false' : 'true';

        const result = await Swal.fire({
            title: 'Confirm Status Change',
            text: `Are you sure you want to ${newStatus === 'true' ? 'activate' : 'deactivate'} this member?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        });

        if (!result.isConfirmed) return;

        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            // First get the member data
            const response = await fetch(`${API_BASE_URL}/member/get/${memberId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch member data');
            }

            const memberData = await response.json();

            // Update only the imagepath field
            const updatedMember = {
                ...memberData,
                imagepath: newStatus
            };

            // Send the update
            const updateResponse = await fetch(`${API_BASE_URL}/member/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedMember)
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.message || 'Failed to update member status');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Member status updated to ${newStatus === 'true' ? 'Active' : 'Inactive'}`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchMembers();

        } catch (error) {
            console.error('Error toggling member status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while updating member status',
            });
        }
    }

    function showMemberEditModal(member) {
        // Create modal HTML
        const isNew = member === null;
        const modalTitle = isNew ? 'Add New Member' : 'Edit Member';

        const modalHTML = `
        <div class="modal fade" id="editMemberModal" tabindex="-1" aria-labelledby="editMemberModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editMemberModalLabel">${modalTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="memberForm">
                            <input type="hidden" id="memberId" value="${member?.memberId || ''}">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="memberName" class="form-label">Name *</label>
                                        <input type="text" class="form-control" id="memberName"
                                            value="${member?.name || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="memberAddress" class="form-label">Address *</label>
                                        <textarea class="form-control" id="memberAddress" rows="2" required>${member?.address || ''}</textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="memberContact" class="form-label">Contact Number *</label>
                                        <input type="tel" class="form-control" id="memberContact"
                                            value="${member?.contactNumber || ''}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="memberGender" class="form-label">Gender *</label>
                                        <select class="form-control" id="memberGender" required>
                                            <option value="">Select Gender</option>
                                            <option value="Male" ${member?.gender === 'Male' ? 'selected' : ''}>Male</option>
                                            <option value="Female" ${member?.gender === 'Female' ? 'selected' : ''}>Female</option>
                                            <option value="Other" ${member?.gender === 'Other' ? 'selected' : ''}>Other</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="memberDob" class="form-label">Date of Birth *</label>
                                        <input type="date" class="form-control" id="memberDob"
                                            value="${member?.dateOfBirth || ''}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="memberParish" class="form-label">Parish *</label>
                                        <select class="form-control" id="memberParish" required>
                                            <option value="">Select Parish</option>
                                            <!-- Will be populated by JavaScript -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveMemberBtn">
                            ${isNew ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editMemberModal'));
        editModal.show();

        // Fetch parishes for dropdown
        fetchParishesForDropdown(member?.parishDTO?.parishId);

        // Handle save button click
        document.getElementById('saveMemberBtn').addEventListener('click', async () => {
            await saveMember();
        });

        // Clean up when modal is closed
        document.getElementById('editMemberModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editMemberModal').remove();
        });
    }

    async function fetchParishesForDropdown(selectedParishId = null) {
        const token = getAuthToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/parish/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch parishes');
            }

            const parishes = await response.json();
            const parishSelect = document.getElementById('memberParish');

            // Clear existing options except the first one
            while (parishSelect.options.length > 1) {
                parishSelect.remove(1);
            }

            // Add new options
            parishes.forEach(parish => {
                const option = document.createElement('option');
                option.value = parish.parishId;
                option.textContent = parish.name;
                option.selected = (parish.parishId === selectedParishId);
                parishSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching parishes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load parishes. Please try again.',
            });
        }
    }

    async function saveMember() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const saveBtn = document.getElementById('saveMemberBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const memberData = {
            memberId: document.getElementById('memberId').value,
            name: document.getElementById('memberName').value.trim(),
            address: document.getElementById('memberAddress').value.trim(),
            contactNumber: document.getElementById('memberContact').value.trim(),
            gender: document.getElementById('memberGender').value,
            dateOfBirth: document.getElementById('memberDob').value,
            parishDTO: { parishId: document.getElementById('memberParish').value },
            imagepath: 'true' // Default to active when creating/updating
        };

        // Validate required fields
        if (!memberData.name || !memberData.address || !memberData.contactNumber ||
            !memberData.gender || !memberData.dateOfBirth || !memberData.parishDTO.parishId) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'All fields are required',
            });
            return;
        }

        try {
            const isUpdate = memberData.memberId !== '';
            const url = `${API_BASE_URL}/member/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            if (isUpdate) {
                memberData.memberId = parseInt(memberData.memberId);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(memberData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} member`);
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editMemberModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Member ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchMembers();

        } catch (error) {
            console.error('Error saving member:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while saving the member',
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteMember(memberId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteMember(memberId);
        }
    }

    async function deleteMember(memberId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/member/delete/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete member');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Member has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchMembers();

        } catch (error) {
            console.error('Error deleting member:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the member',
            });
        }
    }

    function searchMembers() {
        const searchTerm = document.getElementById('memberSearch').value.toLowerCase();
        const rows = document.querySelectorAll('#membersTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    // ======================
    // DUES CONTENT
    // ======================
    async function loadDues() {
        document.title = 'HolyBridge - Dues Management';
        mainContent.innerHTML = `
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dues Management</h1>
                <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDuesBtn">
                    <i class="fas fa-plus fa-sm text-white-50"></i> Add Dues
                </button>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">All Dues</h6>
                    <div>
                        <input type="text" class="form-control form-control-sm" style="width: 200px; display: inline-block;" placeholder="Search..." id="duesSearch">
                        <select class="form-control form-control-sm" style="width: 200px; display: inline-block; margin-left: 10px;" id="memberFilter">
                            <option value="">Filter by Member</option>
                        </select>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Member</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="duesTableBody">
                                <tr>
                                    <td colspan="6" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Load initial data
        fetchDues();
        fetchMembersForFilter();

        // Set up event listeners
        document.getElementById('addDuesBtn')?.addEventListener('click', () => showDuesEditModal(null));
        document.getElementById('duesSearch')?.addEventListener('input', searchDues);
        document.getElementById('memberFilter')?.addEventListener('change', filterDuesByMember);
    }

    async function fetchDues() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('duesTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/dues/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dues');
            }

            const dues = await response.json();
            renderDuesTable(dues);
        } catch (error) {
            console.error('Error fetching dues:', error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Error loading dues: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    function renderDuesTable(dues) {
        const tableBody = document.getElementById('duesTableBody');

        if (dues.length === 0) {
            tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No dues found</td>
            </tr>
        `;
            return;
        }

        tableBody.innerHTML = dues.map(due => `
        <tr>
            <td>${due.duesId}</td>
            <td>${due.member?.name || 'Unknown Member'}</td>
            <td>${formatCurrency(due.amount)}</td>
            <td>${formatDate(due.dueDate)}</td>
            <td>
                <span class="badge ${isDueOverdue(due.dueDate) ? 'bg-danger' : 'bg-success'}">
                    ${isDueOverdue(due.dueDate) ? 'Overdue' : 'Active'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary edit-dues"
                    data-id="${due.duesId}"
                    data-amount="${due.amount}"
                    data-duedate="${due.dueDate}"
                    data-memberid="${due.member?.memberId || ''}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-dues" data-id="${due.duesId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-dues').forEach(btn => {
            btn.addEventListener('click', () => {
                const dueData = {
                    duesId: btn.dataset.id,
                    amount: btn.dataset.amount,
                    dueDate: btn.dataset.duedate,
                    member: { memberId: btn.dataset.memberid }
                };
                showDuesEditModal(dueData);
            });
        });

        document.querySelectorAll('.delete-dues').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteDues(btn.dataset.id));
        });
    }

    function isDueOverdue(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        return due < today;
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    async function fetchMembersForFilter() {
        const token = getAuthToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/member/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const members = await response.json();
            const memberFilter = document.getElementById('memberFilter');

            // Clear existing options except the first one
            while (memberFilter.options.length > 1) {
                memberFilter.remove(1);
            }

            // Add new options
            members.forEach(member => {
                const option = document.createElement('option');
                option.value = member.memberId;
                option.textContent = member.name;
                memberFilter.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching members for filter:', error);
        }
    }

    function showDuesEditModal(due) {
        // Create modal HTML
        const isNew = due === null;
        const modalTitle = isNew ? 'Add New Dues' : 'Edit Dues';

        const modalHTML = `
        <div class="modal fade" id="editDuesModal" tabindex="-1" aria-labelledby="editDuesModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editDuesModalLabel">${modalTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="duesForm">
                            <input type="hidden" id="duesId" value="${due?.duesId || ''}">
                            <div class="mb-3">
                                <label for="duesMember" class="form-label">Member *</label>
                                <select class="form-control" id="duesMember" required>
                                    <option value="">Select Member</option>
                                    <!-- Will be populated by JavaScript -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="duesAmount" class="form-label">Amount *</label>
                                <input type="number" step="0.01" class="form-control" id="duesAmount"
                                    value="${due?.amount || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label for="duesDate" class="form-label">Due Date *</label>
                                <input type="date" class="form-control" id="duesDate"
                                    value="${due?.dueDate || ''}" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveDuesBtn">
                            ${isNew ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editDuesModal'));
        editModal.show();

        // Fetch members for dropdown
        fetchMembersForDropdown(due?.member?.memberId);

        // Handle save button click
        document.getElementById('saveDuesBtn').addEventListener('click', async () => {
            await saveDues();
        });

        // Clean up when modal is closed
        document.getElementById('editDuesModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editDuesModal').remove();
        });
    }

    async function fetchMembersForDropdown(selectedMemberId = null) {
        const token = getAuthToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/member/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const members = await response.json();
            const memberSelect = document.getElementById('duesMember');

            // Clear existing options except the first one
            while (memberSelect.options.length > 1) {
                memberSelect.remove(1);
            }

            // Add new options
            members.forEach(member => {
                const option = document.createElement('option');
                option.value = member.memberId;
                option.textContent = member.name;
                option.selected = (member.memberId === selectedMemberId);
                memberSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching members:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load members. Please try again.',
            });
        }
    }

    async function saveDues() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const saveBtn = document.getElementById('saveDuesBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const duesData = {
            duesId: document.getElementById('duesId').value,
            amount: parseFloat(document.getElementById('duesAmount').value),
            dueDate: document.getElementById('duesDate').value,
            member: { memberId: parseInt(document.getElementById('duesMember').value) }
        };

        // Validate required fields
        if (!duesData.amount || isNaN(duesData.amount) || !duesData.dueDate || !duesData.member.memberId) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'All fields are required and must be valid',
            });
            return;
        }

        try {
            const isUpdate = duesData.duesId !== '';
            const url = `${API_BASE_URL}/dues/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            if (isUpdate) {
                duesData.duesId = parseInt(duesData.duesId);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(duesData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} dues`);
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editDuesModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Dues ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchDues();

        } catch (error) {
            console.error('Error saving dues:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while saving the dues',
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteDues(duesId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteDues(duesId);
        }
    }

    async function deleteDues(duesId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/dues/delete/${duesId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete dues');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Dues has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchDues();

        } catch (error) {
            console.error('Error deleting dues:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the dues',
            });
        }
    }

    function searchDues() {
        const searchTerm = document.getElementById('duesSearch').value.toLowerCase();
        const rows = document.querySelectorAll('#duesTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    async function filterDuesByMember() {
        const memberId = document.getElementById('memberFilter').value;
        const token = getAuthToken();

        if (!memberId) {
            fetchDues();
            return;
        }

        const tableBody = document.getElementById('duesTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/dues/getByMember/${memberId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dues by member');
            }

            const dues = await response.json();
            renderDuesTable(dues);
        } catch (error) {
            console.error('Error filtering dues by member:', error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Error loading dues: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    // ======================
    // CATEGORIES CONTENT
    // ======================
    function loadCategories() {
        document.title = 'HolyBridge - Category Management';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Category Management</h1>
                    <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addCategoryBtn">
                        <i class="fas fa-plus fa-sm text-white-50"></i> Add Category
                    </button>
                </div>
                
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Add/Edit Category</h6>
                            </div>
                            <div class="card-body">
                                <form id="categoryForm">
                                    <input type="hidden" id="categoryId">
                                    <div class="form-group">
                                        <label>Category Name *</label>
                                        <input type="text" class="form-control" id="categoryName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea class="form-control" id="categoryDescription" rows="3"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary mr-2" id="saveCategoryBtn">Save</button>
                                    <button type="button" class="btn btn-secondary" id="cancelEditBtn" style="display:none;">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">All Categories</h6>
                                <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search..." id="categorySearch">
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="categoriesTableBody">
                                            <tr>
                                                <td colspan="4" class="text-center">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load initial data
        fetchCategories();

        // Set up event listeners
        document.getElementById('addCategoryBtn')?.addEventListener('click', resetCategoryForm);
        document.getElementById('categoryForm')?.addEventListener('submit', handleCategorySubmit);
        document.getElementById('cancelEditBtn')?.addEventListener('click', resetCategoryForm);
        document.getElementById('categorySearch')?.addEventListener('input', searchCategories);
    }

    async function handleCategorySubmit(e) {
        e.preventDefault();

        // Get authentication token
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        // Get form elements
        const saveBtn = document.getElementById('saveCategoryBtn');
        const categoryId = document.getElementById('categoryId').value;
        const categoryName = document.getElementById('categoryName').value.trim();
        const categoryDescription = document.getElementById('categoryDescription').value.trim();

        // Validate required fields
        if (!categoryName) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Category name is required',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Prepare request data
        const requestData = {
            name: categoryName,
            description: categoryDescription
        };

        // Show loading state
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        try {
            // Determine if this is an update or create operation
            const isUpdate = categoryId !== '';
            const url = `${API_BASE_URL}/category/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            // If updating, add the ID to the request data
            if (isUpdate) {
                requestData.categoryId = categoryId;
            }

            // Make API request
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            // Handle response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} category`);
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Category ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Reset form and refresh table
            resetCategoryForm();
            await fetchCategories();

        } catch (error) {
            console.error('Category operation error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while processing your request',
                confirmButtonText: 'OK'
            });
        } finally {
            // Restore button state
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    function resetCategoryForm() {
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryId').value = '';
        document.getElementById('cancelEditBtn').style.display = 'none';
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    async function loadDioceses() {
        document.title = 'HolyBridge - Diocese Management';
        mainContent.innerHTML = `
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Diocese Management</h1>
            <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDioceseBtn">
                <i class="fas fa-plus fa-sm text-white-50"></i> Add Diocese
            </button>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                <h6 class="m-0 font-weight-bold text-primary">All Dioceses</h6>
                <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search..." id="dioceseSearch">
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>Bishop</th>
                                <th>Ministry</th>
                            </tr>
                        </thead>
                        <tbody id="diocesesTableBody">
                            <tr>
                                <td colspan="7" class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `;

        // Load initial data
        fetchDioceses();

        // Set up event listeners
        document.getElementById('addDioceseBtn')?.addEventListener('click', () => showDioceseEditModal(null));
        document.getElementById('dioceseSearch')?.addEventListener('input', searchDioceses);
    }

    async function fetchDioceses() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('diocesesTableBody');
        tableBody.innerHTML = `
    <tr>
        <td colspan="7" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </td>
    </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/diocese/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dioceses');
            }

            const dioceses = await response.json();
            renderDiocesesTable(dioceses);
        } catch (error) {
            console.error('Error fetching dioceses:', error);
            tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center text-danger">
                Error loading dioceses: ${error.message}
            </td>
        </tr>
        `;
        }
    }

    function renderDiocesesTable(dioceses) {
        const tableBody = document.getElementById('diocesesTableBody');

        if (dioceses.length === 0) {
            tableBody.innerHTML = `
        <tr>
            <td colspan="7" class="text-center">No dioceses found</td>
        </tr>
        `;
            return;
        }

        tableBody.innerHTML = dioceses.map(diocese => `
    <tr>
        <td>${diocese.id}</td>
        <td>${diocese.name}</td>
        <td>${diocese.description || '-'}</td>
        <td>${diocese.address || '-'}</td>
        <td>${diocese.bishopName || '-'}</td>
        <td>
            <button class="btn btn-sm btn-primary edit-diocese" 
                data-id="${diocese.id}" 
                data-name="${diocese.name}" 
                data-description="${diocese.description || ''}"
                data-address="${diocese.address || ''}"
                data-bishop="${diocese.bishopName || ''}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-diocese" data-id="${diocese.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
    `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-diocese').forEach(btn => {
            btn.addEventListener('click', () => {
                const dioceseData = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    description: btn.dataset.description,
                    address: btn.dataset.address,
                    bishopName: btn.dataset.bishop
                };
                showDioceseEditModal(dioceseData);
            });
        });

        document.querySelectorAll('.delete-diocese').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteDiocese(btn.dataset.id));
        });
    }

    function showDioceseEditModal(diocese) {
        // Create modal HTML
        const isNew = diocese === null;
        const modalTitle = isNew ? 'Add New Diocese' : 'Edit Diocese';

        const modalHTML = `
    <div class="modal fade" id="editDioceseModal" tabindex="-1" aria-labelledby="editDioceseModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editDioceseModalLabel">${modalTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="dioceseForm">
                        <input type="hidden" id="dioceseId" value="${diocese?.id || ''}">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="dioceseName" class="form-label">Diocese Name *</label>
                                    <input type="text" class="form-control" id="dioceseName" 
                                        value="${diocese?.name || ''}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="dioceseDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="dioceseDescription" rows="3">${diocese?.description || ''}</textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="dioceseAddress" class="form-label">Address *</label>
                                    <textarea class="form-control" id="dioceseAddress" rows="3" required>${diocese?.address || ''}</textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="bishopName" class="form-label">Bishop Name</label>
                                    <input type="text" class="form-control" id="bishopName" 
                                        value="${diocese?.bishopName || ''}">
                                </div>
                                <input type="hidden" id="ministryId" value="1"> <!-- Hardcoded ministry ID -->
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveDioceseBtn">
                        ${isNew ? 'Create' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editDioceseModal'));
        editModal.show();

        // Handle save button click
        document.getElementById('saveDioceseBtn').addEventListener('click', async () => {
            await saveDiocese();
        });

        // Clean up when modal is closed
        document.getElementById('editDioceseModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editDioceseModal').remove();
        });
    }

    async function saveDiocese() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const saveBtn = document.getElementById('saveDioceseBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const dioceseData = {
            id: document.getElementById('dioceseId').value,
            name: document.getElementById('dioceseName').value.trim(),
            description: document.getElementById('dioceseDescription').value.trim(),
            address: document.getElementById('dioceseAddress').value.trim(),
            bishopName: document.getElementById('bishopName').value.trim(),
            ministry: { id: 1 } // Hardcoded ministry ID
        };

        // Validate required fields
        if (!dioceseData.name || !dioceseData.address) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Diocese name and address are required',
            });
            return;
        }

        try {
            const isUpdate = dioceseData.id !== '';
            const url = `${API_BASE_URL}/diocese/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            if (isUpdate) {
                dioceseData.id = parseInt(dioceseData.id);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dioceseData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} diocese`);
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editDioceseModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Diocese ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchDioceses();

        } catch (error) {
            console.error('Error saving diocese:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while saving the diocese',
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteDiocese(dioceseId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteDiocese(dioceseId);
        }
    }

    async function deleteDiocese(dioceseId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/diocese/delete/${dioceseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete diocese');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Diocese has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchDioceses();

        } catch (error) {
            console.error('Error deleting diocese:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the diocese',
            });
        }
    }

    function searchDioceses() {
        const searchTerm = document.getElementById('dioceseSearch').value.toLowerCase();
        const rows = document.querySelectorAll('#diocesesTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }









// ======================
// PARISHES CONTENT - UPDATED FOR NESTED DTOs
// ======================
    async function loadParishes() {
        document.title = 'HolyBridge - Parish Management';
        mainContent.innerHTML = `
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Parish Management</h1>
                <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addParishBtn">
                    <i class="fas fa-plus fa-sm text-white-50"></i> Add Parish
                </button>
            </div>
            
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">All Parishes</h6>
                    <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search..." id="parishSearch">
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Address</th>
                                    <th>Father Name</th>
                                    <th>Diocese</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="parishesTableBody">
                                <tr>
                                    <td colspan="8" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Load initial data
        fetchParishes();

        // Set up event listeners
        document.getElementById('addParishBtn')?.addEventListener('click', () => showParishEditModal(null));
        document.getElementById('parishSearch')?.addEventListener('input', searchParishes);
    }

    async function fetchParishes() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('parishesTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/parish/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch parishes');
            }

            const parishes = await response.json();
            renderParishesTable(parishes);
        } catch (error) {
            console.error('Error fetching parishes:', error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-danger">
                    Error loading parishes: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    function renderParishesTable(parishes) {
        const tableBody = document.getElementById('parishesTableBody');

        if (parishes.length === 0) {
            tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">No parishes found</td>
            </tr>
        `;
            return;
        }

        tableBody.innerHTML = parishes.map(parish => `
        <tr>
            <td>${parish.parishId}</td>
            <td>${parish.name}</td>
            <td>${parish.description || '-'}</td>
            <td>${parish.address || '-'}</td>
            <td>${parish.fartherName || '-'}</td>
            <td>${parish.dioceseDTO?.name || '-'}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-parish" 
                    data-id="${parish.parishId}" 
                    data-name="${parish.name}" 
                    data-description="${parish.description || ''}"
                    data-address="${parish.address || ''}"
                    data-farther="${parish.fartherName || ''}"
                    data-diocese-id="${parish.dioceseDTO?.id || ''}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-parish" data-id="${parish.parishId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-parish').forEach(btn => {
            btn.addEventListener('click', () => {
                const parishData = {
                    parishId: btn.dataset.id,
                    name: btn.dataset.name,
                    description: btn.dataset.description,
                    address: btn.dataset.address,
                    fartherName: btn.dataset.farther,
                    dioceseDTO: {
                        id: btn.dataset.dioceseId
                    }
                };
                showParishEditModal(parishData);
            });
        });

        document.querySelectorAll('.delete-parish').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteParish(btn.dataset.id));
        });
    }

    function showParishEditModal(parish) {
        // Create modal HTML
        const isNew = parish === null;
        const modalTitle = isNew ? 'Add New Parish' : 'Edit Parish';

        const modalHTML = `
    <div class="modal fade" id="editParishModal" tabindex="-1" aria-labelledby="editParishModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editParishModalLabel">${modalTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="parishForm">
                        <input type="hidden" id="parishId" value="${parish?.parishId || ''}">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="parishName" class="form-label">Parish Name *</label>
                                    <input type="text" class="form-control" id="parishName" 
                                        value="${parish?.name || ''}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="parishDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="parishDescription" rows="3">${parish?.description || ''}</textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="parishAddress" class="form-label">Address</label>
                                    <textarea class="form-control" id="parishAddress" rows="3">${parish?.address || ''}</textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="fartherName" class="form-label">Father Name</label>
                                    <input type="text" class="form-control" id="fartherName" 
                                        value="${parish?.fartherName || ''}">
                                </div>
                                <div class="mb-3">
                                    <label for="dioceseId" class="form-label">Diocese *</label>
                                    <select class="form-control" id="dioceseId" required>
                                        <option value="">Select Diocese</option>
                                        <!-- Options will be loaded dynamically -->
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveParishBtn">
                        ${isNew ? 'Create' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editParishModal'));
        editModal.show();

        // Load dioceses for dropdown
        loadDiocesesForModal(parish?.dioceseDTO?.id || '');

        // Handle save button click
        document.getElementById('saveParishBtn').addEventListener('click', async () => {
            await saveParish();
        });

        // Clean up when modal is closed
        document.getElementById('editParishModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editParishModal').remove();
        });
    }

    async function loadDiocesesForModal(selectedDioceseId) {
        const token = getAuthToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/diocese/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dioceses');
            }

            const dioceses = await response.json();
            const dioceseSelect = document.getElementById('dioceseId');

            // Clear existing options except the first one
            while (dioceseSelect.options.length > 1) {
                dioceseSelect.remove(1);
            }

            // Add new options
            dioceses.forEach(diocese => {
                const option = document.createElement('option');
                option.value = diocese.id;
                option.textContent = diocese.name;
                option.selected = (diocese.id == selectedDioceseId);
                dioceseSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error loading dioceses:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load dioceses',
                confirmButtonText: 'OK'
            });
        }
    }

    async function saveParish() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const saveBtn = document.getElementById('saveParishBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const parishData = {
            parishId: document.getElementById('parishId').value,
            name: document.getElementById('parishName').value.trim(),
            description: document.getElementById('parishDescription').value.trim(),
            address: document.getElementById('parishAddress').value.trim(),
            fartherName: document.getElementById('fartherName').value.trim(),
            dioceseDTO: {
                id: document.getElementById('dioceseId').value
            }
        };

        // Validate required fields
        if (!parishData.name || !parishData.dioceseDTO.id) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Parish name and diocese are required',
            });
            return;
        }

        try {
            const isUpdate = parishData.parishId !== '';
            const url = `${API_BASE_URL}/parish/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            if (isUpdate) {
                parishData.parishId = parseInt(parishData.parishId);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(parishData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} parish`);
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editParishModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Parish ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchParishes();

        } catch (error) {
            console.error('Error saving parish:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while saving the parish',
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteParish(parishId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteParish(parishId);
        }
    }

    async function deleteParish(parishId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/parish/delete/${parishId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete parish');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Parish has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchParishes();

        } catch (error) {
            console.error('Error deleting parish:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the parish',
            });
        }
    }

    function searchParishes() {
        const searchTerm = document.getElementById('parishSearch').value.toLowerCase();
        const rows = document.querySelectorAll('#parishesTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }








    // ======================
    // DONATIONS CONTENT
    // ======================
    /*function loadDonations() {
        document.title = 'HolyBridge - Donation Management';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Donation Management</h1>
                    <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDonationBtn">
                        <i class="fas fa-plus fa-sm text-white-50"></i> Add Donation
                    </button>
                </div>
                
                <div class="row">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Donations</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalDonationsCount">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-hand-holding-usd fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Total Amount</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalDonationsAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                            This Month</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="monthlyDonationsAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar-alt fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Average Donation</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="averageDonationAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calculator fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 class="m-0 font-weight-bold text-primary">All Donations</h6>
                        <div class="input-group" style="width: 300px;">
                            <input type="text" class="form-control" placeholder="Search donations..." id="donationSearch">
                            <button class="btn btn-outline-primary" type="button" id="donationSearchBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="donationsTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Donor</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Note</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="donationsTableBody">
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load donation data
        fetchDonations();

        // Add event listeners for the new elements
        document.getElementById('addDonationBtn')?.addEventListener('click', showAddDonationModal);
        document.getElementById('donationSearchBtn')?.addEventListener('click', searchDonations);
    }*/
    function loadDonations() {
        document.title = 'HolyBridge - Donation Management';
        mainContent.innerHTML = `
        <div class="container-fluid">
            <!-- Keep all your existing dashboard cards and headers -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Donation Management</h1>
                   
                </div>
                
                <div class="row">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Donations</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalDonationsCount">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-hand-holding-usd fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Total Amount</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalDonationsAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                            This Month</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="monthlyDonationsAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar-alt fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Average Donation</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="averageDonationAmount">$0.00</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calculator fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 font-weight-bold text-primary">All Donations</h6>
                    <div class="input-group" style="width: 300px;">
                        <input type="text" class="form-control" placeholder="Search donations..." id="donationSearch">
                        <button class="btn btn-outline-primary" type="button" id="donationSearchBtn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="donationsTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Note</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="donationsTableBody">
                                <tr>
                                    <td colspan="5" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Load donation data
        fetchDonations();

        // Add event listeners
        document.getElementById('addDonationBtn')?.addEventListener('click', showAddDonationModal);
        document.getElementById('donationSearchBtn')?.addEventListener('click', searchDonations);
    }


    async function fetchDonations() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('donationsTableBody');
        tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/donation/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch donations');
            }

            const donations = await response.json();
            updateDashboardStats(donations.data || donations); // Handle both formats
            renderDonationsTable(donations.data || donations);
        } catch (error) {
            console.error('Error fetching donations:', error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error loading donations: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    function updateDashboardStats(donations) {
        const totalDonations = donations.length;
        const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const monthlyDonations = donations.filter(donation => {
            const donationDate = new Date(donation.date);
            return donationDate.getMonth() + 1 === currentMonth &&
                donationDate.getFullYear() === currentYear;
        });

        const monthlyAmount = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);
        const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

        document.getElementById('totalDonationsCount').textContent = totalDonations;
        document.getElementById('totalDonationsAmount').textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById('monthlyDonationsAmount').textContent = `$${monthlyAmount.toFixed(2)}`;
        document.getElementById('averageDonationAmount').textContent = `$${averageDonation.toFixed(2)}`;
    }

    function renderDonationsTable(donations) {
        const tableBody = document.getElementById('donationsTableBody');

        if (donations.length === 0) {
            tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No donations found</td>
            </tr>
        `;
            return;
        }

        tableBody.innerHTML = donations.map(donation => `
        <tr>
            <td>${donation.donationId}</td>
            <td>$${donation.amount.toFixed(2)}</td>
            <td>${new Date(donation.date).toLocaleDateString()}</td>
            <td>${donation.note || '-'}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-donation" 
                    data-id="${donation.donationId}"
                    data-amount="${donation.amount}"
                    data-date="${donation.date}"
                    data-note="${donation.note || ''}"
                    data-user-id="${donation.userDTO?.userId || ''}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-donation" data-id="${donation.donationId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-donation').forEach(btn => {
            btn.addEventListener('click', () => {
                const donationData = {
                    donationId: btn.dataset.id,
                    amount: parseFloat(btn.dataset.amount),
                    date: btn.dataset.date,
                    note: btn.dataset.note,
                    userDTO: {
                        userId: btn.dataset.userId
                    }
                };
                showDonationEditModal(donationData);
            });
        });

        document.querySelectorAll('.delete-donation').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteDonation(btn.dataset.id));
        });
    }

    async function searchDonations() {
        const searchTerm = document.getElementById('donationSearch').value.toLowerCase();
        const token = getAuthToken();

        if (!token) {
            console.error('No authentication token found');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/donation/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch donations for search');
            }

            const donations = await response.json();
            const data = donations.data || donations;

            const filtered = data.filter(donation =>
                donation.donationId.toString().includes(searchTerm) ||
                donation.amount.toString().includes(searchTerm) ||
                new Date(donation.date).toLocaleDateString().toLowerCase().includes(searchTerm) ||
                (donation.note && donation.note.toLowerCase().includes(searchTerm))
            );

            renderDonationsTable(filtered);
        } catch (error) {
            console.error('Error searching donations:', error);
            document.getElementById('donationsTableBody').innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error searching donations: ${error.message}
                </td>
            </tr>
        `;
        }
    }

    function confirmDeleteDonation(donationId) {
        if (confirm('Are you sure you want to delete this donation?')) {
            deleteDonation(donationId);
        }
    }

    async function deleteDonation(donationId) {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/donation/delete/${donationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete donation');
            }

            alert('Donation deleted successfully');
            fetchDonations(); // Refresh the table
        } catch (error) {
            console.error('Error deleting donation:', error);
            alert(`Error deleting donation: ${error.message}`);
        }
    }

    // ======================
    // EventFacility CONTENT
    // ======================
    async function loadEventFacilities() {
        document.title = 'HolyBridge - Event Facility Management';
        mainContent.innerHTML = `
<div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Event Facility Management</h1>
        <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addFacilityBtn">
            <i class="fas fa-plus fa-sm text-white-50"></i> Add Facility
        </button>
    </div>
    
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">All Event Facilities</h6>
            <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search..." id="facilitySearch">
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Available</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="facilitiesTableBody">
                        <tr>
                            <td colspan="7" class="text-center">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;

        // Load initial data
        fetchEventFacilities();

        // Set up event listeners
        document.getElementById('addFacilityBtn')?.addEventListener('click', () => showFacilityEditModal(null));
        document.getElementById('facilitySearch')?.addEventListener('input', searchFacilities);
    }

    async function fetchEventFacilities() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('facilitiesTableBody');
        tableBody.innerHTML = `
<tr>
    <td colspan="7" class="text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </td>
</tr>
`;

        try {
            const response = await fetch(`${API_BASE_URL}/event-facility/get-all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch event facilities');
            }

            const facilities = await response.json();
            renderFacilitiesTable(facilities.data); // Assuming data is in response.data
        } catch (error) {
            console.error('Error fetching event facilities:', error);
            tableBody.innerHTML = `
    <tr>
        <td colspan="7" class="text-center text-danger">
            Error loading facilities: ${error.message}
        </td>
    </tr>
    `;
        }
    }

    function renderFacilitiesTable(facilities) {
        const tableBody = document.getElementById('facilitiesTableBody');

        if (facilities.length === 0) {
            tableBody.innerHTML = `
    <tr>
        <td colspan="7" class="text-center">No facilities found</td>
    </tr>
    `;
            return;
        }

        tableBody.innerHTML = facilities.map(facility => `
<tr>
    <td>${facility.facilityId}</td>
    <td>${facility.name}</td>
    <td>${facility.type}</td>
    <td>${facility.capacity || '-'}</td>
    <td>
        <span class="badge ${facility.available ? 'bg-success' : 'bg-danger'}">
            ${facility.available ? 'Available' : 'In Use'}
        </span>
    </td>
    <td>${facility.description || '-'}</td>
    <td>
        <button class="btn btn-sm btn-primary edit-facility" 
            data-id="${facility.facilityId}" 
            data-name="${facility.name}" 
            data-type="${facility.type}"
            data-capacity="${facility.capacity || ''}"
            data-available="${facility.available}"
            data-description="${facility.description || ''}">
            <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-facility" data-id="${facility.facilityId}">
            <i class="fas fa-trash"></i>
        </button>
    </td>
</tr>
`).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-facility').forEach(btn => {
            btn.addEventListener('click', () => {
                const facilityData = {
                    facilityId: btn.dataset.id,
                    name: btn.dataset.name,
                    type: btn.dataset.type,
                    capacity: btn.dataset.capacity,
                    available: btn.dataset.available === 'true',
                    description: btn.dataset.description
                };
                showFacilityEditModal(facilityData);
            });
        });

        document.querySelectorAll('.delete-facility').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteFacility(btn.dataset.id));
        });
    }

    function showFacilityEditModal(facility) {
        // Create modal HTML
        const isNew = facility === null;
        const modalTitle = isNew ? 'Add New Facility' : 'Edit Facility';

        const modalHTML = `
<div class="modal fade" id="editFacilityModal" tabindex="-1" aria-labelledby="editFacilityModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editFacilityModalLabel">${modalTitle}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="facilityForm">
                    <input type="hidden" id="facilityId" value="${facility?.facilityId || ''}">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="facilityName" class="form-label">Facility Name *</label>
                                <input type="text" class="form-control" id="facilityName" 
                                    value="${facility?.name || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label for="facilityType" class="form-label">Type *</label>
                                <select class="form-select" id="facilityType" required>
                                    <option value="">Select Type</option>
                                    <option value="Audio" ${facility?.type === 'Audio' ? 'selected' : ''}>Audio</option>
                                    <option value="Venue" ${facility?.type === 'Venue' ? 'selected' : ''}>Venue</option>
                                    <option value="Seating" ${facility?.type === 'Seating' ? 'selected' : ''}>Seating</option>
                                    <option value="Lighting" ${facility?.type === 'Lighting' ? 'selected' : ''}>Lighting</option>
                                    <option value="Other" ${facility?.type === 'Other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="facilityCapacity" class="form-label">Capacity</label>
                                <input type="number" class="form-control" id="facilityCapacity" 
                                    value="${facility?.capacity || ''}">
                            </div>
                            <div class="mb-3">
                                <label for="facilityAvailable" class="form-label">Availability</label>
                                <select class="form-select" id="facilityAvailable">
                                    <option value="true" ${facility?.available === true ? 'selected' : ''}>Available</option>
                                    <option value="false" ${facility?.available === false ? 'selected' : ''}>In Use</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="facilityDescription" class="form-label">Description</label>
                        <textarea class="form-control" id="facilityDescription" rows="3">${facility?.description || ''}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveFacilityBtn">
                    ${isNew ? 'Create' : 'Save Changes'}
                </button>
            </div>
        </div>
    </div>
</div>
`;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editFacilityModal'));
        editModal.show();

        // Handle save button click
        document.getElementById('saveFacilityBtn').addEventListener('click', async () => {
            await saveFacility();
        });

        // Clean up when modal is closed
        document.getElementById('editFacilityModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editFacilityModal').remove();
        });
    }

    async function saveFacility() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const saveBtn = document.getElementById('saveFacilityBtn');
        const originalBtnText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const facilityData = {
            facilityId: document.getElementById('facilityId').value,
            name: document.getElementById('facilityName').value.trim(),
            type: document.getElementById('facilityType').value,
            capacity: document.getElementById('facilityCapacity').value ?
                parseInt(document.getElementById('facilityCapacity').value) : null,
            available: document.getElementById('facilityAvailable').value === 'true',
            description: document.getElementById('facilityDescription').value.trim()
        };

        // Validate required fields
        if (!facilityData.name || !facilityData.type) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Facility name and type are required',
            });
            return;
        }

        try {
            const isUpdate = facilityData.facilityId !== '';
            const url = `${API_BASE_URL}/event-facility/${isUpdate ? 'update' : 'save'}`;
            const method = isUpdate ? 'PUT' : 'POST';

            if (isUpdate) {
                facilityData.facilityId = parseInt(facilityData.facilityId);
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(facilityData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${isUpdate ? 'update' : 'create'} facility`);
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editFacilityModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Facility ${isUpdate ? 'updated' : 'created'} successfully!`,
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchEventFacilities();

        } catch (error) {
            console.error('Error saving facility:', error);
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.message || 'An error occurred while saving the facility',
            });
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteFacility(facilityId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteFacility(facilityId);
        }
    }

    async function deleteFacility(facilityId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/event-facility/delete/${facilityId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete facility');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Facility has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchEventFacilities();

        } catch (error) {
            console.error('Error deleting facility:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the facility',
            });
        }
    }

    function searchFacilities() {
        const searchTerm = document.getElementById('facilitySearch').value.toLowerCase();
        const rows = document.querySelectorAll('#facilitiesTableBody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    // ======================
    // SETTINGS CONTENT
    // ======================
    function loadSettings() {
        document.title = 'HolyBridge - Settings';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Settings</h1>
                </div>
                <!-- Settings content here -->
            </div>
        `;
    }

    // ======================
    // DATA FETCHING FUNCTIONS
    // ======================
    function fetchDashboardData() {
        // In a real app, these would be API calls
        setTimeout(() => {
            // Recent activity
            const activityFeed = document.getElementById('recentActivity');
            activityFeed.innerHTML = '';

            activityFeed.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No recent activity found
                    </td>
                </tr>
            `;
        }, 1000);
    }





    ////////////////////////////////////////////////////////////////////////////////////////
    //CATEGORIES
    ////////////////////////////////////////////////////////////////////////////////////////

    async function fetchCategories() {
        const token = getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return;
        }

        const tableBody = document.getElementById('categoriesTableBody');
        tableBody.innerHTML = `
    <tr>
        <td colspan="4" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </td>
    </tr>
    `;

        try {
            const response = await fetch(`${API_BASE_URL}/category/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categories = await response.json();
            renderCategoriesTable(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center text-danger">
                Error loading categories: ${error.message}
            </td>
        </tr>
    `;
        }
    }

    function renderCategoriesTable(categories) {
        const tableBody = document.getElementById('categoriesTableBody');

        if (categories.length === 0) {
            tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">No categories found</td>
        </tr>
    `;
            return;
        }

        tableBody.innerHTML = categories.map(category => `
    <tr>
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description || '-'}</td>
        <td>
            <button class="btn btn-sm btn-primary edit-category" data-id="${category.id}" data-name="${category.name}" data-description="${category.description || ''}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-category" data-id="${category.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.edit-category').forEach(btn => {
            btn.addEventListener('click', () => {
                const categoryData = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    description: btn.dataset.description
                };
                showEditModal(categoryData);
            });
        });

        document.querySelectorAll('.delete-category').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteCategory(btn.dataset.id));
        });
    }

    function showEditModal(category) {
        // Create modal HTML
        const modalHTML = `
    <div class="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editCategoryModalLabel">Edit Category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editCategoryForm">
                        <input type="hidden" id="editCategoryId" value="${category.id}">
                        <div class="mb-3">
                            <label for="editCategoryName" class="form-label">Category Name *</label>
                            <input type="text" class="form-control" id="editCategoryName" value="${category.name}" required>
                        </div>
                        <div class="mb-3">
                            <label for="editCategoryDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="editCategoryDescription" rows="3">${category.description || ''}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="updateCategoryBtn">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
`;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Initialize modal
        const editModal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
        editModal.show();

        // Handle update button click
        document.getElementById('updateCategoryBtn').addEventListener('click', async () => {
            await updateCategory();
        });

        // Clean up when modal is closed
        document.getElementById('editCategoryModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('editCategoryModal').remove();
        });
    }

    async function updateCategory() {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        const updateBtn = document.getElementById('updateCategoryBtn');
        const originalBtnText = updateBtn.innerHTML;
        updateBtn.disabled = true;
        updateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const categoryData = {
            id: document.getElementById('editCategoryId').value,
            name: document.getElementById('editCategoryName').value.trim(),
            description: document.getElementById('editCategoryDescription').value.trim()
        };

        // Validate required fields
        if (!categoryData.name) {
            updateBtn.disabled = false;
            updateBtn.innerHTML = originalBtnText;
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Category name is required',
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/category/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(categoryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update category');
            }

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editCategoryModal')).hide();

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchCategories();

        } catch (error) {
            console.error('Error updating category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message || 'An error occurred while updating the category',
            });
        } finally {
            updateBtn.disabled = false;
            updateBtn.innerHTML = originalBtnText;
        }
    }

    async function confirmDeleteCategory(categoryId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await deleteCategory(categoryId);
        }
    }
    document.querySelectorAll('.delete-category').forEach(btn => {
        btn.addEventListener('click', () => deleteCategory(btn.dataset.id));
    });
    async function deleteCategory(categoryId) {
        const token = getAuthToken();
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: 'Please login again',
            }).then(() => {
                window.location.href = 'login.html';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/category/delete/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete category');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Category has been deleted.',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh the table
            await fetchCategories();

        } catch (error) {
            console.error('Error deleting category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: error.message || 'An error occurred while deleting the category',
            });
        }
    }

     //The rest of your existing code remains the same...



   /* function fetchDioceses() {
        setTimeout(() => {
            const tbody = document.getElementById('diocesesTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No dioceses found
                    </td>
                </tr>
            `;
        }, 1000);
    }*/

    /*function fetchParishes() {
        setTimeout(() => {
            const tbody = document.getElementById('parishesTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        No parishes found
                    </td>
                </tr>
            `;
        }, 1000);
    }*/

    // ======================
    // HELPER FUNCTIONS
    // ======================
    function generateYearOptions() {
        let options = '';
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= currentYear - 5; year--) {
            options += `<option value="${year}">${year}</option>`;
        }
        return options;
    }

    function getMonthName(monthNumber) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNumber - 1] || '';
    }

    // ======================
    // ACTION FUNCTIONS
    // ======================


});


////////////////////////////////////////


// Utility function to show loading state
function setLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Save';
    }
}

// Function to show success/error messages
function showAlert(icon, title, text, timer = 1500) {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
    });
}


/////////////////////////////////////////////////////////////////////////////////////




