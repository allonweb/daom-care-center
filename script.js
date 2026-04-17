document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#fff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Smooth Scroll for local links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form Submissions (Mock)
    const recruitmentForm = document.getElementById('recruitment-form');
    const consultForm = document.getElementById('consult-form');

    const handleFormSubmit = (e, formName) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        console.log(`${formName} Submission:`, data);
        
        // Show success message (simple alert for now)
        alert(`신청이 정상적으로 접수되었습니다. 곧 연락드리겠습니다.\n\n[${formName}]`);
        e.target.reset();
    };

    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', (e) => handleFormSubmit(e, '요양보호사 모집'));
    }

    if (consultForm) {
        consultForm.addEventListener('submit', (e) => handleFormSubmit(e, '상담신청'));
    }

    // Header reveal on scroll
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // scroll down
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll) {
            // scroll up
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
});
