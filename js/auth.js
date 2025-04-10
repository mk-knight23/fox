// Simple client-side authentication and user management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedIn);

    // Protect member-only pages
    const protectedPages = ['dashboard.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
    }

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate authentication
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('lastLogin', new Date().toISOString());
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Handle signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Simulate account creation
            if (fullName && email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', fullName);
                localStorage.setItem('memberSince', new Date().toISOString());
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Handle logout
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logoutBtn') {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        }
    });

    // Handle profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        // Load existing profile data
        document.getElementById('firstName').value = localStorage.getItem('firstName') || '';
        document.getElementById('lastName').value = localStorage.getItem('lastName') || '';
        document.getElementById('email').value = localStorage.getItem('userEmail') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';

        // Update profile display
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        if (profileName) profileName.textContent = localStorage.getItem('userName') || 'User';
        if (profileEmail) profileEmail.textContent = localStorage.getItem('userEmail') || 'user@example.com';

        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Save profile changes
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('phone', phone);
            localStorage.setItem('userName', `${firstName} ${lastName}`);

            alert('Profile updated successfully!');
            updateAuthUI(true);
        });
    }

    // Handle password change
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            if (newPassword !== confirmNewPassword) {
                alert('New passwords do not match!');
                return;
            }

            // Simulate password change
            alert('Password updated successfully!');
            passwordForm.reset();
        });
    }

    // Handle preferences form
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        // Load existing preferences
        document.getElementById('emailNotifications').checked = localStorage.getItem('emailNotifications') === 'true';
        document.getElementById('smsNotifications').checked = localStorage.getItem('smsNotifications') === 'true';
        document.getElementById('marketingEmails').checked = localStorage.getItem('marketingEmails') === 'true';

        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailNotifications = document.getElementById('emailNotifications').checked;
            const smsNotifications = document.getElementById('smsNotifications').checked;
            const marketingEmails = document.getElementById('marketingEmails').checked;

            // Save preferences
            localStorage.setItem('emailNotifications', emailNotifications);
            localStorage.setItem('smsNotifications', smsNotifications);
            localStorage.setItem('marketingEmails', marketingEmails);

            alert('Preferences saved successfully!');
        });
    }
});

// Update UI based on authentication state
function updateAuthUI(isLoggedIn) {
    const authLinks = document.querySelectorAll('.auth-links');
    authLinks.forEach(container => {
        if (isLoggedIn) {
            const userEmail = localStorage.getItem('userEmail');
            container.innerHTML = `
                <li class="nav-item dropdown user-menu">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${userEmail}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="dashboard.html">Dashboard</a>
                        <a class="dropdown-item" href="profile.html">Profile</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" id="logoutBtn">Logout</a>
                    </div>
                </li>
            `;
        } else {
            container.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="signup.html">Sign Up</a>
                </li>
            `;
        }
    });
}