//fullscreen video
function toggleFullScreen(video) {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item video');
    videoItems.forEach(video => {
        video.addEventListener('click', () => {
            toggleFullScreen(video);
        });
    });
});


//to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function () {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});