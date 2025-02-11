document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    
    gsap.fromTo(
        [".howItsWorkImg", ".howHaeder h2", ".howHaeder span"], 
        { opacity: 0, x: -100 }, 
        {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".howItsWork",
                start: "top 80%",  
                end: "top 20%",    
                scrub: true,       
                toggleActions: "play reverse play reverse" 
            }
        }
    );
});
