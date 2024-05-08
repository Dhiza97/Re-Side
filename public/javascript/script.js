const signupForm = document.getElementById('signupForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMatchError = document.getElementById('passwordMatchError');

function validatePassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordMatchError.style.display = 'block';
        return false;
    } else {
        passwordMatchError.style.display = 'none';
        return true;
    }
}

signupForm.addEventListener('submit', function(event) {
    if (!validatePassword()) {
        event.preventDefault(); // Prevent form submission if passwords do not match
    }
});

// Optional: Add event listeners to validate password on input change
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validatePassword);

// Focus on the role input field when the page loads
window.onload = function() {
    document.getElementById('role').focus();
}