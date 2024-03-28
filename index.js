// Fonction asynchrone pour récupérer les personnages depuis l'API
async function fetchCharacters() {
    const url = 'https://rickandmortyapi.com/api/character';
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