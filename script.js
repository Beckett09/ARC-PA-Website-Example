// Return link shared by every PA program example page
const introReturnLink = document.createElement('a');
introReturnLink.className = 'intro-return-link';
introReturnLink.href = 'index.html';
introReturnLink.setAttribute('aria-label', 'Return to the Accreditio introduction page');
introReturnLink.innerHTML = '<span aria-hidden="true">←</span> Back to Accreditio';
document.body.appendChild(introReturnLink);

// 1. Tab Switching Logic
function openTab(evt, tabName) {
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 2. Mobile Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !navMenu.classList.contains('show'));
            icon.classList.toggle('fa-times', navMenu.classList.contains('show'));
        }
    });
}

// Mobile Dropdown Click Logic (Since hover doesn't work well on touch)
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    trigger?.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// 3. FAQ Accordion Logic
const accordions = document.querySelectorAll(".accordion-btn");

accordions.forEach(acc => {
    acc.addEventListener("click", function() {
        // Toggle active class to change background/icon
        this.classList.toggle("active");
        
        // Rotate the chevron icon
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.style.transform = "rotate(180deg)";
        } else {
            icon.style.transform = "rotate(0deg)";
        }

        // Toggle the content panel
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// 4. Contact Form Submission
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        btn.style.backgroundColor = "#ccc";
        
        setTimeout(() => {
            alert('Thank you for reaching out! Your inquiry has been routed to our admissions team.');
            this.reset();
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 1000);
    });
}

// Automatically open a tab if a hash is present in the URL on page load
window.addEventListener('DOMContentLoaded', () => {
    // Check if there is a hash in the URL (e.g., #admissions)
    const urlHash = window.location.hash;
    
    if (urlHash) {
        // Remove the '#' to get just the string (e.g., 'admissions')
        const tabId = urlHash.substring(1);
        
        // Find the tab button that has the onclick attribute matching our tabId
        const targetButton = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
            return btn.getAttribute('onclick').includes(`'${tabId}'`);
        });
        
        // If the button exists, simulate a click on it
        if (targetButton) {
            targetButton.click();
            
            // Optional: Smoothly scroll down to the tab container so the user sees it immediately
            document.querySelector('.tab-container')?.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
