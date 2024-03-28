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