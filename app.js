import fetch from "node-fetch";
const express = require("express");
const app = express();
const port = 3000;

// Fetch a key api

const response = await fetch("https://rickandmortyapi.com/api");

const data = await response.json();

app.get("/", (req, res) => {
  res.json({ data });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
