/* -------------------------------------------------------------
   ARK - Interactive Portfolio Logic
   Luxury Minimalism: Cinematic 3D, Parallax, Magnetic Hover
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize all components
    initCustomCursor();
    initMobileMenu();
    initAmbientBackground();
    initThreeDHero();
    initDividerScene();
    initTiltCards();
    initMagneticButtons();
    initPortfolioFilters();
    initStatsCounter();
    initEntranceAnimations();
    initParallaxEffects();
});

/* ==========================================
   1. CUSTOM INTERACTIVE CURSOR (Refined)
   ========================================== */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('customCursorDot');
    
    if (!cursor || !dot) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function updateCursor() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        dotX += (targetX - dotX) * 0.25;
        dotY += (targetY - dotY) * 0.25;
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const hoverableSelector = 'a, button, .portfolio-card, .bento-card, .form-input';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverableSelector)) {
            cursor.classList.add('hover');
            dot.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverableSelector)) {
            cursor.classList.remove('hover');
            dot.classList.remove('hover');
        }
    });
}

/* ==========================================
   2. MOBILE NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');

    if (!toggleBtn || !menu) return;

    const openMenu = () => menu.classList.add('open');
    const closeMenu = () => menu.classList.remove('open');

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ==========================================
   3. AMBIENT BACKGROUND PARTICLES (Extremely Subtle)
   ========================================== */
function initAmbientBackground() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const maxParticles = 30;

    class BackgroundParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5;
            this.speedX = (Math.random() - 0.5) * 0.05;
            this.speedY = (Math.random() - 0.5) * 0.05;
            this.opacity = Math.random() * 0.15;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new BackgroundParticle());

    function render() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(render);
    }
    render();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

/* ==========================================
   4. THREE.JS 3D LUXURY HERO OBJECT
   ========================================== */
function initThreeDHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Luxury Material: Dark Metallic
    const material = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.2,
    });

    // Torus Knot
    const geometry = new THREE.TorusKnotGeometry(4, 1.2, 256, 32);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dl1 = new THREE.DirectionalLight(0xffffff, 2);
    dl1.position.set(5, 5, 5);
    scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0xD4D4CE, 1.5);
    dl2.position.set(-5, -5, -5);
    scene.add(dl2);

    let targetRotationX = 0, targetRotationY = 0;
    const halfX = container.clientWidth / 2;
    const halfY = container.clientHeight / 2;

    container.addEventListener('mousemove', (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        targetRotationY = ((e.clientX - rect.left) - halfX) / halfX * 0.5;
        targetRotationX = ((e.clientY - rect.top) - halfY) / halfY * 0.5;
    });

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.005;
        mesh.rotation.x += 0.003;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05;
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;
        mesh.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================
   5. THREE.JS 3D DIVIDER (Wireframe Grid / Icosahedron)
   ========================================== */
function initDividerScene() {
    const canvas = document.getElementById('dividerCanvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const icoMesh = new THREE.Mesh(icoGeo, wireMat);
    scene.add(icoMesh);

    // Inner solid icosahedron for depth
    const innerGeo = new THREE.IcosahedronGeometry(3, 1);
    const innerMat = new THREE.MeshBasicMaterial({
        color: 0x9C8C70,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Tiny center sphere
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), coreMat);
    scene.add(coreSphere);

    // Floating vertex dots
    const dotGeo = new THREE.BufferGeometry();
    const vertices = icoGeo.attributes.position.array.slice();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.6 });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        icoMesh.rotation.y = t * 0.08;
        icoMesh.rotation.x = t * 0.05;
        innerMesh.rotation.y = -t * 0.12;
        innerMesh.rotation.z = t * 0.06;
        dots.rotation.y = t * 0.08;
        dots.rotation.x = t * 0.05;
        // Breathe effect
        const breathe = 1 + Math.sin(t * 0.8) * 0.05;
        icoMesh.scale.setScalar(breathe);
        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================
   6. BENTO GRID 3D TILT
   ========================================== */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/* ==========================================
   7. MAGNETIC HOVER CTAS (Heavy Easing via GSAP)
   ========================================== */
