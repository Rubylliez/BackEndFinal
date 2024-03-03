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

//animated search
let inputBox = document.querySelector(".input-box"),
        searchIcon = document.querySelector(".icon"),
        closeIcon = document.querySelector(".close-icon");

searchIcon.addEventListener("click", () => inputBox.classList.add("open"));
closeIcon.addEventListener("click", () => inputBox.classList.remove("open"));
