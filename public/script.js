document.addEventListener('DOMContentLoaded', () => {
  const charactersListContainer = document.getElementById('charactersList');

  // Récupérer la liste des personnages depuis le serveur
  fetch('/character')
    .then(response => response.json())
    .then(data => {
      // Assurez-vous que data.results existe et est un tableau
      if (data.results && Array.isArray(data.results)) {
        // Afficher la liste des personnages dans l'interface utilisateur
        data.results.forEach(character => {
          const characterItem = document.createElement('div');
          characterItem.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Last Location: ${character.location.name}</p>
          `;
          charactersListContainer.appendChild(characterItem);
        });
      } else {
        console.error('Erreur : La structure de données retournée n\'est pas conforme.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la liste des personnages :', error);
      charactersListContainer.innerHTML = 'Erreur lors de la récupération de la liste des personnages.';
    });
    
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
