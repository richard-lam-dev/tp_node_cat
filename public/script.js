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

  function displayCharacters(characters) {
    const container = document.getElementById('characterContainer');
    container.innerHTML = ''; 

    for (let i = 0; i < characters.length; i += 3) {
  
        const row = document.createElement('div');
        row.classList.add('character-row');

        for (let j = i; j < i + 3 && j < characters.length; j++) {
            const character = characters[j];

            const characterWrapper = document.createElement('div');
            characterWrapper.classList.add('character-wrapper');

            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
            characterDiv.innerHTML = `
                <h2>${character.name}</h2>
                <img src='${character.image}' alt="${character.name}" style="width: 180px; height: auto;">
                <p>Statut: ${character.status}</p>
                <p>Espèce: ${character.species}</p>
            `;

            characterWrapper.appendChild(characterDiv);

            row.appendChild(characterWrapper);
        }

        container.appendChild(row);
    }
  }

  fetchCharacters();
    
  // Ajoute un gestionnaire d'événement pour le formulaire d'e-mail
  document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const formData = new FormData(this);
    
    // Envoie les données du formulaire au serveur
    fetch("/send-mail", {
      method: "POST", 
      body: new URLSearchParams(formData) 
    })
    .then(response => response.text())
    .then(data => {
      alert(data); 
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi du formulaire :", error); 
      alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
    });
  });    
});
