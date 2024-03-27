const express = require("express");
const app = express();
const port = 3000;

// On récupère les données de l'API Rick and Morty pour les personnages
fetch("https://rickandmortyapi.com/api/character")
// On convertit les données en JSON
  .then((response) => response.json())
  // On récupère les données
  .then((data) => {
    console.log('affiche data', data)

    // Route pour récupérer tous les personnages
    app.get("/character", (req, res) => {
      // On envoie les données au format JSON
      res.json(data);
    });
  })
  // En cas d'erreur on affiche un message d'erreur dans la console du serveur
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
