import fetch from "node-fetch";
const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    // Fetching data from the API
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    // Sending the JSON as the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
