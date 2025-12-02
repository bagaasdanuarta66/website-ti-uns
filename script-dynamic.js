// ===========================
// FIREBASE IMPORT
// ===========================
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===========================
// LOADING SCREEN
// ===========================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
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

// ===========================
// HEADER SCROLL EFFECT
// ===========================
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===========================
// COUNTER ANIMATION FOR STATS
// ===========================
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

// ===========================
// FADE-IN ANIMATION ON SCROLL
// ===========================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    fadeInObserver.observe(section);
});

// ===========================
// FETCH DATA FROM FIRESTORE
// ===========================

// Load Karya Mahasiswa
async function loadKarya() {
    try {
        console.log('🔄 Loading karya from Firestore...');
        const karyaSlider = document.getElementById('karyaSlider');
        
        if (!karyaSlider) {
            console.log('❌ Karya slider not found');
            return;
        }

        const querySnapshot = await getDocs(collection(db, 'karya'));
        
        if (querySnapshot.empty) {
            console.log('⚠️ No karya data found');
            karyaSlider.innerHTML = '<p style="text-align:center; color:#6B7280;">Belum ada data karya mahasiswa.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
                <div class="karya-card">
                    <div class="karya-image">
                        <img src="${data.gambar_url}" alt="${data.judul}" onerror="this.src='https://via.placeholder.com/400x300'">
                        <div class="karya-overlay">
                            <span class="karya-category">${data.kategori}</span>
                        </div>
                    </div>
                    <div class="karya-content">
                        <h3>${data.judul}</h3>
                        <p class="karya-author"><i class="fas fa-user"></i> ${data.author}</p>
                        <p class="karya-desc">${data.deskripsi}</p>
                    </div>
                </div>
            `;
        });

        karyaSlider.innerHTML = html;
        console.log(`✅ Loaded ${querySnapshot.size} karya`);
        
        // Initialize slider after data loaded
        initKaryaSlider();
    } catch (error) {
        console.error('❌ Error loading karya:', error);
        const karyaSlider = document.getElementById('karyaSlider');
        if (karyaSlider) {
            karyaSlider.innerHTML = '<p style="text-align:center; color:#EF4444;">Gagal memuat data. Silakan refresh halaman.</p>';
        }
    }
}

// Load Mahasiswa Berprestasi
async function loadMahasiswa() {
    try {
        console.log('🔄 Loading mahasiswa from Firestore...');
        const mahasiswaSlider = document.getElementById('mahasiswaSlider');
        
        if (!mahasiswaSlider) {
            console.log('❌ Mahasiswa slider not found');
            return;
        }

        const querySnapshot = await getDocs(collection(db, 'mahasiswa_berprestasi'));
        
        if (querySnapshot.empty) {
            console.log('⚠️ No mahasiswa data found');
            mahasiswaSlider.innerHTML = '<p style="text-align:center; color:#6B7280;">Belum ada data mahasiswa berprestasi.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
                <div class="mahasiswa-card">
                    <div class="mahasiswa-image">
                        <img src="${data.gambar_url}" alt="${data.nama}" onerror="this.src='https://via.placeholder.com/300'">
                        <div class="mahasiswa-badge"><i class="fas fa-trophy"></i></div>
                    </div>
                    <div class="mahasiswa-content">
                        <h3>${data.nama}</h3>
                        <p class="mahasiswa-year"><i class="fas fa-calendar"></i> ${data.tahun}</p>
                        <p class="mahasiswa-achievement">${data.prestasi}</p>
                    </div>
                </div>
            `;
        });

        mahasiswaSlider.innerHTML = html;
        console.log(`✅ Loaded ${querySnapshot.size} mahasiswa`);
        
        // Initialize slider after data loaded
        initMahasiswaSlider();
    } catch (error) {
        console.error('❌ Error loading mahasiswa:', error);
        const mahasiswaSlider = document.getElementById('mahasiswaSlider');
        if (mahasiswaSlider) {
            mahasiswaSlider.innerHTML = '<p style="text-align:center; color:#EF4444;">Gagal memuat data. Silakan refresh halaman.</p>';
        }
    }
}

