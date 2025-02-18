document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".howItsWork");

    function handleScroll() {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3; // Adjust trigger point

        if (sectionPosition < screenPosition) {
            section.classList.add("show");
            window.removeEventListener("scroll", handleScroll); // Runs only once
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once in case it's already in view
});