function initMagneticButtons() {
    const magnetics = document.querySelectorAll('.magnetic');

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const pullX = (e.clientX - centerX) * 0.2;
            const pullY = (e.clientY - centerY) * 0.2;

            if (typeof gsap !== 'undefined') {
                gsap.to(btn, { x: pullX, y: pullY, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
                const span = btn.querySelector('span');
                if (span) gsap.to(span, { x: pullX * 0.3, y: pullY * 0.3, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
            } else {
                btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
                const span = btn.querySelector('span');
                if (span) gsap.to(span, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
            } else {
                btn.style.transform = `translate(0px, 0px)`;
            }
        });
    });
}

/* ==========================================
   8. PORTFOLIO FILTERS
   ========================================== */
function initPortfolioFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-card');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            if (typeof gsap !== 'undefined') {
                gsap.to(items, {
                    y: 20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    onComplete: () => {
                        items.forEach(item => {
                            const cat = item.getAttribute('data-category');
                            item.style.display = (filterValue === 'all' || cat === filterValue) ? 'flex' : 'none';
                        });
                        gsap.to(items, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
                        ScrollTrigger.refresh();
                    }
                });
            }
        });
    });
}

/* ==========================================
   9. STATS COUNTER ANIMATION
   ========================================== */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // EaseOutExpo
            const eased = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.round(target * eased);
            el.textContent = currentVal;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    };

    // Use IntersectionObserver to trigger count when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

/* ==========================================
   10. GSAP ENTRANCE & SCROLL ANIMATIONS (Cinematic)
   ========================================== */
function initEntranceAnimations() {
    if (typeof gsap === 'undefined') return;

    // Header Slide-Down on load
    gsap.to('.floating-header', {
        y: 0, opacity: 1, duration: 1.5, delay: 0.2, ease: 'power4.out'
    });

    // Hero Section staggered reveal
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-badge-reveal', { y: 20, opacity: 0, duration: 1, delay: 0.5 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 1.5 }, '-=0.6')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1.2 }, '-=1')
      .from('.hero-ctas', { y: 20, opacity: 0, duration: 1 }, '-=0.8')
      .from('.hero-3d-container', { scale: 0.95, opacity: 0, duration: 2, ease: 'power2.out' }, '-=1.5');

    if (typeof ScrollTrigger !== 'undefined') {
        // Marquee section
        gsap.from('.marquee-section', {
            scrollTrigger: { trigger: '.marquee-section', start: 'top 95%' },
            opacity: 0, duration: 1.5, ease: 'power2.out'
        });

        // Bento Cards reveal
        gsap.from('.bento-card', {
            scrollTrigger: { trigger: '.bento-grid', start: 'top 85%' },
            y: 80, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out'
        });

        // Stats section
        gsap.from('.stat-item', {
            scrollTrigger: { trigger: '.stats-section', start: 'top 85%' },
            y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out'
        });

        // Portfolio Cards reveal
        gsap.from('.portfolio-card', {
            scrollTrigger: { trigger: '#portfolioGrid', start: 'top 85%' },
            y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out'
        });

        // Divider section
        gsap.from('.divider-quote', {
            scrollTrigger: { trigger: '.divider-section', start: 'top 75%' },
            y: 40, opacity: 0, duration: 1.5, ease: 'power3.out'
        });

        // Contact columns reveal
        gsap.from('.connect-info', {
            scrollTrigger: { trigger: '.connect-section', start: 'top 80%' },
            x: -40, opacity: 0, duration: 1.2, ease: 'power3.out'
        });
        gsap.from('.connect-form-container', {
            scrollTrigger: { trigger: '.connect-section', start: 'top 80%' },
            x: 40, opacity: 0, duration: 1.2, ease: 'power3.out'
        });
    }
}

/* ==========================================
   11. PARALLAX EFFECTS (21st.dev style depth)
   ========================================== */
function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Subtle parallax on portfolio images
    document.querySelectorAll('.portfolio-img').forEach(img => {
        gsap.to(img, {
            y: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}
