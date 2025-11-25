// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Counter Animation for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// SLIDER FUNCTIONALITY FOR KARYA SECTION
const karyaSlider = document.getElementById('karyaSlider');
const karyaPrevBtn = document.getElementById('karyaPrev');
const karyaNextBtn = document.getElementById('karyaNext');

if (karyaSlider && karyaPrevBtn && karyaNextBtn) {
    let karyaScrollAmount = 0;

    karyaNextBtn.addEventListener('click', function() {
        const cardWidth = karyaSlider.querySelector('.karya-card').offsetWidth;
        const gap = 30; // gap between cards
        const scrollDistance = cardWidth + gap;
        
        karyaScrollAmount += scrollDistance;
        
        // Check if we've reached the end
        const maxScroll = karyaSlider.scrollWidth - karyaSlider.clientWidth;
        if (karyaScrollAmount > maxScroll) {
            karyaScrollAmount = 0; // Loop back to start
        }
        
        karyaSlider.scrollTo({
            left: karyaScrollAmount,
            behavior: 'smooth'
        });
    });

    karyaPrevBtn.addEventListener('click', function() {
        const cardWidth = karyaSlider.querySelector('.karya-card').offsetWidth;
        const gap = 30;
        const scrollDistance = cardWidth + gap;
        
        karyaScrollAmount -= scrollDistance;
        
        // Check if we've reached the beginning
        if (karyaScrollAmount < 0) {
            karyaScrollAmount = karyaSlider.scrollWidth - karyaSlider.clientWidth; // Loop to end
        }
        
        karyaSlider.scrollTo({
            left: karyaScrollAmount,
            behavior: 'smooth'
        });
    });

    // Update scroll amount when user manually scrolls
    karyaSlider.addEventListener('scroll', function() {
        karyaScrollAmount = karyaSlider.scrollLeft;
    });
}

// SLIDER FUNCTIONALITY FOR MAHASISWA SECTION
const mahasiswaSlider = document.getElementById('mahasiswaSlider');
const mahasiswaPrevBtn = document.getElementById('mahasiswaPrev');
const mahasiswaNextBtn = document.getElementById('mahasiswaNext');

if (mahasiswaSlider && mahasiswaPrevBtn && mahasiswaNextBtn) {
    let mahasiswaScrollAmount = 0;

    mahasiswaNextBtn.addEventListener('click', function() {
        const cardWidth = mahasiswaSlider.querySelector('.mahasiswa-card').offsetWidth;
        const gap = 30;
        const scrollDistance = cardWidth + gap;
        
        mahasiswaScrollAmount += scrollDistance;
        
        // Check if we've reached the end
        const maxScroll = mahasiswaSlider.scrollWidth - mahasiswaSlider.clientWidth;
        if (mahasiswaScrollAmount > maxScroll) {
            mahasiswaScrollAmount = 0; // Loop back to start
        }
        
        mahasiswaSlider.scrollTo({
            left: mahasiswaScrollAmount,
            behavior: 'smooth'
        });
    });

    mahasiswaPrevBtn.addEventListener('click', function() {
        const cardWidth = mahasiswaSlider.querySelector('.mahasiswa-card').offsetWidth;
        const gap = 30;
        const scrollDistance = cardWidth + gap;
        
        mahasiswaScrollAmount -= scrollDistance;
        
        // Check if we've reached the beginning
        if (mahasiswaScrollAmount < 0) {
            mahasiswaScrollAmount = mahasiswaSlider.scrollWidth - mahasiswaSlider.clientWidth; // Loop to end
        }
        
        mahasiswaSlider.scrollTo({
            left: mahasiswaScrollAmount,
            behavior: 'smooth'
        });
    });

    // Update scroll amount when user manually scrolls
    mahasiswaSlider.addEventListener('scroll', function() {
        mahasiswaScrollAmount = mahasiswaSlider.scrollLeft;
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation to sections when they come into view
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply fade-in to all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});