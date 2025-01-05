// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
        });
    });

    // Carousel automatique
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentItem = 0;

        function nextSlide() {
            items[currentItem].classList.remove('active');
            currentItem = (currentItem + 1) % items.length;
            items[currentItem].classList.add('active');
        }

        // Change de slide toutes les 5 secondes
        setInterval(nextSlide, 5000);
    }

    // Animation au scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px',
        }
    );

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .quick-link-card').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll pour les ancres
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
});

// Validation du formulaire newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (validateEmail(email)) {
            alert('Merci de votre inscription à la newsletter !');
            newsletterForm.reset();
        } else {
            alert('Veuillez entrer une adresse email valide.');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
