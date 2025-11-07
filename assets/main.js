// Učitaj content.json i popuni stranicu
(function() {
    'use strict';

    // Fetch content
    fetch('content.json')
        .then(response => {
            if (!response.ok) throw new Error('Ne mogu učitati content.json');
            return response.json();
        })
        .then(data => {
            populatePage(data);
        })
        .catch(error => {
            console.error('Greška pri učitavanju sadržaja:', error);
        });

    function populatePage(content) {
        // Meta tags
        document.title = content.site.title;
        document.querySelector('meta[name="description"]').setAttribute('content', content.site.description);
        document.querySelector('meta[property="og:title"]').setAttribute('content', content.site.ogTitle);
        document.querySelector('meta[property="og:description"]').setAttribute('content', content.site.ogDescription);
        document.querySelector('meta[property="og:image"]').setAttribute('content', content.site.ogImage);

        // Navigation
        const navMenu = document.getElementById('navMenu');
        content.nav.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            li.appendChild(a);
            navMenu.appendChild(li);
        });

        // Hero
        document.getElementById('heroTitle').textContent = content.hero.headline;
        document.getElementById('heroSubtitle').textContent = content.hero.subheadline;
        const heroCta = document.getElementById('heroCta');
        heroCta.textContent = content.hero.ctaText;
        heroCta.href = content.hero.ctaHref;
        const heroImage = document.getElementById('heroImage');
        heroImage.src = content.hero.heroImage;
        heroImage.alt = content.hero.headline;

        // About
        document.getElementById('aboutTitle').textContent = content.about.title;
        document.getElementById('aboutText').textContent = content.about.text;
        const aboutImage = document.getElementById('aboutImage');
        aboutImage.src = content.about.image;
        aboutImage.alt = content.about.title;

        // Services
        const servicesGrid = document.getElementById('servicesGrid');
        content.services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <img src="${service.image}" alt="${service.title}" loading="lazy">
                <div class="service-card-content">
                    <h3>${service.title}</h3>
                    <p>${service.text}</p>
                </div>
            `;
            servicesGrid.appendChild(card);
        });

        // Gallery
        const galleryGrid = document.getElementById('galleryGrid');
        content.gallery.forEach((imagePath, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${imagePath}" alt="Galerija slika ${index + 1}" loading="lazy">`;
            galleryGrid.appendChild(item);
        });

        // Reasons
        const reasonsList = document.getElementById('reasonsList');
        content.reasons.forEach(reason => {
            const li = document.createElement('li');
            li.textContent = reason;
            reasonsList.appendChild(li);
        });

        // Contact
        document.getElementById('contactAddress').textContent = content.contact.address;
        
        const phoneLink = document.getElementById('contactPhone');
        phoneLink.textContent = content.contact.phone;
        phoneLink.href = `tel:${content.contact.phone.replace(/\s/g, '')}`;
        
        const emailLink = document.getElementById('contactEmail');
        emailLink.textContent = content.contact.email;
        emailLink.href = `mailto:${content.contact.email}`;
        
        const workingHours = document.getElementById('workingHours');
        content.contact.workingHours.forEach(hours => {
            const li = document.createElement('li');
            li.textContent = hours;
            workingHours.appendChild(li);
        });

        const mapLink = document.getElementById('mapLink');
        mapLink.href = content.contact.mapLink;

        const contactCta = document.getElementById('contactCta');
        contactCta.href = `mailto:${content.contact.email}`;

        // Footer
        document.getElementById('footerCopy').textContent = content.footer.copy;
        
        const footerSocial = document.getElementById('footerSocial');
        content.footer.social.forEach(social => {
            const a = document.createElement('a');
            a.href = social.href;
            a.textContent = social.label;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            footerSocial.appendChild(a);
        });
    }
})();
