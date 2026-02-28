// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// 1. Countdown Timer Logic
const weddingDate = new Date("June 14, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap <= 0) {
        document.getElementById("countdown").innerText = "The Celebration has Begun!";
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById("countdown").innerText = 
        `${d}d : ${h}h : ${m}m : ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 2. FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other open items (Optional)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });

        faqItem.classList.toggle('active');
    });
});

// 3. Floating Sparkles (Pixie Dust)
const sparkleContainer = document.getElementById('sparkles-container');

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random Position and Animation
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = '100vh';
    sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    sparkle.style.opacity = Math.random();
    
    sparkleContainer.appendChild(sparkle);

    // Remove sparkle after animation ends to save memory
    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}
setInterval(createSparkle, 200);

let player;
let isPlayerReady = false;
let isPlaying = false;

// 1. YouTube API Initialization (Bulletproof Version)
window.onYouTubeIframeAPIReady = function() {
    console.log("YouTube API script loaded..."); // Test Log 1
    player = new YT.Player('legal-player', {
        height: '200', // Make it visible for testing
        width: '300',  // Make it visible for testing
        videoId: 'm77mI_U-r64', 
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'm77mI_U-r64', 
            'controls': 1, // Show controls so we can click play manually to test
            'rel': 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError // Add this to see if YouTube is blocking you
        }
    });
};

function onPlayerReady(event) {
    isPlayerReady = true;
    console.log("Music Engine Ready");
}

function onPlayerError(event) {
    console.log("YouTube Error Code: " + event.data);
    // Error 101 or 150 means the song owner blocks API playback
}
// 2. Entrance Logic & Music Start
const entranceOverlay = document.getElementById('entrance-overlay');
const enterBtn = document.getElementById('enter-btn');
const musicIcon = document.getElementById("music-icon");

enterBtn.addEventListener('click', () => {
    // Hide overlay
    entranceOverlay.classList.add('hidden');
    
    // Play YouTube Music immediately
    if (player && typeof player.playVideo === 'function') {
        player.unMute(); // Some browsers require unMute to start audio
        player.setVolume(70);
        player.playVideo();
        isPlaying = true;
        musicIcon.innerText = "🎵";
    } else {
        // Fail-safe: if the player isn't ready yet, try again in 1 second
        setTimeout(() => {
            if (player) {
                player.unMute();
                player.playVideo();
                isPlaying = true;
                musicIcon.innerText = "🎵";
            }
        }, 1000);
    }
    
    AOS.refresh();
});

// 3. Manual Music Toggle
function toggleMusic() {
    if (!player) return;

    if (isPlaying) {
        player.pauseVideo();
        musicIcon.innerText = "🔇";
    } else {
        player.playVideo();
        musicIcon.innerText = "🎵";
    }
    isPlaying = !isPlaying;
}


/* ... keep the rest of your previous code (Countdown, Sparkles, FAQ) below ... */
// 5. RSVP Form Submission
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // In a real app, you would use Fetch API to send data to a spreadsheet or email
    alert("✨ Your royal response has been delivered to the Palace! ✨");
    this.reset();
});



const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    // Shows button after scrolling down 400px
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Show More Gallery Logic
const showMoreBtn = document.getElementById('show-more-btn');
const extraPhotos = document.getElementById('extra-photos');

showMoreBtn.addEventListener('click', () => {
    // Toggle the "show" class
    extraPhotos.classList.toggle('show');

    // Change button text
    if (extraPhotos.classList.contains('show')) {
        showMoreBtn.innerText = "Show Less";
        
        // Refresh AOS so animations trigger for new images
        setTimeout(() => {
            AOS.refresh();
        }, 100); 
    } else {
        showMoreBtn.innerText = "Show More Magic";
        
        // Scroll back up to the gallery top when closing (Optional)
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
});