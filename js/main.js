// ===== LOLEK PLUMBING - Main JS =====
// Optimized for performance

(function() {
    'use strict';
    
    // ===== LANGUAGE SYSTEM =====
    let currentLang = localStorage.getItem('lang') || 'en';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        document.querySelectorAll('.flag-link').forEach(f => {
            f.classList.toggle('active', f.dataset.lang === lang);
        });
        
        // Update nav icon labels
        document.querySelectorAll('.nav-icon[data-i18n-label]').forEach(icon => {
            const key = icon.dataset.i18nLabel;
            if (translations[lang] && translations[lang][key]) {
                icon.dataset.label = translations[lang][key];
            }
        });
    }
    
    // ===== INIT ON DOM READY =====
    document.addEventListener('DOMContentLoaded', function() {
        // Year
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Initialize language
        setLanguage(currentLang);
        
        // Language flags
        document.querySelectorAll('.flag-link').forEach(flag => {
            flag.addEventListener('click', function(e) {
                e.preventDefault();
                setLanguage(this.dataset.lang);
            });
        });
        
        // ===== ICON NAVIGATION =====
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Update icon labels for current language
        function updateNavLabels() {
            document.querySelectorAll('.nav-icon[data-i18n-label]').forEach(icon => {
                const key = icon.dataset.i18nLabel;
                if (translations[currentLang] && translations[currentLang][key]) {
                    icon.dataset.label = translations[currentLang][key];
                }
            });
        }
        updateNavLabels();
        
        // ===== REVIEWS =====
        const allReviews = [
            { text: "Kris was early & carried out a good job very clean & tidy. I would recommend him.", name: "Mark", area: "CO15" },
            { text: "Very polite, very professional. Will recommend to family and friends.", name: "Steven", area: "CO10" },
            { text: "Kris is a first class plumber. He is very thorough and extremely neat and tidy.", name: "Len", area: "CO3" },
            { text: "Could not be happier with the work completed by Kris. Super helpful and efficient.", name: "Sam", area: "CO4" },
            { text: "Very happy with the results, very professional for a reasonable price.", name: "Robert", area: "IP4" },
            { text: "We are so impressed! Polite gentleman who works so hard, a perfectionist.", name: "Caron", area: "CO6" },
            { text: "Kris did an excellent job. He turned up on time, fixed the problem and left the work area clean.", name: "Tom", area: "CO11" },
            { text: "Very happy with his professionalism and quality of work. 5 star recommendation.", name: "John", area: "CO4" },
            { text: "Can't rate this guy highly enough. Quick to quote, keen to work, polite, prompt, efficient.", name: "Dawn", area: "CO15" },
            { text: "Chris provided a fantastic service. Will definitely be calling him again.", name: "Hannah", area: "CM7" },
            { text: "Prompt friendly efficient service.", name: "Dominic", area: "N22" },
            { text: "Top bloke, turned up bang on time. Done a good job, very tidy and clean!", name: "Christopher", area: "CM6" },
            { text: "A gentleman - listens to your problem, sorts it out with efficiency and care. Five stars are not enough.", name: "R. Sillitoe", area: "CO12" },
            { text: "What a star! Not only did Chris turn up to do the quote on the same day but he fixed the leak.", name: "Ali", area: "CM8" },
            { text: "I can't recommend Kris highly enough. Knowledgeable, helpful, reliable, polite and friendly.", name: "Sam", area: "IP6" }
        ];
        
        function shuffleArray(arr) {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
        
        const reviewsWrapper = document.getElementById('reviewsWrapper');
        if (reviewsWrapper) {
            shuffleArray(allReviews).slice(0, 8).forEach(r => {
                reviewsWrapper.innerHTML += `
                    <div class="swiper-slide">
                        <blockquote class="review-card">
                            <div class="stars" aria-label="5 stars">★★★★★</div>
                            <p>"${r.text}"</p>
                            <footer><strong>${r.name}</strong> • ${r.area}</footer>
                        </blockquote>
                    </div>
                `;
            });
        }
        
        // ===== LIGHTBOX =====
        const lightbox = document.getElementById('lightbox');
        const lbImg = lightbox.querySelector('img');
        
        document.querySelectorAll('.project-card img').forEach(img => {
            img.addEventListener('click', function() {
                lbImg.src = this.src;
                lbImg.alt = this.alt;
                lightbox.classList.add('active');
            });
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lbImg) {
                lightbox.classList.remove('active');
            }
        });
        
        // Escape key closes lightbox
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    });
    
    // ===== INIT AFTER GSAP/SWIPER LOAD =====
    window.addEventListener('load', function() {
        // Set backgrounds
        document.querySelectorAll('.panel[data-bg]').forEach(panel => {
            panel.style.backgroundImage = `url(${panel.dataset.bg})`;
        });
        
        // Check if GSAP loaded
        if (typeof gsap !== 'undefined') {
            initGSAP();
        }
        
        // Check if Swiper loaded
        if (typeof Swiper !== 'undefined') {
            initSwipers();
        }
    });
    
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach((panel, index) => {
            const content = panel.querySelector('.panel-content');
            
            // First panel (home) - animate immediately on load
            if (index === 0) {
                gsap.fromTo(content, 
                    { opacity: 0, y: 50, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        delay: 0.2,
                        ease: "power2.out"
                    }
                );
            } else {
                // Other panels - trigger on scroll
                gsap.fromTo(content, 
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 75%",
                            end: "top 25%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
            
            const splash = panel.querySelector('.splash');
            if (splash) {
                gsap.fromTo(splash,
                    { scale: 0.85, opacity: 0, y: 30 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 65%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
            
            const cards = panel.querySelectorAll('.service-card');
            if (cards.length) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 40, scale: 0.92 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 55%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
            
            // Parallax
            gsap.to(panel, {
                backgroundPositionY: "25%",
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        // Scroll hint fade
        const scrollHint = document.querySelector('.scroll-hint');
        if (scrollHint) {
            gsap.to(scrollHint, {
                opacity: 0,
                y: 15,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "15% top",
                    scrub: true
                }
            });
        }
        
        // Active nav tracking
        panels.forEach(panel => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top center",
                end: "bottom center",
                onEnter: () => updateActiveNav(panel.id),
                onEnterBack: () => updateActiveNav(panel.id)
            });
        });
        
        // Upgrade nav icons to use GSAP scroll
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, { 
                        duration: 1, 
                        scrollTo: target, 
                        ease: "power2.inOut" 
                    });
                }
            });
        });
        
        // Other anchor links
        document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(a => {
            a.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
                }
            });
        });
    }
    
    function updateActiveNav(id) {
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.toggle('active', icon.dataset.panel === id);
        });
    }
    
    function initSwipers() {
        // Features carousel on home
        const featuresEl = document.querySelector('.features-swiper');
        if (featuresEl) {
            new Swiper(featuresEl, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: '.features-pagination',
                    clickable: true,
                    dynamicBullets: false
                },
                grabCursor: true
            });
        }
        
        // Projects carousel
        new Swiper('.project-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
        
        new Swiper('.reviews-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
})();
