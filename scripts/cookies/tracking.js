function sendAnalyticsData() {
    let totalTimeSpentMinutes = (parseInt(localStorage.getItem("totalTimeSpent") || "0") / (1000 * 60)).toFixed(2);
    
    let data = {
        visitorID: localStorage.getItem("visitorID") || "unknown",
        ip: localStorage.getItem("userIP") || "unknown",
        os: localStorage.getItem("os") || "unknown",
        browser: localStorage.getItem("browser") || "unknown",
        totalTimeSpent: totalTimeSpentMinutes,
        mouseMovements: JSON.parse(localStorage.getItem("mouseMovements") || "[]"),
        visitedSections: JSON.parse(localStorage.getItem("visitedSections") || "[]"),
        lastVisit: localStorage.getItem("lastVisit") || "First Visit"
    };

    
    localStorage.setItem("trackingData", JSON.stringify(data));
    console.log("Tracking Data Saved Locally:", data);
}

window.addEventListener("beforeunload", sendAnalyticsData);