// Load Laboratorium
async function loadLab() {
    try {
        console.log('🔄 Loading lab from Firestore...');
        const labContainer = document.querySelector('.lab-grid');
        
        if (!labContainer) {
            console.log('❌ Lab container not found');
            return;
        }

        const querySnapshot = await getDocs(collection(db, 'laboratorium'));
        
        if (querySnapshot.empty) {
            console.log('⚠️ No lab data found');
            labContainer.innerHTML = '<p style="text-align:center; color:#6B7280; grid-column: 1/-1;">Belum ada data laboratorium.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
                <a href="${data.link}" target="_blank" class="lab-card-link">
                    <div class="lab-card-new">
                        <div class="lab-logo" style="background: transparent;">
                            <img src="${data.gambar_url}" alt="${data.nama}" onerror="this.src='https://via.placeholder.com/120'" style="width: 100px; height: 100px; object-fit: contain; background: transparent;">
                        </div>
                        <h3>${data.nama}</h3>
                        <h4>${data.nama_lengkap}</h4>
                        <p>${data.deskripsi}</p>
                    </div>
                </a>
            `;
        });

        labContainer.innerHTML = html;
        console.log(`✅ Loaded ${querySnapshot.size} labs`);
    } catch (error) {
        console.error('❌ Error loading lab:', error);
        const labContainer = document.querySelector('.lab-grid');
        if (labContainer) {
            labContainer.innerHTML = '<p style="text-align:center; color:#EF4444; grid-column: 1/-1;">Gagal memuat data. Silakan refresh halaman.</p>';
        }
    }
}

// Load Product Mahasiswa
async function loadProduct() {
    try {
        console.log('🔄 Loading product from Firestore...');
        const productContainer = document.querySelector('.product-grid');
        
        if (!productContainer) {
            console.log('❌ Product container not found');
            return;
        }

        const querySnapshot = await getDocs(collection(db, 'product_mahasiswa'));
        
        if (querySnapshot.empty) {
            console.log('⚠️ No product data found');
            productContainer.innerHTML = '<p style="text-align:center; color:#6B7280; grid-column: 1/-1;">Belum ada data product mahasiswa.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
                <a href="${data.link || '#'}" target="_blank" class="lab-card-link">
                    <div class="lab-card-new">
                        <div class="lab-logo" style="background: transparent;">
                            <img src="${data.gambar_url}" alt="${data.nama_product}" 
                                 onerror="this.src='https://via.placeholder.com/120'" 
                                 style="width: 100px; height: 100px; object-fit: contain; background: transparent;">
                        </div>
                        <h3>${data.nama_product}</h3>
                        <p>${data.deskripsi}</p>
                    </div>
                </a>
            `;
        });

        productContainer.innerHTML = html;
        console.log(`✅ Loaded ${querySnapshot.size} products`);
    } catch (error) {
        console.error('❌ Error loading product:', error);
        const productContainer = document.querySelector('.product-grid');
        if (productContainer) {
            productContainer.innerHTML = '<p style="text-align:center; color:#EF4444; grid-column: 1/-1;">Gagal memuat data. Silakan refresh halaman.</p>';
        }
    }
}

