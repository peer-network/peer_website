document.addEventListener("scroll", () => {
    document.querySelectorAll(".boost, .boost-img, .withPeer, .boost-text").forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the element is visible
        const visiblePart = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
        const visibilityFactor = visiblePart / rect.height;

        // Set CSS variable for opacity & movement
        element.style.setProperty("--opacity-scale", visibilityFactor);
    });
});

















