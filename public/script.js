document.addEventListener('DOMContentLoaded', () => {
  // Fonction asynchrone pour récupérer les personnages depuis l'API
  async function fetchCharacters() {
    const url = '/character';
    try {
        const response = await fetch(url); // Effectue une requête GET vers l'API
        const data = await response.json(); // Convertit la réponse en JSON
        displayCharacters(data.results); // Appelle la fonction pour afficher les personnages
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages:', error); // Gère les erreurs
    }
  }

  // Fonction pour afficher les personnages sur la page
  function displayCharacters(characters) {
    const container = document.getElementById('characterContainer'); // Sélectionne le conteneur des personnages
    container.innerHTML = ''; // Nettoie le contenu existant

    // Parcourt les personnages et les affiche par groupe de trois
    for (let i = 0; i < characters.length; i += 3) {
        // Crée une nouvelle ligne
        const row = document.createElement('div');
        row.classList.add('character-row');

        // Ajoute jusqu'à trois personnages à la ligne
        for (let j = i; j < i + 3 && j < characters.length; j++) {
            const character = characters[j];

            // Crée une div pour chaque personnage
            const characterWrapper = document.createElement('div');
            characterWrapper.classList.add('character-wrapper');

            // Crée une div pour le personnage et remplie avec les détails
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
            characterDiv.innerHTML = `
                <h2>${character.name}</h2>
                <img src='${character.image}' alt="${character.name}" style="width: 180px; height: auto;">
                <p>Statut: ${character.status}</p>
                <p>Espèce: ${character.species}</p>
            `;

            // Ajoute la div du personnage à la div parente
            characterWrapper.appendChild(characterDiv);

            // Ajoute la div parente à la ligne
            row.appendChild(characterWrapper);
        }

        // Ajoute la ligne au conteneur principal
        container.appendChild(row);
    }

    // Affiche chaque personnage individuellement
    characters.forEach(character => {
        const element = document.createElement('div');
        element.innerHTML = `
            <h2>${character.name}</h2>
            <img src='${character.image}' alt="${character.name}" style="width: 180px; height: auto;">
            <p>Statut: ${character.status}</p>
            <p>Espèce: ${character.species}</p>
         `;
        container.appendChild(element);
    });
  }

  // Appelle fetchCharacters au chargement de la page
  fetchCharacters();
    
  // Ajoute un gestionnaire d'événement pour le formulaire d'e-mail
  document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    
    const formData = new FormData(this); // Récupère les données du formulaire
    console.log(formData.get('subject')); // Affiche le sujet du message dans la console
    console.log(formData.get('message')); // Affiche le corps du message dans la console
    
    // Envoie les données du formulaire au serveur
    fetch("/send-mail", {
      method: "POST", // Utilise la méthode POST
      body: new URLSearchParams(formData) // Convertit les données du formulaire en format x-www-form-urlencoded
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Affiche la réponse du serveur dans la console
      alert(data); // Affiche un message à l'utilisateur
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi du formulaire :", error); // Gère les erreurs
      alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer."); // Affiche un message d'erreur à l'utilisateur
    });
  });    
});
