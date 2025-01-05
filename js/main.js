// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentItem = 0;

        // Initialiser le premier élément
        items[0].classList.add('active');

        function nextSlide() {
            items[currentItem].classList.remove('active');
            currentItem = (currentItem + 1) % items.length;
            items[currentItem].classList.add('active');
        }

        setInterval(nextSlide, 5000);
    }

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card, .quick-link-card').forEach(el => {
        observer.observe(el);
    });
});

// Fonction pour initialiser Google Maps
function initMap() {
    // Coordonnées du centre du Jura
    const juraCenter = {
        lat: 46.6154017,
        lng: 5.8663228
    };

    // Création de la carte
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: juraCenter,
        styles: [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e6e6e6"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#aad2e3"
                    }
                ]
            }
        ]
    });

    // Points d'intérêt
    const attractions = [
        {
            position: { lat: 46.6154017, lng: 5.8663228 },
            title: "Cascades du Hérisson",
            content: `<div class="info-window">
                <h3>Cascades du Hérisson</h3>
                <p>⭐ 4.6/5</p>
                <p>31 cascades sur 3,7 km</p>
                <a href="attractions.html#herisson">En savoir plus</a>
            </div>`
        },
        {
            position: { lat: 46.4697355, lng: 5.6735625 },
            title: "Lac de Vouglans",
            content: `<div class="info-window">
                <h3>Lac de Vouglans</h3>
                <p>⭐ 4.7/5</p>
                <p>3ème plus grand lac artificiel de France</p>
                <a href="attractions.html#vouglans">En savoir plus</a>
            </div>`
        },
        // Ajoutez d'autres points d'intérêt ici
    ];

    // Créer une fenêtre d'info unique
    const infoWindow = new google.maps.InfoWindow();

    // Ajouter les marqueurs
    attractions.forEach(attraction => {
        const marker = new google.maps.Marker({
            position: attraction.position,
            map: map,
            title: attraction.title
        });

        marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(attraction.content);
            infoWindow.open(map, marker);
        });
    });
}