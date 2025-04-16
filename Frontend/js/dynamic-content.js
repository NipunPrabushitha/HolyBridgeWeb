// dynamic-content.js

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
            case 'reports':
                loadReports();
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
    // USERS CONTENT
    // ======================
    function loadUsers() {
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
                    <div class="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
                        <div class="input-group" style="width: 300px;">
                            <input type="text" class="form-control" placeholder="Search users..." id="userSearch">
                            <button class="btn btn-outline-primary" type="button" id="userSearchBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="usersTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody">
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

        // Load user data
        fetchUsers();

        // Add event listeners for the new elements
        document.getElementById('addUserBtn')?.addEventListener('click', showAddUserModal);
        document.getElementById('userSearchBtn')?.addEventListener('click', searchUsers);
    }

    // ======================
    // MEMBERS CONTENT
    // ======================
    function loadMembers() {
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
                        <div class="input-group" style="width: 300px;">
                            <input type="text" class="form-control" placeholder="Search members..." id="memberSearch">
                            <button class="btn btn-outline-primary" type="button" id="memberSearchBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="membersTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Category</th>
                                        <th>Parish</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="membersTableBody">
                                    <tr>
                                        <td colspan="8" class="text-center">
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
            
            <!-- Add Member Modal -->
            <div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="memberModalTitle">Add New Member</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="memberForm">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First Name</label>
                                            <input type="text" class="form-control" id="firstName" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Last Name</label>
                                            <input type="text" class="form-control" id="lastName" required>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Phone</label>
                                            <input type="tel" class="form-control" id="phone">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control" id="email">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Category</label>
                                            <select class="form-control" id="category">
                                                <option value="">Select Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Diocese</label>
                                            <select class="form-control" id="diocese">
                                                <option value="">Select Diocese</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Parish</label>
                                            <select class="form-control" id="parish">
                                                <option value="">Select Parish</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea class="form-control" id="address" rows="2"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="active">
                                        <label class="form-check-label" for="active">
                                            Active Member
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="saveMemberBtn">Save Member</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load member data
        fetchMembers();

        // Add event listeners
        document.getElementById('addMemberBtn')?.addEventListener('click', showAddMemberModal);
        document.getElementById('memberSearchBtn')?.addEventListener('click', searchMembers);
        document.getElementById('saveMemberBtn')?.addEventListener('click', saveMember);
    }

    // ======================
    // DUES CONTENT
    // ======================
    function loadDues() {
        document.title = 'HolyBridge - Dues Management';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Dues Management</h1>
                    <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDueBtn">
                        <i class="fas fa-plus fa-sm text-white-50"></i> Record Payment
                    </button>
                </div>
                
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Filter by Month</label>
                            <select class="form-control" id="monthFilter">
                                <option value="">All Months</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Filter by Year</label>
                            <select class="form-control" id="yearFilter">
                                <option value="">All Years</option>
                                ${generateYearOptions()}
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Filter by Member</label>
                            <input type="text" class="form-control" id="memberFilter" placeholder="Search member...">
                        </div>
                    </div>
                </div>
                
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 class="m-0 font-weight-bold text-primary">Dues Records</h6>
                        <button class="btn btn-sm btn-outline-primary" id="exportDuesBtn">
                            <i class="fas fa-file-export"></i> Export
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="duesTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Member</th>
                                        <th>Amount</th>
                                        <th>Date Paid</th>
                                        <th>Month</th>
                                        <th>Year</th>
                                        <th>Payment Method</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="duesTableBody">
                                    <tr>
                                        <td colspan="8" class="text-center">
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

        // Load dues data
        fetchDues();

        // Add event listeners
        document.getElementById('addDueBtn')?.addEventListener('click', showAddDueModal);
        document.getElementById('monthFilter')?.addEventListener('change', filterDues);
        document.getElementById('yearFilter')?.addEventListener('change', filterDues);
        document.getElementById('memberFilter')?.addEventListener('input', filterDues);
        document.getElementById('exportDuesBtn')?.addEventListener('click', exportDues);
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
    // PARISHES CONTENT
    // ======================
    function loadParishes() {
        document.title = 'HolyBridge - Parish Management';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Parish Management</h1>
                    <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addParishBtn">
                        <i class="fas fa-plus fa-sm text-white-50"></i> Add Parish
                    </button>
                </div>
                
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Add New Parish</h6>
                            </div>
                            <div class="card-body">
                                <form id="parishForm">
                                    <div class="form-group">
                                        <label>Parish Name</label>
                                        <input type="text" class="form-control" id="parishName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Diocese</label>
                                        <select class="form-control" id="parishDiocese" required>
                                            <option value="">Select Diocese</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Location</label>
                                        <input type="text" class="form-control" id="parishLocation">
                                    </div>
                                    <div class="form-group">
                                        <label>Priest</label>
                                        <input type="text" class="form-control" id="parishPriest">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Parish</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">All Parishes</h6>
                                <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search parishes..." id="parishSearch">
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="parishesTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Diocese</th>
                                                <th>Location</th>
                                                <th>Priest</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="parishesTableBody">
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
                </div>
            </div>
        `;

        // Load parishes data
        fetchParishes();

        // Add event listeners
        document.getElementById('parishForm')?.addEventListener('submit', saveParish);
        document.getElementById('parishSearch')?.addEventListener('input', searchParishes);
    }

    // ======================
    // DONATIONS CONTENT
    // ======================
    function loadDonations() {
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
    }

    // ======================
    // REPORTS CONTENT
    // ======================
    function loadReports() {
        document.title = 'HolyBridge - Reports';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Reports</h1>
                </div>
                <!-- Reports content here -->
            </div>
        `;
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

    function fetchUsers() {
        setTimeout(() => {
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No users found
                    </td>
                </tr>
            `;
        }, 1000);
    }

    function fetchMembers() {
        setTimeout(() => {
            const tbody = document.getElementById('membersTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted">
                        No members found
                    </td>
                </tr>
            `;
        }, 1000);
    }

    function fetchDues() {
        setTimeout(() => {
            const tbody = document.getElementById('duesTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted">
                        No dues records found
                    </td>
                </tr>
            `;
        }, 1000);
    }

    function fetchDonations() {
        setTimeout(() => {
            const tbody = document.getElementById('donationsTableBody');
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        No donations found
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

    function fetchParishes() {
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
    }

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
    function showAddUserModal() {
        // Implement your add user modal logic here
        alert('Add user functionality would go here');
    }

    function editUser(userId) {
        // Implement your edit user logic here
        alert(`Edit user ${userId} functionality would go here`);
    }

    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            // Implement your delete user logic here
            alert(`Delete user ${userId} functionality would go here`);
            fetchUsers(); // Refresh the list
        }
    }

    function searchUsers() {
        const searchTerm = document.getElementById('userSearch').value.toLowerCase();
        alert(`Search users for: ${searchTerm}`);
        // Implement your user search logic here
    }

    function showAddMemberModal() {
        const modal = new bootstrap.Modal(document.getElementById('memberModal'));
        modal.show();
    }

    function saveMember() {
        // In a real app, this would save to your backend
        alert('Member saved successfully!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('memberModal'));
        modal.hide();
        fetchMembers(); // Refresh the list
    }

    function editMember(memberId) {
        // In a real app, this would load member data into the form
        document.getElementById('memberModalTitle').textContent = 'Edit Member';
        const modal = new bootstrap.Modal(document.getElementById('memberModal'));
        modal.show();
    }

    function deleteMember(memberId) {
        if (confirm('Are you sure you want to delete this member?')) {
            // In a real app, this would delete from your backend
            alert(`Member ${memberId} deleted successfully!`);
            fetchMembers(); // Refresh the list
        }
    }

    function searchMembers() {
        const searchTerm = document.getElementById('memberSearch').value.toLowerCase();
        alert(`Search members for: ${searchTerm}`);
        // Implement your search logic here
    }

    function showAddDonationModal() {
        // Implement your add donation modal logic here
        alert('Add donation functionality would go here');
    }

    function editDonation(donationId) {
        // Implement your edit donation logic here
        alert(`Edit donation ${donationId} functionality would go here`);
    }

    function deleteDonation(donationId) {
        if (confirm('Are you sure you want to delete this donation?')) {
            // Implement your delete donation logic here
            alert(`Delete donation ${donationId} functionality would go here`);
            fetchDonations(); // Refresh the list
        }
    }

    function searchDonations() {
        const searchTerm = document.getElementById('donationSearch').value.toLowerCase();
        alert(`Search donations for: ${searchTerm}`);
        // Implement your donation search logic here
    }

    function showAddDueModal() {
        alert('Add due functionality would go here');
    }

    function filterDues() {
        const month = document.getElementById('monthFilter').value;
        const year = document.getElementById('yearFilter').value;
        const member = document.getElementById('memberFilter').value.toLowerCase();
        alert(`Filter dues by: Month=${month}, Year=${year}, Member=${member}`);
        // Implement your filter logic here
    }

    function exportDues() {
        alert('Exporting dues data...');
        // Implement your export logic here
    }

    function editDue(dueId) {
        alert(`Edit due ${dueId} functionality would go here`);
    }

    function deleteDue(dueId) {
        if (confirm('Are you sure you want to delete this due record?')) {
            alert(`Due record ${dueId} deleted successfully!`);
            fetchDues(); // Refresh the list
        }
    }

    function saveCategory(e) {
        e.preventDefault();
        // In a real app, this would save to your backend
        alert('Category saved successfully!');
        fetchCategories(); // Refresh the list
    }

    function searchCategories() {
        const searchTerm = document.getElementById('categorySearch').value.toLowerCase();
        alert(`Search categories for: ${searchTerm}`);
        // Implement your search logic here
    }

    function editCategory(categoryId) {
        alert(`Edit category ${categoryId} functionality would go here`);
    }

    function saveParish(e) {
        e.preventDefault();
        // In a real app, this would save to your backend
        alert('Parish saved successfully!');
        fetchParishes(); // Refresh the list
    }

    function searchParishes() {
        const searchTerm = document.getElementById('parishSearch').value.toLowerCase();
        alert(`Search parishes for: ${searchTerm}`);
        // Implement your search logic here
    }

    function editParish(parishId) {
        alert(`Edit parish ${parishId} functionality would go here`);
    }

    function deleteParish(parishId) {
        if (confirm('Are you sure you want to delete this parish?')) {
            alert(`Parish ${parishId} deleted successfully!`);
            fetchParishes(); // Refresh the list
        }
    }
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




