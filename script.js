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
// --- WAITLIST VISUALS ONLY ---
// The data sending is now handled by the HTML <form> tag directly.

var submitted = false;

const waitlistForm = document.getElementById('waitlistForm');
const successMessage = document.getElementById('successMessage');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', function() {
        // When the user clicks submit, we wait a tiny bit for the data to leave
        // then we switch the visuals.
        submitted = true;
        
        setTimeout(function() {
            // 1. Hide the form
            waitlistForm.style.display = 'none';
            
            // 2. Show success message
            successMessage.classList.remove('hidden');

            // 3. Hide promo text
            const promo = document.querySelector('.promo-banner');
            const sub = document.querySelector('.subtext');
            if(promo) promo.style.display = 'none';
            if(sub) sub.style.display = 'none';
            
        }, 500); // 0.5 second delay to ensure smoother transition
    });
}
