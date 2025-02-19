// Initialize storage and server configuration
const activityBuffer = JSON.parse(localStorage.getItem("activityBuffer")) || [];
const serverUrl = "https://peerapp.de/preview.html"; // Replace with actual server URL
const sendInterval = 5000; // Send data every 5 seconds
const maxBufferSize = 50; // Max events before sending immediately

// Function to track events and store in buffer
function trackEvent(eventType, eventData) {
    const activity = {
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString(),
        url: window.location.href,
    };
    activityBuffer.push(activity);
    localStorage.setItem("activityBuffer", JSON.stringify(activityBuffer));
    
    console.log("Tracked Event:", activity);

    if (activityBuffer.length >= maxBufferSize) {
        sendData();
    }
}

// Track clicks on elements with IDs
window.addEventListener("click", (event) => {
    if (event.target.id) {
        trackEvent("click", {
            x: event.clientX,
            y: event.clientY + window.scrollX, // Adjust for scrolling
            target: event.target.tagName,
            targetId: event.target.id,
        });
    }
});

// Track keyboard inputs
window.addEventListener("keydown", (event) => {
    trackEvent("keydown", { key: event.key });
});

// Track mouse movements (every 500ms to limit excessive logs)
let lastMouseMove = 0;
window.addEventListener("mousemove", (event) => {
    if (Date.now() - lastMouseMove > 500) {
        if (event.target.id) {
            trackEvent("mousemove", {
                x: event.clientX,
                y: event.clientY + window.scrollX,
                targetId: event.target.id,
            });
        }
        lastMouseMove = Date.now();
    }
});

// Track time spent on page
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
    let timeSpent = Date.now() - startTime;
    let totalTimeSpent = parseInt(localStorage.getItem("totalTimeSpent") || "0") + timeSpent;
    localStorage.setItem("totalTimeSpent", totalTimeSpent);
    console.log("Total time spent:", (totalTimeSpent / (1000 * 60)).toFixed(2), "minutes");
});

// Track section visits
let visitedSections = JSON.parse(localStorage.getItem("visitedSections") || "[]");
document.addEventListener("scroll", () => {
    document.querySelectorAll("section").forEach((section) => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (!visitedSections.includes(section.id)) {
                visitedSections.push(section.id);
                localStorage.setItem("visitedSections", JSON.stringify(visitedSections));
                console.log("Visited Sections Updated:", visitedSections);
            }
        }
    });
});

// Function to send buffered data to the server
function sendData() {
    if (activityBuffer.length > 0) {
        console.log ("Sending Data to Server:", activityBuffer);
        navigator.sendBeacon(serverUrl, JSON.stringify(activityBuffer));
        activityBuffer.length = 0; // Clear buffer
        localStorage.setItem("activityBuffer", JSON.stringify(activityBuffer));
    }
}

// Automatically send data every 5 seconds
setInterval(sendData, sendInterval);

