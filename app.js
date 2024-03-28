const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { Resend } = require('resend');
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

// On utilise cors pour autoriser les requêtes provenant d'autres domaines que celui du serveur 
app.use(cors());

// On récupère les données de l'API Rick and Morty pour les personnages
app.get("/character", (req, res) => {
    fetch("https://rickandmortyapi.com/api/character")
    // On convertit les données en JSON
    .then((response) => response.json())
    // On récupère les données
    .then((data) => {
        res.json(data);
    })
    // En cas d'erreur on affiche un message d'erreur dans la console du serveur
    .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
  });
})


  // Route pour récupérer un personnage par son id
app.get("/character/:id", (req, res) => {
  // On récupère l'id du personnage dans les paramètres de la requête et on le stocke dans une variable
  const id = req.params.id;
 // On récupère les données de l'API pour le personnage correspondant à l'id
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    // On convertit les données en JSON
    .then((response) => response.json())
    // On récupère les données
    .then((data) => {
      // On envoie les données au format JSON
      res.json(data);
    })
    // En cas d'erreur on affiche un message d'erreur dans la console du serveur
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}
);

// Route pour envoyer un mail
app.post("/send-mail", async (req, res) => {
  // On récupère les données du corps de la requête
  const { subject, html } = req.body;
  
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['richard.lam@eemi.com'],
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
    });
    
    // En cas d'erreur on affiche un message d'erreur dans la console du serveur
    if (error) {
      console.error({ error });
      return res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }
  
    // On envoie un message de confirmation si l'email a été envoyé
    res.send('Email envoyé !')
  });


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
