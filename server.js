const express = require("express"); 
const app = express(); 
const path = require("path"); 
const port = 3000; 
const { Resend } = require('resend'); 
require('dotenv').config(); 
const resend = new Resend(process.env.RESEND_API_KEY);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données URL-encoded

// Gestion de route pour la page d'accueil "/"
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); 
});

// Route pour afficher les personnages
app.get("/character", async (req, res) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json(); 
    res.json(data); 
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données" }); 
  }
});

// Gestion de route pour "/character/:id"
app.get("/character/:id", async (req, res) => {
  const id = req.params.id; 
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json(); 
    res.json(data); 
  } catch (error) {
    console.error("Erreur lors de la récupération des données du personnage :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données du personnage" }); 
  }
});

// Gestion de route pour "/send-mail"
app.post("/send-mail", async (req, res) => { 
  const { email, subject, message } = req.body; 
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['richard.lam@eemi.com'],
      email: email,
      subject: subject, 
      html: message,
    });

    if (error) {
      console.error({ error });
      return res.status(500).send('Erreur lors de l\'envoi de l\'email'); 
    }

    res.send('Email envoyé !'); 
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email'); 
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`); 
});
