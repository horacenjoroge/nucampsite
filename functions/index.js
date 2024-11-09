const functions = require("firebase-functions");
const fetch = require("node-fetch"); // You'll need to install this dependency

// Cloud Function to get weather data
exports.getWeather = functions.https.onRequest(async (req, res) => {
  const apiKey = "d3f168d5513bd8145cf257eee7f1418c"; //
  const city = req.query.city || "Nairobi";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Return the weather data as a response
  } catch (error) {
    res.status(500).send("Error fetching weather data: " + error);
  }
});
