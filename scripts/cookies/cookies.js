const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json()); // Enable JSON parsing

// Handle tracking data
app.post("/track", (req, res) => {
    console.log("Received tracking data:", req.body);
    res.json({ status: "success", received: req.body });
});

// Start server on port 3000
app.listen(3000, () => console.log("✅ Tracking Server Running on http://localhost:3000"));

