document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.querySelector(".cookie-banner");
    const acceptButton = document.querySelector(".cookie-banner button");

    if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.classList.remove("hidden");
    } else {
        startTracking(); 
    }

   
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.add("hidden");
        startTracking(); 
    });
});


function startTracking() {
    (async function() {
        
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function getCookie(name) {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function generateUUID() {
            return 'xxxx-xxxx-4xxx-yxxx-xxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        
        if (!localStorage.getItem("visitorID")) {
            localStorage.setItem("visitorID", generateUUID());
        }
        
        console.log("Visitor ID:", localStorage.getItem("visitorID"));
        

        
        async function getUserIP() {
            try {
                let response = await fetch("https://api64.ipify.org?format=json");
                let data = await response.json();
                localStorage.setItem("userIP", data.ip);
                console.log("IP Address:", data.ip);
            } catch (error) {
                console.error("Error fetching IP:", error);
                localStorage.setItem("userIP", "Unknown");
            }
        }
        getUserIP();
        
        let userIP = await getUserIP();
        console.log("IP Address:", userIP);

        
        function getUserDevice() {
            let userAgent = navigator.userAgent;
            let os = "Unknown OS";
        
            if (userAgent.includes("Win")) os = "Windows";
            if (userAgent.includes("Mac")) os = "MacOS";
            if (userAgent.includes("Linux")) os = "Linux";
            if (userAgent.includes("Android")) os = "Android";
            if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
        
            localStorage.setItem("os", os);
            localStorage.setItem("browser", userAgent);
        
            console.log("Device Info:", os, userAgent);
        }
        getUserDevice();
        

    

        
        let startTime = Date.now();
        let totalTimeSpent = parseInt(localStorage.getItem("totalTimeSpent") || "0");

        window.addEventListener("beforeunload", function() {
            let timeSpent = Date.now() - startTime;
            totalTimeSpent += timeSpent;
            localStorage.setItem("totalTimeSpent", totalTimeSpent);
            console.log("Total time spent:", (totalTimeSpent / (1000 * 60)).toFixed(2), "minutes");
        });

        
let sectionClicks = JSON.parse(localStorage.getItem("sectionClicks") || "{}");

document.addEventListener("click", function(event) {
    let clickedElement = event.target.closest("section"); 
    if (clickedElement && clickedElement.id) {
        let sectionID = clickedElement.id;
        
        
        sectionClicks[sectionID] = (sectionClicks[sectionID] || 0) + 1;
        
        
        localStorage.setItem("sectionClicks", JSON.stringify(sectionClicks));

        console.log(`Section Clicked: ${sectionID}, Total Clicks: ${sectionClicks[sectionID]}`);
    }
});

        console.log("Tracking mouse movement...");

        
        let visitedSections = [];

        document.addEventListener("scroll", function() {
            let sections = document.querySelectorAll("section");
            sections.forEach((section) => {
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

        console.log("Tracking sections of website...");

        
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
        

    })();
}

