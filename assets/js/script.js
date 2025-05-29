function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playButtons = document.querySelectorAll('.play-button');
    const highlights = document.querySelectorAll('.highlight');
    
    // State
    let currentHighlightIndex = 0;
    let allVideos = [];

    // Click Zones
    const createClickZones = () => {
        const leftZone = document.createElement('div');
        leftZone.className = 'lightbox-zone left-zone';
        leftZone.addEventListener('click', () => navigate(-1));
        
        const rightZone = document.createElement('div');
        rightZone.className = 'lightbox-zone right-zone';
        rightZone.addEventListener('click', () => navigate(1));
        
        lightbox.appendChild(leftZone);
        lightbox.appendChild(rightZone);
    };

    // Pause all other videos
    const pauseOtherVideos = (currentVideo) => {
        allVideos.forEach(video => {
            if (video !== currentVideo && !video.paused) {
                video.pause();
                video.currentTime = 0;
            }
        });
    };

    // Navigation
    const navigate = (direction) => {
        currentHighlightIndex = (currentHighlightIndex + direction + highlights.length) % highlights.length;
        loadVideo(currentHighlightIndex);
    };

    // Load video
    const loadVideo = (index) => {
        const source = highlights[index].querySelector('source').src;
        pauseOtherVideos(lightboxVideo);
        lightboxVideo.src = source;
        lightboxVideo.load();
        lightboxVideo.play().catch(e => console.log('Autoplay blocked'));
    };

    // Initialize
    const init = () => {
        // Track all videos
        document.querySelectorAll('video').forEach(v => {
            allVideos.push(v);
            v.addEventListener('play', () => pauseOtherVideos(v));
        });
        
        // Create navigation zones
        createClickZones();
        
        // Button events
        playButtons.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentHighlightIndex = i;
                openLightbox(i);
            });
        });
        
        // Lightbox controls
        prevBtn.addEventListener('click', () => navigate(-1));
        nextBtn.addEventListener('click', () => navigate(1));
        closeBtn.addEventListener('click', closeLightbox);
    };

    // Open/close
    const openLightbox = (index) => {
        loadVideo(index);
        document.body.classList.add('lightbox-active');
        lightbox.classList.add('active');
    };

    const closeLightbox = () => {
        lightboxVideo.pause();
        document.body.classList.remove('lightbox-active');
        lightbox.classList.remove('active');
    };

    // Start
    init();
});
