const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const { Resend } = require('resend');
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.static('public')); // Permet de servir les fichiers statiques dans le dossier "public"
app.use(express.json()); // Middleware pour traiter les données JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données URL-encoded


// Fonction de gestion de route pour "/"
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

// Fonction de gestion de route pour "/character/:id"
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

// Fonction de gestion de route pour "/send-mail"
app.post("/send-mail", async (req, res) => {
  const { subject, message } = req.body; // Récupérez l'objet et le corps du message du formulaire
  console.log(subject); // Vérifiez le sujet récupéré du formulaire
  console.log(message); // Vér
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['richard.lam@eemi.com'],
      subject: subject, // Utilisez l'objet récupéré du formulaire
      html: message, // Utilisez le corps du message récupéré du formulaire
    });

    if (error) {
      console.error({ error });
      return res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }

    res.send('Email envoyé !')
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email');
  }
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
