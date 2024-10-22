document.addEventListener('DOMContentLoaded', function() {
    // Load Daily Devotional
    loadDailyDevotional();

    // Load Events
    loadEvents();

    // Load Prayer Wall
    loadPrayers();

    // Initialize Image Carousel
    initializeImageCarousel();

    // Push Notifications (PWA Notifications)
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission(status => {
            if (status === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }

    // Submit Prayer Request
    document.getElementById('submit-prayer').addEventListener('click', function() {
        const prayerText = document.getElementById('prayer-text').value.trim();
        if (prayerText) {
            savePrayer(prayerText);
            document.getElementById('prayer-text').value = '';
        }
    });

    // Share Daily Devotional
    document.getElementById('share-devotional-facebook').addEventListener('click', function() {
        shareOnSocialMedia('facebook', 'Check out today\'s devotional!', window.location.href);
    });
    document.getElementById('share-devotional-twitter').addEventListener('click', function() {
        shareOnSocialMedia('twitter', 'Check out today\'s devotional!', window.location.href);
    });
    document.getElementById('share-devotional-whatsapp').addEventListener('click', function() {
        shareOnSocialMedia('whatsapp', 'Check out today\'s devotional!', window.location.href);
    });
    document.getElementById('share-devotional-tiktok').addEventListener('click', function() {
        shareOnSocialMedia('tiktok', 'Check out today\'s devotional!', window.location.href);
    });

    // Share Sermon
    document.getElementById('share-sermon-facebook').addEventListener('click', function() {
        shareOnSocialMedia('facebook', 'Watch this inspiring sermon!', window.location.href + '#sermons');
    });
    document.getElementById('share-sermon-twitter').addEventListener('click', function() {
        shareOnSocialMedia('twitter', 'Watch this inspiring sermon!', window.location.href + '#sermons');
    });
    document.getElementById('share-sermon-whatsapp').addEventListener('click', function() {
        shareOnSocialMedia('whatsapp', 'Watch this inspiring sermon!', window.location.href + '#sermons');
    });
    document.getElementById('share-sermon-tiktok').addEventListener('click', function() {
        shareOnSocialMedia('tiktok', 'Watch this inspiring sermon!', window.location.href + '#sermons');
    });

    // Functions

    function loadDailyDevotional() {
        let usedVerses = JSON.parse(localStorage.getItem('usedVerses')) || [];
        axios.get('https://labs.bible.org/api/?passage=random&type=json')
            .then(response => {
                const verseData = response.data[0];
                const verseId = `${verseData.bookname} ${verseData.chapter}:${verseData.verse}`;
                if (!usedVerses.includes(verseId)) {
                    displayVerse(verseData);
                    usedVerses.push(verseId);
                    if (usedVerses.length > 365) usedVerses.shift(); // Keep history of 365 verses
                    localStorage.setItem('usedVerses', JSON.stringify(usedVerses));
                    // Show notification
                    showNotification('Daily Devotional', `${verseId} - ${verseData.text}`);
                } else {
                    loadDailyDevotional(); // Retry if verse was used before
                }
            })
            .catch(error => {
                // Fallback in case API fails
                document.getElementById('daily-devotional-content').innerHTML = `
                    <h3>John 3:16</h3>
                    <p>For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.</p>`;
            });
    }

    // Call the function every 24 hours (86400000 ms)
    setInterval(loadDailyDevotional, 86400000); // 24 hours

    function displayVerse(verse) {
        const verseReference = `${verse.bookname} ${verse.chapter}:${verse.verse}`;
        const content = `
            <h3>${verseReference}</h3>
            <p>${verse.text}</p>
        `;
        document.getElementById('daily-devotional-content').innerHTML = content;
    }

    function loadEvents() {
        // Mock data for events
        const events = [
            { name: 'Sunday Service', date: '2024-09-22' },
            { name: 'Youth Fellowship', date: '2024-09-25' },
            { name: 'Community Outreach', date: '2024-10-01' },
        ];
        const eventsList = document.getElementById('events-list');
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.name} - ${event.date}`;
            eventsList.appendChild(li);
        });
    }

    function resetPrayerWall() {
        let lastReset = localStorage.getItem('lastReset');
        const now = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

        if (!lastReset || now - new Date(lastReset) > oneWeek) {
            localStorage.setItem('lastReset', now);
            localStorage.removeItem('prayers'); // Erase prayers
            loadPrayers(); // Reload with empty state
        }
    }

    function savePrayer(prayerText) {
        resetPrayerWall(); // Check if the wall needs to be reset before saving
        let prayers = JSON.parse(localStorage.getItem('prayers')) || [];
        prayers.unshift({ text: prayerText, date: new Date().toLocaleString() });
        localStorage.setItem('prayers', JSON.stringify(prayers));
        loadPrayers();
    }

    function loadPrayers() {
        let prayers = JSON.parse(localStorage.getItem('prayers')) || [];
        const prayersDiv = document.getElementById('prayers');
        prayersDiv.innerHTML = '';
        prayers.forEach(prayer => {
            const prayerItem = document.createElement('div');
            prayerItem.classList.add('prayer-item');
            prayerItem.innerHTML = `
                <p>${prayer.text}</p>
                <small>${prayer.date}</small>
            `;
            prayersDiv.appendChild(prayerItem);
        });
    }

    function shareOnSocialMedia(platform, text, url) {
        let shareUrl = '';
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        } else if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        } else if (platform === 'whatsapp') {
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
        } else if (platform === 'tiktok') {
            shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        }
        window.open(shareUrl, '_blank');
    }

    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(function(reg) {
                reg.showNotification(title, {
                    body: body,
                    icon: 'the_promises logo.jpg',
                    badge: 'icons/icon-192x192.png',
                });
            });
        }
    }

    // Image Carousel Initialization
    function initializeImageCarousel() {
        let currentImageIndex = 0;
        const images = document.querySelectorAll('.carousel-image');
        images[currentImageIndex].classList.add('active');

        document.getElementById('next-image-btn').addEventListener('click', function() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length; // Loop back to the first image
            images[currentImageIndex].classList.add('active');
        });
    }
});
