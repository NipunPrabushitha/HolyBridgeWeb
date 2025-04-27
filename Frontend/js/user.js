// user.js - Enhanced with modal reservation form
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status first
    if (!checkAuthStatus()) {
        return;
    }

    // Initialize user dashboard
    initUserDashboard();

    // Load cafe content
    loadCafeContent();
});

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
        // Redirect to login if not authenticated or not a user
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function initUserDashboard() {
    // Display user information
    const userName = localStorage.getItem('name') || 'User';
    const userEmail = localStorage.getItem('email') || '';

    // Update UI elements if they exist
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');

    userNameElements.forEach(el => el.textContent = userName);
    userEmailElements.forEach(el => el.textContent = userEmail);

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
}

function logoutUser() {
    // Show confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of the system.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear user data
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');

            // Redirect to login page
            window.location.href = 'login.html';
        }
    });
}

function loadCafeContent() {
    initCafeScripts();
}

function initCafeScripts() {
    // Handle reservation button click
    const reserveBtn = document.querySelector('.custom-btn.custom-border-btn');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDonationModal()
        });
    }

    // Example: Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());

            Swal.fire(
                'Message Sent!',
                'Thank you for your message. We will get back to you soon.',
                'success'
            );

            contactForm.reset();
        });
    }
}

