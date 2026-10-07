/**
 * STACKLY HOME HEALTHCARE - MAIN JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 2000);
    }

    // 2. Load Navbar and Footer Dynamically (for static hosting without full copy-paste)
    loadComponents();

    // 3. Init AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 4. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Overlapping Images Swap (Click to bring to front)
    document.querySelectorAll('.image-overlap-swap').forEach(container => {
        const images = container.querySelectorAll('img');
        if (images.length === 2) {
            images.forEach(img => {
                img.style.cursor = 'pointer';
                img.style.transition = 'opacity 0.2s ease-in-out';
                img.addEventListener('click', () => {
                    // Briefly fade out images
                    images[0].style.opacity = '0.5';
                    images[1].style.opacity = '0.5';
                    
                    setTimeout(() => {
                        // Swap the sources and alt text
                        const src1 = images[0].src;
                        const src2 = images[1].src;
                        const alt1 = images[0].alt;
                        const alt2 = images[1].alt;
                        
                        images[0].src = src2;
                        images[1].src = src1;
                        images[0].alt = alt2;
                        images[1].alt = alt1;

                        // Fade back in
                        images[0].style.opacity = '1';
                        images[1].style.opacity = '1';
                    }, 200);
                });
            });
        }
    });
});

async function loadComponents() {
    try {
        const navbarHolder = document.getElementById('navbar-placeholder');
        if (navbarHolder) {
            const resp = await fetch('navbar.html');
            if (resp.ok) {
                navbarHolder.innerHTML = await resp.text();
                initNavbar();
            }
        }

        const footerHolder = document.getElementById('footer-placeholder');
        if (footerHolder) {
            const resp = await fetch('footer.html');
            if (resp.ok) {
                footerHolder.innerHTML = await resp.text();
            }
        }
    } catch (e) {
        console.error("Error loading components", e);
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Set Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
            
            // If it's a dropdown item, also highlight the parent "Pages" link
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        }
    });

    // Handle mobile menu full screen & prevent scroll
    const navbarMain = document.getElementById('navbarMain');
    const navbarEl = document.querySelector('.navbar');
    if (navbarMain) {
        navbarMain.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
            if (navbarEl) navbarEl.classList.add('mobile-menu-open');
        });
        navbarMain.addEventListener('hide.bs.collapse', () => {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
            if (navbarEl) navbarEl.classList.remove('mobile-menu-open');
        });
    }
}
