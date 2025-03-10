document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const clone = carousel.innerHTML;
    carousel.innerHTML += clone; // Duplicate content for infinite effect
});