function showDonationModal() {
    // Create the donation modal HTML with updated colors
    const donationModalHTML = `
        <div class="modal fade" id="donationModal" tabindex="-1" aria-labelledby="donationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #5a3921; color: white;"> <!-- Dark brown header -->
                        <h5 class="modal-title" id="donationModalLabel">Make a Donation</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="donation-form-wrap">
                            <div class="row">
                                <div class="col-lg-7 col-12 p-0">
                                    <form class="custom-form donation-form" id="modalDonationForm" method="post" role="form">
                                        <div class="text-center mb-4 pb-lg-2">
                                            <em class="text-muted">Support our ministry with your generous gift</em>
                                            <h2 style="color: #5a3921;">Donate Online</h2> <!-- Dark brown heading -->
                                        </div>

                                        <div class="donation-form-body">
                                            <div class="row">
                                                <!-- Form fields remain the same -->
                                                <div class="col-lg-6 col-12">
                                                    <input type="text" name="donation-name" id="donation-name" class="form-control" placeholder="Full Name" required>
                                                </div>

                                                <div class="col-lg-6 col-12">
                                                    <input type="email" name="donation-email" id="donation-email" class="form-control" placeholder="Email Address" required>
                                                </div>

                                                <div class="col-12">
                                                    <select name="donation-purpose" id="donation-purpose" class="form-select" required>
                                                        <option value="" disabled selected>Select Donation Purpose</option>
                                                        <option value="tithe">Tithe</option>
                                                        <option value="offering">Offering</option>
                                                        <option value="building-fund">Building Fund</option>
                                                        <option value="missions">Missions</option>
                                                        <option value="benevolence">Benevolence Fund</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                <div class="col-12">
                                                    <div class="input-group">
                                                        <span class="input-group-text" style="background-color: #5a3921; color: white;">$</span> <!-- Dark brown input group -->
                                                        <input type="number" name="donation-amount" id="donation-amount" class="form-control" placeholder="Amount" min="1" step="0.01" required>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <textarea name="donation-message" rows="2" class="form-control" id="donation-message" placeholder="Special instructions or prayer requests (Optional)"></textarea>
                                                </div>

                                                <!-- Payment Method Selection -->
                                                <div class="col-12 mt-3">
                                                    <h5 class="mb-3" style="color: #5a3921;">Payment Method</h5> <!-- Dark brown heading -->
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="payment-method" id="credit-card" value="credit-card" checked>
                                                        <label class="form-check-label" for="credit-card">
                                                            Credit/Debit Card
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="payment-method" id="bank-transfer" value="bank-transfer">
                                                        <label class="form-check-label" for="bank-transfer">
                                                            Bank Transfer
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="payment-method" id="mobile-payment" value="mobile-payment">
                                                        <label class="form-check-label" for="mobile-payment">
                                                            Mobile Payment
                                                        </label>
                                                    </div>
                                                </div>

                                                <!-- Credit Card Fields (shown by default) -->
                                                <div id="credit-card-fields" class="col-12 mt-3">
                                                    <div class="card p-3" style="background-color: #f8f1e8;"> <!-- Light beige background -->
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <input type="text" name="card-number" id="card-number" class="form-control mb-2" placeholder="Card Number" data-payment="credit-card">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="card-expiry" id="card-expiry" class="form-control mb-2" placeholder="MM/YY" data-payment="credit-card">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="card-cvc" id="card-cvc" class="form-control mb-2" placeholder="CVC" data-payment="credit-card">
                                                            </div>
                                                            <div class="col-12">
                                                                <input type="text" name="card-name" id="card-name" class="form-control" placeholder="Name on Card" data-payment="credit-card">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Bank Transfer Fields (hidden by default) -->
                                                <div id="bank-transfer-fields" class="col-12 mt-3" style="display:none;">
                                                    <div class="card p-3" style="background-color: #f8f1e8;"> <!-- Light beige background -->
                                                        <p>Please use the following bank details for your transfer:</p>
                                                        <p><strong>Bank Name:</strong> Faith Community Bank</p>
                                                        <p><strong>Account Name:</strong> Grace Church Ministries</p>
                                                        <p><strong>Account Number:</strong> 1234567890</p>
                                                        <p><strong>Routing Number:</strong> 987654321</p>
                                                        <p>Please include your name as reference.</p>
                                                    </div>
                                                </div>

                                                <!-- Mobile Payment Fields (hidden by default) -->
                                                <div id="mobile-payment-fields" class="col-12 mt-3" style="display:none;">
                                                    <div class="card p-3" style="background-color: #f8f1e8;"> <!-- Light beige background -->
                                                        <p>Scan the QR code below with your mobile payment app:</p>
                                                        <div class="text-center mb-3">
                                                            <img src="images/qr-code-placeholder.png" class="img-fluid" style="max-width: 200px;" alt="Payment QR Code">
                                                        </div>
                                                        <p>Or send to mobile number: <strong>+1 (555) 123-4567</strong></p>
                                                    </div>
                                                </div>

                                                <div class="col-12 form-check mt-3">
                                                    <input type="checkbox" class="form-check-input" id="recurring-donation" name="recurring-donation">
                                                    <label class="form-check-label" for="recurring-donation">Make this a recurring monthly donation</label>
                                                </div>

                                                <div class="col-lg-6 col-md-10 col-8 mx-auto mt-4">
                                                    <button type="submit" class="btn btn-lg w-100" style="background-color: #8b4513; color: white;">Donate Now</button> <!-- Saddle brown button -->
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-lg-5 col-12 p-0 d-none d-lg-block">
                                    <div class="donation-form-image-wrap h-100 p-4 d-flex flex-column justify-content-center" style="background-color: #5a3921; color: white;"> <!-- Dark brown background -->
                                        <h3 class="mb-4">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</h3>
                                        <p class="mb-0">- 2 Corinthians 9:7</p>
                                        <div class="mt-auto pt-4">
                                            <div class="d-flex align-items-center mb-3">
                                                <i class="fas fa-shield-alt fs-3 me-3"></i> <!-- Font Awesome icon -->
                                                <span>Secure 256-bit SSL encryption</span>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <i class="far fa-credit-card fs-3 me-3"></i> <!-- Font Awesome icon -->
                                                <span>All major cards accepted</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add the modal to the body
    document.body.insertAdjacentHTML('beforeend', donationModalHTML);

    // Initialize the modal
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    donationModal.show();

    // Handle payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment fields
            document.getElementById('credit-card-fields').style.display = 'none';
            document.getElementById('bank-transfer-fields').style.display = 'none';
            document.getElementById('mobile-payment-fields').style.display = 'none';

            // Show selected payment fields
            if (this.value === 'credit-card') {
                document.getElementById('credit-card-fields').style.display = 'block';
            } else if (this.value === 'bank-transfer') {
                document.getElementById('bank-transfer-fields').style.display = 'block';
            } else if (this.value === 'mobile-payment') {
                document.getElementById('mobile-payment-fields').style.display = 'block';
            }
        });
    });

    // Handle form submission
    const donationForm = document.getElementById('modalDonationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(donationForm);
            const formValues = Object.fromEntries(formData.entries());

            // Here you would typically send the data to your payment processor
            // For now, we'll just show a success message
            Swal.fire({
                title: 'Donation Received!',
                html: `Thank you for your generous donation of $${formValues['donation-amount']} to ${formValues['donation-purpose']}.<br><br>
                      A receipt has been sent to ${formValues['donation-email']}.`,
                icon: 'success',
                confirmButtonText: 'God Bless You',
                confirmButtonColor: '#8b4513' // Saddle brown confirm button
            });

            // Hide the modal
            donationModal.hide();

            // Remove the modal from DOM after it's hidden
            donationModal._element.addEventListener('hidden.bs.modal', function() {
                document.getElementById('donationModal').remove();
            });
        });
    }

    // Clean up when modal is closed
    document.getElementById('donationModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Function to make authenticated API requests
async function makeAuthenticatedRequest(url, method = 'GET', body = null) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}