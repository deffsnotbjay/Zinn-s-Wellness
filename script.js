document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("sticky", window.scrollY > 80);
});
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mobileMenu");
  navbar.classList.toggle("sticky", window.scrollY > 80);
});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuToggle = document.getElementById('menuToggle');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // --- Dynamic Positioning ---
  function setMenuPosition() {
      const navbarHeight = navbar.offsetHeight; 
      
      // Set the navbar height as a CSS variable on the overlay.
      // This variable is used by the CSS transform property to define the active state's final position.
      mobileMenu.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }

  setMenuPosition();
  window.addEventListener('resize', setMenuPosition);

  // --- Toggle Logic ---
  function toggleMenu() {
      const isMenuOpen = mobileMenu.classList.contains('active');

      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      menuToggle.setAttribute('aria-expanded', !isMenuOpen);
      
      // Only lock body scrolling if the menu is NOT content-height scrolling (optional)
      // document.body.style.overflow = isMenuOpen ? '' : 'hidden'; 
  }

  // Event listener for the menu button
  if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
  }
  
  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (mobileMenu.classList.contains('active')) {
              toggleMenu();
          }
      });
  });
  
  // Close menu if screen size changes while open (returning to desktop)
  window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
          toggleMenu(); 
      }
  });
});

document.querySelectorAll('.accordion-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
  });
});

const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
let autoPlayInterval;
const autoPlayDelay = 3500; // Time in milliseconds (3.5 seconds)

// Function to calculate width of one item + gap
function getItemWidth() {
    const item = document.querySelector('.testimonial-card');
    // 30 is the gap defined in CSS
    return item.offsetWidth + 30; 
}

// Logic to move automatically
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const itemWidth = getItemWidth();
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        // If we are at the end, scroll back to start
        if (track.scrollLeft >= maxScroll - 10) { // -10 tolerance
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Otherwise scroll to next
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    }, autoPlayDelay);
}

// Stop auto play (used on hover/touch)
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// --- Event Listeners ---

// 1. Mouse/Touch Interaction: Pause when user interacts
track.addEventListener('mouseenter', stopAutoPlay);
track.addEventListener('mouseleave', startAutoPlay);
track.addEventListener('touchstart', stopAutoPlay);
track.addEventListener('touchend', startAutoPlay);

// 2. Click on Dot
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoPlay(); // Stop auto while user clicks
        
        // Update active dot visual
        document.querySelector('.dot.active').classList.remove('active');
        dot.classList.add('active');

        // Scroll to position
        const scrollAmount = index * getItemWidth();
        track.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Restart auto play after a short delay
        setTimeout(startAutoPlay, 2000); 
    });
});

// 3. Update Dots on Scroll (Auto or Manual)
track.addEventListener('scroll', () => {
    const scrollPosition = track.scrollLeft;
    const itemWidth = getItemWidth();
    const index = Math.round(scrollPosition / itemWidth);

    if (dots[index]) {
        const currentActive = document.querySelector('.dot.active');
        if(currentActive) currentActive.classList.remove('active');
        dots[index].classList.add('active');
    }
});

// Initialize Auto Play on Load
startAutoPlay();


const videoTrigger = document.getElementById('videoTrigger');
const videoModal = document.getElementById('videoModal');
const modalClose = document.getElementById('modalClose');
const modalVideo = document.querySelector('.modal-video'); // ← select video element

videoTrigger.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalVideo.play(); // autoplay when opened (optional)
});

function closeModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    modalVideo.pause();           // stop video
    modalVideo.currentTime = 0;   // reset to start
}

modalClose.addEventListener('click', closeModal);

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeModal();
    }
});



lucide.createIcons();