// Load Alumni
async function loadAlumni() {
    try {
        console.log('🔄 Loading alumni from Firestore...');
        const alumniContainer = document.querySelector('.alumni-list');
        
        if (!alumniContainer) {
            console.log('❌ Alumni container not found');
            return;
        }

        const querySnapshot = await getDocs(collection(db, 'alumni'));
        
        if (querySnapshot.empty) {
            console.log('⚠️ No alumni data found');
            alumniContainer.innerHTML = '<p style="text-align:center; color:#6B7280; grid-column: 1/-1;">Belum ada data alumni.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
                <div class="alumni-card">
                    <div class="alumni-avatar">
                        <img src="${data.gambar_url}" alt="${data.nama}" 
                             onerror="this.src='https://via.placeholder.com/100'" 
                             style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    </div>
                    <div class="alumni-info">
                        <h3>${data.nama}</h3>
                        <p class="alumni-position"><i class="fas fa-briefcase"></i> ${data.jabatan}</p>
                        <p class="alumni-year"><i class="fas fa-graduation-cap"></i> Lulusan ${data.tahun_lulus}</p>
                        <p class="alumni-story">${data.cerita}</p>
                    </div>
                </div>
            `;
        });

        alumniContainer.innerHTML = html;
        console.log(`✅ Loaded ${querySnapshot.size} alumni`);
    } catch (error) {
        console.error('❌ Error loading alumni:', error);
        const alumniContainer = document.querySelector('.alumni-list');
        if (alumniContainer) {
            alumniContainer.innerHTML = '<p style="text-align:center; color:#EF4444; grid-column: 1/-1;">Gagal memuat data. Silakan refresh halaman.</p>';
        }
    }
}

// ===========================
// SLIDER FUNCTIONALITY
// ===========================

function initKaryaSlider() {
    const karyaSlider = document.getElementById('karyaSlider');
    const karyaPrevBtn = document.getElementById('karyaPrev');
    const karyaNextBtn = document.getElementById('karyaNext');

    if (karyaSlider && karyaPrevBtn && karyaNextBtn) {
        let karyaScrollAmount = 0;

        karyaNextBtn.addEventListener('click', function() {
            const card = karyaSlider.querySelector('.karya-card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth;
            const gap = 30;
            const scrollDistance = cardWidth + gap;
            
            karyaScrollAmount += scrollDistance;
            
            const maxScroll = karyaSlider.scrollWidth - karyaSlider.clientWidth;
            if (karyaScrollAmount > maxScroll) {
                karyaScrollAmount = 0;
            }
            
            karyaSlider.scrollTo({
                left: karyaScrollAmount,
                behavior: 'smooth'
            });
        });

        karyaPrevBtn.addEventListener('click', function() {
            const card = karyaSlider.querySelector('.karya-card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth;
            const gap = 30;
            const scrollDistance = cardWidth + gap;
            
            karyaScrollAmount -= scrollDistance;
            
            if (karyaScrollAmount < 0) {
                karyaScrollAmount = karyaSlider.scrollWidth - karyaSlider.clientWidth;
            }
            
            karyaSlider.scrollTo({
                left: karyaScrollAmount,
                behavior: 'smooth'
            });
        });

        karyaSlider.addEventListener('scroll', function() {
            karyaScrollAmount = karyaSlider.scrollLeft;
        });
    }
}

function initMahasiswaSlider() {
    const mahasiswaSlider = document.getElementById('mahasiswaSlider');
    const mahasiswaPrevBtn = document.getElementById('mahasiswaPrev');
    const mahasiswaNextBtn = document.getElementById('mahasiswaNext');

    if (mahasiswaSlider && mahasiswaPrevBtn && mahasiswaNextBtn) {
        let mahasiswaScrollAmount = 0;

        mahasiswaNextBtn.addEventListener('click', function() {
            const card = mahasiswaSlider.querySelector('.mahasiswa-card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth;
            const gap = 30;
            const scrollDistance = cardWidth + gap;
            
            mahasiswaScrollAmount += scrollDistance;
            
            const maxScroll = mahasiswaSlider.scrollWidth - mahasiswaSlider.clientWidth;
            if (mahasiswaScrollAmount > maxScroll) {
                mahasiswaScrollAmount = 0;
            }
            
            mahasiswaSlider.scrollTo({
                left: mahasiswaScrollAmount,
                behavior: 'smooth'
            });
        });

        mahasiswaPrevBtn.addEventListener('click', function() {
            const card = mahasiswaSlider.querySelector('.mahasiswa-card');
            if (!card) return;
            
            const cardWidth = card.offsetWidth;
            const gap = 30;
            const scrollDistance = cardWidth + gap;
            
            mahasiswaScrollAmount -= scrollDistance;
            
            if (mahasiswaScrollAmount < 0) {
                mahasiswaScrollAmount = mahasiswaSlider.scrollWidth - mahasiswaSlider.clientWidth;
            }
            
            mahasiswaSlider.scrollTo({
                left: mahasiswaScrollAmount,
                behavior: 'smooth'
            });
        });

        mahasiswaSlider.addEventListener('scroll', function() {
            mahasiswaScrollAmount = mahasiswaSlider.scrollLeft;
        });
    }
}

// ===========================
// INITIALIZE ON PAGE LOAD
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing website...');
    
    // Load all data from Firestore
    await Promise.all([
        loadKarya(),
        loadMahasiswa(),
        loadLab(),
        loadProduct(),
        loadAlumni()
    ]);
    
    console.log('✅ All data loaded!');
});