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
    // USERS CONTENT (from your old file)
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
                                <h6 class="m-0 font-weight-bold text-primary">Add New Category</h6>
                            </div>
                            <div class="card-body">
                                <form id="categoryForm">
                                    <div class="form-group">
                                        <label>Category Name</label>
                                        <input type="text" class="form-control" id="categoryName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea class="form-control" id="categoryDescription" rows="3"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">All Categories</h6>
                                <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search categories..." id="categorySearch">
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="categoriesTable" width="100%" cellspacing="0">
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

        // Load categories data
        fetchCategories();

        // Add event listeners
        document.getElementById('categoryForm')?.addEventListener('submit', saveCategory);
        document.getElementById('categorySearch')?.addEventListener('input', searchCategories);
    }

    // ======================
    // DIOCESES CONTENT
    // ======================
    function loadDioceses() {
        document.title = 'HolyBridge - Diocese Management';
        mainContent.innerHTML = `
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Diocese Management</h1>
                    <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="addDioceseBtn">
                        <i class="fas fa-plus fa-sm text-white-50"></i> Add Diocese
                    </button>
                </div>
                
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Add New Diocese</h6>
                            </div>
                            <div class="card-body">
                                <form id="dioceseForm">
                                    <div class="form-group">
                                        <label>Diocese Name</label>
                                        <input type="text" class="form-control" id="dioceseName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Location</label>
                                        <input type="text" class="form-control" id="dioceseLocation">
                                    </div>
                                    <div class="form-group">
                                        <label>Bishop</label>
                                        <input type="text" class="form-control" id="dioceseBishop">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Diocese</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">All Dioceses</h6>
                                <input type="text" class="form-control form-control-sm" style="width: 200px;" placeholder="Search dioceses..." id="dioceseSearch">
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="diocesesTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Bishop</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="diocesesTableBody">
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
                </div>
            </div>
        `;

        // Load dioceses data
        fetchDioceses();

        // Add event listeners
        document.getElementById('dioceseForm')?.addEventListener('submit', saveDiocese);
        document.getElementById('dioceseSearch')?.addEventListener('input', searchDioceses);
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
    // DONATIONS CONTENT (from your old file)
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
            // Mock data
            document.getElementById('membersCount').textContent = '125';
            document.getElementById('duesAmount').textContent = '$1,250.00';
            document.getElementById('donationsAmount').textContent = '$3,450.00';
            document.getElementById('parishesCount').textContent = '8';

            // Recent activity
            const activities = [
                { date: '2023-06-15 10:30', text: 'John Doe paid monthly dues ($10.00)' },
                { date: '2023-06-14 15:45', text: 'New member registered: Jane Smith' },
                { date: '2023-06-14 09:20', text: 'Robert Johnson made a donation ($50.00)' },
                { date: '2023-06-13 14:10', text: 'Updated parish information for St. Mary' }
            ];

            const activityFeed = document.getElementById('recentActivity');
            activityFeed.innerHTML = '';

            activities.forEach(activity => {
                const item = document.createElement('div');
                item.className = 'feed-item';
                item.innerHTML = `
                    <div class="date">${activity.date}</div>
                    <div class="text">${activity.text}</div>
                `;
                activityFeed.appendChild(item);
            });
        }, 1000);
    }

    function fetchUsers() {
        // Mock data
        setTimeout(() => {
            const users = [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: '2023-01-15' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joined: '2023-02-20' },
                { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'User', joined: '2023-03-10' }
            ];

            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><span class="badge ${user.role === 'Admin' ? 'bg-primary' : 'bg-secondary'}">${user.role}</span></td>
                    <td>${new Date(user.joined).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-user" data-id="${user.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-user" data-id="${user.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners to action buttons
            document.querySelectorAll('.edit-user').forEach(btn => {
                btn.addEventListener('click', () => editUser(btn.dataset.id));
            });

            document.querySelectorAll('.delete-user').forEach(btn => {
                btn.addEventListener('click', () => deleteUser(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchMembers() {
        // Mock data
        setTimeout(() => {
            const members = [
                { id: 1, firstName: 'John', lastName: 'Doe', phone: '555-1234', email: 'john@example.com', category: 'Regular', parish: 'St. Mary', status: 'Active' },
                { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '555-5678', email: 'jane@example.com', category: 'Youth', parish: 'St. Peter', status: 'Active' },
                { id: 3, firstName: 'Robert', lastName: 'Johnson', phone: '555-9012', email: 'robert@example.com', category: 'Senior', parish: 'St. Paul', status: 'Inactive' }
            ];

            const tbody = document.getElementById('membersTableBody');
            tbody.innerHTML = '';

            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.id}</td>
                    <td>${member.firstName} ${member.lastName}</td>
                    <td>${member.phone}</td>
                    <td>${member.email}</td>
                    <td>${member.category}</td>
                    <td>${member.parish}</td>
                    <td><span class="badge ${member.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${member.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-member" data-id="${member.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-member" data-id="${member.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners
            document.querySelectorAll('.edit-member').forEach(btn => {
                btn.addEventListener('click', () => editMember(btn.dataset.id));
            });

            document.querySelectorAll('.delete-member').forEach(btn => {
                btn.addEventListener('click', () => deleteMember(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchDues() {
        // Mock data
        setTimeout(() => {
            const dues = [
                { id: 1, member: 'John Doe', amount: 10.00, datePaid: '2023-06-15', month: 6, year: 2023, method: 'Cash' },
                { id: 2, member: 'Jane Smith', amount: 10.00, datePaid: '2023-06-10', month: 6, year: 2023, method: 'Mobile Money' },
                { id: 3, member: 'Robert Johnson', amount: 10.00, datePaid: '2023-05-20', month: 5, year: 2023, method: 'Bank Transfer' }
            ];

            const tbody = document.getElementById('duesTableBody');
            tbody.innerHTML = '';

            dues.forEach(due => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${due.id}</td>
                    <td>${due.member}</td>
                    <td>$${due.amount.toFixed(2)}</td>
                    <td>${new Date(due.datePaid).toLocaleDateString()}</td>
                    <td>${getMonthName(due.month)}</td>
                    <td>${due.year}</td>
                    <td>${due.method}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-due" data-id="${due.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-due" data-id="${due.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners
            document.querySelectorAll('.edit-due').forEach(btn => {
                btn.addEventListener('click', () => editDue(btn.dataset.id));
            });

            document.querySelectorAll('.delete-due').forEach(btn => {
                btn.addEventListener('click', () => deleteDue(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchDonations() {
        // In a real app, this would be an API call
        setTimeout(() => {
            const donations = [
                { id: 1, donor: 'John Doe', amount: 100.50, date: '2023-06-15', note: 'Monthly tithe' },
                { id: 2, donor: 'Jane Smith', amount: 50.00, date: '2023-06-10', note: 'Building fund' },
                { id: 3, donor: 'Robert Johnson', amount: 200.00, date: '2023-05-20', note: 'Special offering' }
            ];

            const tbody = document.getElementById('donationsTableBody');
            tbody.innerHTML = '';

            // Update stats
            const totalCount = donations.length;
            const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
            const monthlyAmount = donations
                .filter(d => new Date(d.date).getMonth() === new Date().getMonth())
                .reduce((sum, d) => sum + d.amount, 0);
            const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

            document.getElementById('totalDonationsCount').textContent = totalCount;
            document.getElementById('totalDonationsAmount').textContent = `$${totalAmount.toFixed(2)}`;
            document.getElementById('monthlyDonationsAmount').textContent = `$${monthlyAmount.toFixed(2)}`;
            document.getElementById('averageDonationAmount').textContent = `$${averageAmount.toFixed(2)}`;

            // Populate table
            donations.forEach(donation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${donation.id}</td>
                    <td>${donation.donor}</td>
                    <td>$${donation.amount.toFixed(2)}</td>
                    <td>${new Date(donation.date).toLocaleDateString()}</td>
                    <td>${donation.note || '--'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-donation" data-id="${donation.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-donation" data-id="${donation.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners to action buttons
            document.querySelectorAll('.edit-donation').forEach(btn => {
                btn.addEventListener('click', () => editDonation(btn.dataset.id));
            });

            document.querySelectorAll('.delete-donation').forEach(btn => {
                btn.addEventListener('click', () => deleteDonation(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchCategories() {
        // Mock data
        setTimeout(() => {
            const categories = [
                { id: 1, name: 'Regular', description: 'Regular church members' },
                { id: 2, name: 'Youth', description: 'Youth group members' },
                { id: 3, name: 'Senior', description: 'Senior citizens group' }
            ];

            const tbody = document.getElementById('categoriesTableBody');
            tbody.innerHTML = '';

            categories.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-category" data-id="${category.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-category" data-id="${category.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners
            document.querySelectorAll('.edit-category').forEach(btn => {
                btn.addEventListener('click', () => editCategory(btn.dataset.id));
            });

            document.querySelectorAll('.delete-category').forEach(btn => {
                btn.addEventListener('click', () => deleteCategory(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchDioceses() {
        // Mock data
        setTimeout(() => {
            const dioceses = [
                { id: 1, name: 'Diocese of Accra', location: 'Accra', bishop: 'Most Rev. John Smith' },
                { id: 2, name: 'Diocese of Kumasi', location: 'Kumasi', bishop: 'Most Rev. Robert Johnson' }
            ];

            const tbody = document.getElementById('diocesesTableBody');
            tbody.innerHTML = '';

            dioceses.forEach(diocese => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${diocese.id}</td>
                    <td>${diocese.name}</td>
                    <td>${diocese.location}</td>
                    <td>${diocese.bishop}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-diocese" data-id="${diocese.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-diocese" data-id="${diocese.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners
            document.querySelectorAll('.edit-diocese').forEach(btn => {
                btn.addEventListener('click', () => editDiocese(btn.dataset.id));
            });

            document.querySelectorAll('.delete-diocese').forEach(btn => {
                btn.addEventListener('click', () => deleteDiocese(btn.dataset.id));
            });
        }, 1000);
    }

    function fetchParishes() {
        // Mock data
        setTimeout(() => {
            const parishes = [
                { id: 1, name: 'St. Mary', diocese: 'Diocese of Accra', location: 'Accra Central', priest: 'Fr. Michael Brown' },
                { id: 2, name: 'St. Peter', diocese: 'Diocese of Accra', location: 'East Legon', priest: 'Fr. David Wilson' },
                { id: 3, name: 'St. Paul', diocese: 'Diocese of Kumasi', location: 'Kumasi Central', priest: 'Fr. James Miller' }
            ];

            const tbody = document.getElementById('parishesTableBody');
            tbody.innerHTML = '';

            // Populate diocese dropdown
            const dioceseSelect = document.getElementById('parishDiocese');
            dioceseSelect.innerHTML = '<option value="">Select Diocese</option>';
            parishes.forEach(parish => {
                const option = document.createElement('option');
                option.value = parish.diocese;
                option.textContent = parish.diocese;
                // Avoid duplicates
                if (!Array.from(dioceseSelect.options).some(o => o.value === parish.diocese)) {
                    dioceseSelect.appendChild(option);
                }
            });

            // Populate table
            parishes.forEach(parish => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${parish.id}</td>
                    <td>${parish.name}</td>
                    <td>${parish.diocese}</td>
                    <td>${parish.location}</td>
                    <td>${parish.priest}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-parish" data-id="${parish.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-parish" data-id="${parish.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Add event listeners
            document.querySelectorAll('.edit-parish').forEach(btn => {
                btn.addEventListener('click', () => editParish(btn.dataset.id));
            });

            document.querySelectorAll('.delete-parish').forEach(btn => {
                btn.addEventListener('click', () => deleteParish(btn.dataset.id));
            });
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

    function deleteCategory(categoryId) {
        if (confirm('Are you sure you want to delete this category?')) {
            alert(`Category ${categoryId} deleted successfully!`);
            fetchCategories(); // Refresh the list
        }
    }

    function saveDiocese(e) {
        e.preventDefault();
        // In a real app, this would save to your backend
        alert('Diocese saved successfully!');
        fetchDioceses(); // Refresh the list
    }

    function searchDioceses() {
        const searchTerm = document.getElementById('dioceseSearch').value.toLowerCase();
        alert(`Search dioceses for: ${searchTerm}`);
        // Implement your search logic here
    }

    function editDiocese(dioceseId) {
        alert(`Edit diocese ${dioceseId} functionality would go here`);
    }

    function deleteDiocese(dioceseId) {
        if (confirm('Are you sure you want to delete this diocese?')) {
            alert(`Diocese ${dioceseId} deleted successfully!`);
            fetchDioceses(); // Refresh the list
        }
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