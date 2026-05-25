document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. INITIALIZE AOS ANIMATIONS
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 100 });
    }

    // ==========================================
    // 1. PRELOADER & APP INIT LOGIC
    // ==========================================
    const preloader = document.getElementById('preloader');
    const mainApp = document.getElementById('mainApp');

    if (preloader && mainApp) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            mainApp.classList.remove('app-hidden');
            mainApp.classList.add('app-visible');

            // Trigger AOS after preloader
            AOS.refresh();
        }, 2000);
    }

    // ==========================================
    // 2. HAMBURGER MENU LOGIC
    // ==========================================
    const burger = document.getElementById('burgerMenu');
    const menuWrapper = document.getElementById('menuWrapper');

    if (burger && menuWrapper) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            menuWrapper.classList.toggle('active-menu');
            burger.classList.toggle('toggle-burger-active');

            const lines = burger.querySelectorAll('div');
            if (burger.classList.contains('toggle-burger-active')) {
                lines[0].style.transform = 'rotate(-45deg) translate(-4px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(45deg) translate(-4px, -5px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (menuWrapper.classList.contains('active-menu') && !menuWrapper.contains(e.target) && !burger.contains(e.target)) {
                menuWrapper.classList.remove('active-menu');
                burger.classList.remove('toggle-burger-active');
                const lines = burger.querySelectorAll('div');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // ==========================================
    // 3. HERO CAROUSEL LOGIC
    // ==========================================
    let slideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let slideTimer;

    if (slides.length > 0 && dots.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (index >= slides.length) { slideIndex = 0; }
            else if (index < 0) { slideIndex = slides.length - 1; }
            else { slideIndex = index; }

            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
        }

        function nextSlide() { showSlide(slideIndex + 1); }

        slideTimer = setInterval(nextSlide, 3000);

        window.currentSlide = function (index) {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, 3000);
        };
    }

    // ==========================================
    // 4. ANIMATED PARTICLES SYSTEM
    // ==========================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(212, 175, 55, ${Math.random()})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // ==========================================
    // 5. FEATURED GAMES CAROUSEL
    // ==========================================
    const gamesSlider = document.getElementById('gamesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (gamesSlider && prevBtn && nextBtn) {
        const scrollAmount = 320;
        nextBtn.addEventListener('click', () => { gamesSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
        prevBtn.addEventListener('click', () => { gamesSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    }

    // ==========================================
    // 6. LIVE TOURNAMENTS TIMER
    // ==========================================
    function updateTimer() {
        const timerElement = document.getElementById('timer1');
        if (timerElement) { timerElement.innerText = "01:24:59"; }
    }
    setInterval(updateTimer, 1000);
    // ==========================================
    // 7. STATS SECTION: COUNTERS & PROGRESS BARS
    // ==========================================
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');
    const progressFills = document.querySelectorAll('.progress-fill');

    if (statsSection && counters.length > 0) {
        // threshold 0.3 la irundhu 0.1 kku maathiyachu (Mobile fix)
        const statsObserver = new IntersectionObserver((entries, observer) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 100;
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (target === 10000) counter.innerText = "10K+";
                            else counter.innerText = target + "+";
                        }
                    };
                    updateCounter();
                });

                progressFills.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });

                observer.unobserve(statsSection);
            }
        }, { threshold: 0.1 }); // <--- FIX INGA DHAAN IRUKKU

        statsObserver.observe(statsSection);
    }
    // ==========================================
    // 8. 3D TESTIMONIAL CARD STACK LOGIC
    // ==========================================
    const cards = document.querySelectorAll('.testi-3d-card');
    const stackPrevBtn = document.getElementById('stackPrev');
    const stackNextBtn = document.getElementById('stackNext');

    let activeIndex = 0;

    function update3DStack() {
        if (cards.length === 0) return;
        let stt = 0;

        // Center Active Card
        cards[activeIndex].style.transform = `translateX(0px) scale(1) perspective(1000px)`;
        cards[activeIndex].style.zIndex = 10;
        cards[activeIndex].style.filter = 'blur(0px)';
        cards[activeIndex].style.opacity = 1;
        cards[activeIndex].style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.2)';

        // Cards to the Right
        for (let i = activeIndex + 1; i < cards.length; i++) {
            stt++;
            cards[i].style.transform = `translateX(${160 * stt}px) scale(${1 - 0.2 * stt}) perspective(1000px) rotateY(-15deg)`;
            cards[i].style.zIndex = 10 - stt;
            cards[i].style.filter = 'blur(3px)';
            cards[i].style.opacity = stt > 2 ? 0 : 0.6;
            cards[i].style.boxShadow = 'none';
        }

        stt = 0;

        // Cards to the Left
        for (let i = activeIndex - 1; i >= 0; i--) {
            stt++;
            cards[i].style.transform = `translateX(${-160 * stt}px) scale(${1 - 0.2 * stt}) perspective(1000px) rotateY(15deg)`;
            cards[i].style.zIndex = 10 - stt;
            cards[i].style.filter = 'blur(3px)';
            cards[i].style.opacity = stt > 2 ? 0 : 0.6;
            cards[i].style.boxShadow = 'none';
        }
    }

    if (cards.length > 0) {
        update3DStack();

        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                activeIndex = index;
                update3DStack();
            });
        });

        if (stackNextBtn) {
            stackNextBtn.addEventListener('click', () => {
                activeIndex = (activeIndex + 1 < cards.length) ? activeIndex + 1 : activeIndex;
                update3DStack();
            });
        }

        if (stackPrevBtn) {
            stackPrevBtn.addEventListener('click', () => {
                activeIndex = (activeIndex - 1 >= 0) ? activeIndex - 1 : activeIndex;
                update3DStack();
            });
        }
    }
});
