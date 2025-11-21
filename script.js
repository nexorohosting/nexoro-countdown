// Set the date we're counting down to
// Month is 0-indexed in JS, but string parsing is easier.
// Setting for Dec 31, 2025 at 23:59:59
const launchDate = new Date("December 31, 2025 23:59:59").getTime();

// Update the count down every 1 second
const countdownTimer = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the launch date
    const distance = launchDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in the elements
    // We use strict formatting to ensure '05' instead of '5' for aesthetics
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector(".countdown").innerHTML = "<h1>WE ARE LIVE!</h1>";
        document.querySelector(".info-text").innerText = "Log in to your dashboard now.";
    }
}, 1000);
// --- WAITLIST FORM HANDLING ---

const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');

// CONFIGURATION: PASTE YOUR GOOGLE FORM DATA HERE
// 1. The URL ending in /formResponse (replace /viewform with /formResponse if needed)
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfdbUvkuT2M0mweylTxjPYrVcCyYns0NnyatLDFha6ooRvIRw/viewform?usp=pp_url&entry.1423420749=testuser&entry.2029535889=test@email.com'; 

// 2. The Entry IDs you found in Phase 2
const ENTRY_ID_USERNAME = 'entry.123456789'; // Replace with your actual number
const ENTRY_ID_EMAIL    = 'entry.987654321'; // Replace with your actual number

if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload

        const user = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const submitBtn = waitlistForm.querySelector('button');

        // Visual: Change button to "Sending..."
        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';

        // Create the data object for Google Forms
        const formData = new FormData();
        formData.append(ENTRY_ID_USERNAME, user);
        formData.append(ENTRY_ID_EMAIL, email);

        // Send data using fetch
        // Note: mode: 'no-cors' is required for Google Forms. 
        // It means we won't get a "200 OK" message back, but the data WILL send.
        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: formData
        }).then(() => {
            // Success Action
            console.log("Data sent to Google Sheet!");
            
            waitlistForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Hide promotional text for a cleaner look
            document.querySelector('.promo-banner').style.display = 'none';
            document.querySelector('.subtext').style.display = 'none';

        }).catch((error) => {
            console.error('Error!', error.message);
            submitBtn.innerText = 'Error. Try again.';
        });
    });
}
