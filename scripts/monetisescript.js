const monetiseImage = document.querySelector(".monetise-img");
const monetiseText = document.querySelector(".monetise-text");
const withPeerr = document.querySelector(".withPeerr");

let lastScrollY = window.scrollY; // Store the initial scroll position

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // If scrolling down
    if (scrollY > lastScrollY) {
        // Moves image up smoothly and fades out
        monetiseImage.style.transform = `translate(-50%, ${-scrollY * 0.5}px)`; // Adjust multiplier if needed
        let opacityValue = Math.max(1 - scrollY / 300, 0); // Fade effect based on scroll position
        monetiseImage.style.opacity = opacityValue;
        monetiseText.style.opacity = opacityValue;
        withPeerr.style.opacity = opacityValue;
    } 
    // If scrolling up
    else {
        // Moves image back down smoothly and fades in
        monetiseImage.style.transform = `translate(-50%, ${-scrollY * 0.5}px)`; // Adjust multiplier if needed
        let opacityValue = Math.max(1 - scrollY / 300, 0); // Fade effect based on scroll position
        monetiseImage.style.opacity = opacityValue;
        monetiseText.style.opacity = opacityValue;
        withPeerr.style.opacity = opacityValue;
    }

    lastScrollY = scrollY; // Update last scroll position
});
