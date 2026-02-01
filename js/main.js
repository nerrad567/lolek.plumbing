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
        
        // ===== REVIEWS (55 total from Checkatrade) =====
        const allReviews = [
            { text: "Kris was early & carried out a good Job very clean & tidy i would recommend him", name: "Mark", area: "CO15" },
            { text: "Very polite, very professional. Will recommend to family and friends. Arrived at time stated, cheerful, much appreciated", name: "Steven", area: "CO10" },
            { text: "Kris is a first class plumber. He is very thorough and extremely neat and tidy. I can recommend him without any hesitation", name: "Len", area: "CO3" },
            { text: "Kris was very professional and did a great job. I'll recommend him and happy to use him again", name: "Amaka", area: "CM1" },
            { text: "Could not be happier with the work completed by Kris. Super helpful and very easy to talk to. Wouldn't hesitate to recommend", name: "Sam", area: "CO4" },
            { text: "Tidy, on time and professional", name: "Zac", area: "CM77" },
            { text: "Very happy with the results, very professional for a reasonable price", name: "Robert", area: "IP4" },
            { text: "Fixed on the spot", name: "Alex", area: "CM1" },
            { text: "Arrived at time stated. Polite. Completed required work. Now have delightful hot water. Thank you", name: "Janet", area: "IP8" },
            { text: "We are so impressed, polite gentleman who works so hard, works non-stop. He is a perfectionist. We would highly recommend him", name: "Caron", area: "CO6" },
            { text: "Kris did an excellent job. He turned up on time, fixed the problem and left the work area clean and tidy", name: "Tom", area: "CO11" },
            { text: "Very nice gentleman. Job completed on first visit, price reasonable. Would recommend and use again", name: "Walter", area: "IP9" },
            { text: "Kris arrived on time, was friendly, informative and gave a very professional service. Will use again", name: "Mark", area: "CO10" },
            { text: "Prompt replies and good communication. Worked hard all day on a freezing weekend to fit radiators. Thorough and methodical", name: "Liz", area: "CO6" },
            { text: "He was a very nice man very polite and his work was excellent", name: "Sally", area: "CM9" },
            { text: "Very happy with his professionalism and quality of work at a very competitive price. 5 star recommendation", name: "John", area: "CO4" },
            { text: "Really pleased with Chris's work, very reliable, honest easy going man. Done a great job and would use again", name: "John", area: "CO1" },
            { text: "Highly recommend this plumber. Chris was friendly, helpful and very professional. Will use again", name: "Hayley", area: "CM2" },
            { text: "On time. Very friendly and helpful. Would definitely recommend and use him again", name: "Gavin", area: "CO10" },
            { text: "Quick response and excellent quality of work. Wouldn't hesitate to ask Kris to carry out more work in the future", name: "Craig", area: "IP2" },
            { text: "Kris turned up on time and completed the work tidily and efficiently. Lovely bloke who takes pride in his work", name: "Sharon", area: "CM1" },
            { text: "Can't rate this guy highly enough. What a truly genuine person. Quick to quote, keen to work, polite, prompt, efficient", name: "Dawn", area: "CO15" },
            { text: "Chris provided a fantastic service. I will definitely be calling him again when I next need a plumber", name: "Hannah", area: "CM7" },
            { text: "Chris provided excellent service. Neat and tidy workman ensuring he cleaned up before leaving. Highly recommend", name: "Maureen", area: "IP3" },
            { text: "The job was tougher than expected but Chris stayed and finished the job with no complaint", name: "Chris", area: "CM1" },
            { text: "Brilliant job thanks", name: "Susan", area: "CO2" },
            { text: "Very pleased with Chris and his work, would recommend him", name: "Antony", area: "CO2" },
            { text: "Chris came on time and completed the job within the hour. Very clean and tidy. Friendly and professional", name: "Gosia", area: "CM1" },
            { text: "Kris was great, pump supplied and fitted quickly and professionally. Very happy with his work", name: "Mark", area: "CM7" },
            { text: "Kris attended on time and carried out a successful repair on a toilet cistern. Very satisfactory job", name: "Allen", area: "CO10" },
            { text: "Kris arrived at the agreed time and did the awkward job in an excellent fashion. Knowledgeable and polite", name: "Robin", area: "IP33" },
            { text: "Kris was prompt and did a thorough job, staying longer to make sure the work was completed", name: "Chris", area: "CM23" },
            { text: "A pleasant chap that just got on with it and did a good job", name: "Andy", area: "CB22" },
            { text: "Kris was very polite and very tidy. He got to work straight away and completed the job the same evening", name: "Karen", area: "CB23" },
            { text: "Very efficient, was prompt and did the small job we needed very well and at a good price", name: "Anne", area: "CO4" },
            { text: "Quick excellent job, good value considering overall 3 hours work", name: "David", area: "CB23" },
            { text: "Chris was pleasant polite and on time, very clean and tidy. Chris kept me informed", name: "Carol", area: "IP11" },
            { text: "What a great guy, very helpful, very good at his job. Would not hesitate to recommend Chris", name: "Dave", area: "CO10" },
            { text: "Kris was the only one to reply to my need. Arrived early, diagnosed the problem and completed the job. A gem of a workman", name: "John", area: "CO5" },
            { text: "Super job and polite, tidy workman. Would highly recommend", name: "Chloe", area: "CO1" },
            { text: "What a lovely person, very efficient", name: "Zoe", area: "CB8" },
            { text: "I can't recommend Kris highly enough. Knowledgeable, helpful, reliable, polite and friendly", name: "Sam", area: "IP6" },
            { text: "Was out to fix my problem the same day. Quick and excellent work, will definitely be using again", name: "Philip", area: "IP4" },
            { text: "Great job, nice guy and very helpful plus reasonably priced. Highly recommend", name: "Alex", area: "CO1" },
            { text: "Thanks job well done", name: "Malcolm", area: "CO3" },
            { text: "Prompt friendly efficient service", name: "Dominic", area: "N22" },
            { text: "First class job, would highly recommend him", name: "John", area: "CO15" },
            { text: "Very good", name: "Michele", area: "CM3" },
            { text: "Top bloke, turned up bang on time. Done a good job, very tidy and clean. Very good value for money", name: "Christopher", area: "CM6" },
            { text: "Kris did an excellent job. His manner inspired confidence, the work was of a high standard. Wouldn't hesitate to use again", name: "Peter", area: "CO10" },
            { text: "Excellent tradesman made sure everything was done before departure. Clean and tidy. Would recommend highly", name: "Linda", area: "CO4" },
            { text: "All the required work was done as expected in good time. Great quality of work, great price", name: "Richard", area: "IP3" },
            { text: "A gentleman who listens to your problem and sorts it out with efficiency and care. Five stars are not enough", name: "R. Sillitoe", area: "CO12" },
            { text: "What a star! Chris turned up the same day and fixed the leak. A lovely guy who gets the job done well", name: "Ali", area: "CM8" },
            { text: "Kris sorted it out quickly and efficiently at no extra cost! Great to have someone who took pride in his work", name: "Kim", area: "CM0" }
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
            shuffleArray(allReviews).slice(0, 12).forEach(r => {
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
        
        // Check if GSAP loaded - skip heavy animations on mobile for performance
        if (typeof gsap !== 'undefined' && window.innerWidth > 768) {
            initGSAP();
        }
        
        // Only init Swiper on desktop (mobile causes layout issues)
        if (typeof Swiper !== 'undefined' && window.innerWidth > 768) {
            initSwipers();
        }
    });
    
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach((panel, index) => {
            const content = panel.querySelector('.panel-content');
            
            // Skip first panel (home) - CSS handles visibility
            // Only animate panels that scroll into view
            if (index > 0) {
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
        // Features carousel DISABLED on mobile - causes layout issues
        // Only init on desktop (width > 768px)
        const featuresEl = document.querySelector('.features-swiper');
        if (featuresEl && window.innerWidth > 768) {
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
