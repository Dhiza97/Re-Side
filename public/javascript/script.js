const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

// Select all elements with the class "number"
const numbers = document.querySelectorAll('.number');

// Loop through each number element
numbers.forEach((number, index) => {
    // Get the current number value
    let currentValue = parseInt(number.textContent);
    
    // Generate a random interval between 500ms and 2000ms
    const interval = Math.floor(Math.random() * (2000 - 500 + 1)) + 500

    // Set an interval to increment the number
    setInterval(() => {
        // Increment the number by a random value between 1 and 5
        const increment = Math.floor(Math.random() * 5) + 1
        currentValue += increment;

        // Update the number text content
        number.textContent = currentValue;
    }, interval);
});

// Get scroll back to top button:
let mybutton = document.getElementById("myBtn")

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Filter Properties
function filterProperties(filter) {
    // Check if the lowercase filter is "rent" or "sale"
    if (filter.toLowerCase() === "rent" || filter.toLowerCase() === "sale") {
        // Redirect to the view properties page with the lowercase filter query parameter
        window.location.href = `/viewproperties?filter=${filter.toLowerCase()}`;
    } else {
        // Redirect to the view properties page with the specified filter query parameter
        window.location.href = `/viewproperties?filter=${filter}`;
    }
}

// Sign In & Sign Up Success message
document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        setTimeout(() => {
            successMessage.style.transition = 'opacity 1s';
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 1000);
        }, 3000); // Adjust the time as needed
    }
});

// Automatically close Sign In alert after 5 seconds
setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 600);
    }
}, 5000);

// Set up logout after inactivity
let timeout;

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 10 * 60 * 1000); // 10 minutes
}

function logout() {
    window.location.href = '/logout'; // Adjust the logout URL as needed
}

document.addEventListener('mousemove', resetTimeout);
document.addEventListener('keydown', resetTimeout);
document.addEventListener('scroll', resetTimeout);
document.addEventListener('click', resetTimeout);

resetTimeout(); // Initialize the timeout

// Hamburger menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// Faq section
const faqs = document.querySelectorAll('.faq-contents')

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active')
    })
})