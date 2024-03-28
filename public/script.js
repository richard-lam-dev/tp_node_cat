document.addEventListener('DOMContentLoaded', () => {
  // Fonction asynchrone pour récupérer les personnages depuis l'API
async function fetchCharacters() {
  const url = '/character';
  try {
      const response = await fetch(url);
      const data = await response.json();
      displayCharacters(data.results);
  } catch (error) {
      console.error('Erreur lors de la récupération des personnages:', error);
  }
}

// Fonction pour afficher les personnages sur la page
function displayCharacters(characters) {
  const container = document.getElementById('characterContainer');
  container.innerHTML = ''; // Nettoyer le contenu existant

  // Parcourir les personnages
  for (let i = 0; i < characters.length; i += 3) {
      // Créer une nouvelle ligne
      const row = document.createElement('div');
      row.classList.add('character-row');

      // Ajouter jusqu'à trois personnages à la ligne
      for (let j = i; j < i + 3 && j < characters.length; j++) {
          const character = characters[j];

          // Créer une div pour chaque personnage
          const characterWrapper = document.createElement('div');
          characterWrapper.classList.add('character-wrapper');

          // Créer une div pour le personnage et remplir avec les détails
          const characterDiv = document.createElement('div');
          characterDiv.classList.add('character');
          characterDiv.innerHTML = `
              <h2>${character.name}</h2>
              <img src='${character.image}' alt="${character.name}" style="width: 180px; height: auto;">
              <p>Statut: ${character.status}</p>
              <p>Espèce: ${character.species}</p>
          `;

          // Ajouter la div du personnage à la div parente
          characterWrapper.appendChild(characterDiv);

          // Ajouter la div parente à la ligne
          row.appendChild(characterWrapper);
      }

      // Ajouter la ligne au conteneur principal
      container.appendChild(row);
  }
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

// Appeler fetchCharacters au chargement de la page
fetchCharacters();
    
    document.getElementById("emailForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Empêche le formulaire de se soumettre normalement
      
      const formData = new FormData(this); // Récupère les données du formulaire
      console.log(formData.get('subject')); // Vérifiez le contenu du champ "subject"
      console.log(formData.get('message')); // 
      
      fetch("/send-mail", {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Affiche la réponse du serveur
        alert(data); // Affiche un message à l'utilisateur
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi du formulaire :", error);
        alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
      });
    });    
});
