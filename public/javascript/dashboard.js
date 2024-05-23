const li_elements = document.querySelectorAll('.dash-sidebar ul li')
const item_elements = document.querySelectorAll('.item')

for(let i = 0; i < li_elements.length; i++) {
    li_elements[i].addEventListener('click', function() {
        li_elements.forEach(function(li) {
            li.classList.remove('active')
        })
        this.classList.add('active')
        var li_value = this.getAttribute('data-li')

        item_elements.forEach(function(item) {
            item.style.display = 'none' 
        })
                
        if(li_value == 'dashboard') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'profile') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'statistics') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'career') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'faq') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'testimonials') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else if(li_value == 'settings') {
                document.querySelector(`.${li_value}`).style.display = 'block'
            } else {
                console.log('')
            }
    })
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