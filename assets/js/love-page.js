// ===== LOVE PAGE DISPLAY =====

// Get page ID from URL
const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get('id');

if (!pageId) {
    document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Page non trouvée</h2><p>L\'identifiant de la page est manquant.</p><a href="index.html">Retour à l\'accueil</a></div>';
}

// Load page data
function loadPageData() {
    const pages = JSON.parse(localStorage.getItem('lovePages')) || [];
    const pageData = pages.find(p => p.id == pageId);
    
    if (!pageData) {
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Page non trouvée</h2><p>La page demandée n\'existe pas.</p><a href="index.html">Retour à l\'accueil</a></div>';
        return null;
    }
    
    return pageData;
}

const pageData = loadPageData();

if (pageData) {
    displayLovePage(pageData);
}

function displayLovePage(data) {
    // Update title and subtitle in hero
    document.getElementById('page-title').textContent = 'Notre histoire';
    document.title = `${data.clientName} - NOVACOEUR`;
    
    // Display client name in showcase section
    document.getElementById('client-display-name').textContent = `${data.clientName} ❤️`;
    
    // Display message
    document.getElementById('love-message').textContent = data.message;
    
    // Display offer badge
    const offerNames = {
        1: 'Éclat Simple',
        2: 'Émotion Complète',
        3: 'Infini Amoureux'
    };
    document.getElementById('offer-badge').textContent = `Offre ${data.offerType} - ${offerNames[data.offerType]}`;
    
    // Display photos
    if (data.photos && data.photos.length > 0) {
        displayPhotos(data.photos);
    }
    
    // Display videos
    if (data.videos && data.videos.length > 0) {
        document.getElementById('videos-section').style.display = 'block';
        displayVideos(data.videos);
    }
    
    // Display music
    if (data.music) {
        document.getElementById('music-section').style.display = 'block';
        displayMusic(data.music);
    }
}

// Display Photos
function displayPhotos(photos) {
    const gallery = document.getElementById('photos-gallery');
    gallery.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'gallery-item';
        photoItem.innerHTML = `
            <img src="${photo.data}" alt="Photo ${index + 1}" data-index="${index}">
        `;
        photoItem.addEventListener('click', () => openLightbox(index, photos));
        gallery.appendChild(photoItem);
    });
}

// Lightbox
let currentPhotoIndex = 0;
let currentPhotos = [];

function openLightbox(index, photos) {
    currentPhotoIndex = index;
    currentPhotos = photos;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = photos[index].data;
    lightbox.style.display = 'flex';
}

document.querySelector('.lightbox-premium-close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

document.querySelector('.lightbox-premium-prev').addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    document.getElementById('lightbox-img').src = currentPhotos[currentPhotoIndex].data;
});

document.querySelector('.lightbox-premium-next').addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    document.getElementById('lightbox-img').src = currentPhotos[currentPhotoIndex].data;
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.lightbox-prev').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.lightbox-next').click();
        } else if (e.key === 'Escape') {
            document.querySelector('.lightbox-close').click();
        }
    }
});

// Display Videos
function displayVideos(videos) {
    const container = document.getElementById('videos-container');
    container.innerHTML = '';
    
    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <video controls>
                <source src="${video.data}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <p>${video.name}</p>
        `;
        container.appendChild(videoItem);
    });
}

// Display Music
function displayMusic(music) {
    if (!music) return; // Exit if no music
    
    const audioElement = document.getElementById('background-music');
    const musicSection = document.getElementById('music-section');
    
    if (!audioElement || !musicSection) return;
    
    // Only support custom music uploads
    if (music.type === 'custom' && music.data) {
        audioElement.src = music.data;
        musicSection.style.display = 'block';
    } else {
        // Hide music section if no valid music data
        musicSection.style.display = 'none';
    }
}

// Add animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .message-box, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Share functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if share API is available
    if (navigator.share) {
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.style.display = 'block';
            shareBtn.addEventListener('click', async () => {
                try {
                    await navigator.share({
                        title: `${document.getElementById('client-display-name').textContent.replace(' \u2764\ufe0f', '')} - NOVACOEUR`,
                        text: 'Découvrez notre histoire d\'amour sur NOVACOEUR',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Partage annulé');
                }
            });
        }
    }
});
