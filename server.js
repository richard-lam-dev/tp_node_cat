const express = require("express"); // Importe le module Express
const app = express(); // Crée une instance de l'application Express
const path = require("path"); // Importe le module path pour la gestion des chemins de fichiers
const port = 3000; // Définit le port sur lequel le serveur écoutera
const { Resend } = require('resend'); // Importe la classe Resend de la bibliothèque 'resend'
require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const resend = new Resend(process.env.RESEND_API_KEY); // Crée une nouvelle instance de Resend avec la clé API provenant des variables d'environnement

app.use(express.static('public')); // Configure Express pour servir les fichiers statiques du dossier "public"
app.use(express.json()); // Middleware pour traiter les données JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données URL-encoded

// Gestion de route pour la page d'accueil "/"
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Renvoie le fichier index.html situé dans le dossier racine du projet
});

// Route pour afficher les personnages
app.get("/character", async (req, res) => {
  try {
    // Effectue une requête vers l'API pour récupérer la liste des personnages
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json(); // Convertit la réponse en JSON
    res.json(data); // Renvoie les données au format JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données" }); // Renvoie une erreur 500 en cas d'échec
  }
});

// Gestion de route pour "/character/:id"
app.get("/character/:id", async (req, res) => {
  const id = req.params.id; // Récupère l'ID du personnage à partir de la requête
  try {
    // Effectue une requête vers l'API pour récupérer les détails d'un personnage spécifique en fonction de son ID
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json(); // Convertit la réponse en JSON
    res.json(data); // Renvoie les données du personnage au format JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des données du personnage :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données du personnage" }); // Renvoie une erreur 500 en cas d'échec
  }
});

// Gestion de route pour "/send-mail"
app.post("/send-mail", async (req, res) => { 
  const { subject, message } = req.body; // Récupère le sujet et le message du corps de la requête
  
  try {
    // Envoie un e-mail en utilisant la bibliothèque Resend avec les données du formulaire
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['richard.lam@eemi.com'],
      subject: subject, // Utilise le sujet récupéré du formulaire
      html: message, // Utilise le corps du message récupéré du formulaire
    });

    if (error) {
      console.error({ error });
      return res.status(500).send('Erreur lors de l\'envoi de l\'email'); // Renvoie une erreur 500 en cas d'échec
    }

    res.send('Email envoyé !'); // Renvoie une réponse indiquant que l'e-mail a été envoyé avec succès
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email'); // Renvoie une erreur 500 en cas d'échec
  }
});

// Démarre le serveur Express et écoute les connexions entrantes sur le port spécifié
app.listen(port, () => {
  console.log(`App listening on port ${port}`); // Affiche un message indiquant que le serveur a démarré avec succès
});
