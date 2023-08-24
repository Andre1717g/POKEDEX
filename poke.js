  const PokedexModule = (() => {
    const pokedexContainer = document.querySelector('.pokedex');
    const detailsOverlay = document.querySelector('.pokemon-details-overlay');
    const detailsCard = document.querySelector('.pokemon-details-card');
  
    function fetchPokemonData(pokemonId) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)  
        .then(response => response.json());
    }
  
    function createPokemonCard(pokemonData) {
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');
      pokemonCard.style.backgroundColor = getColorByType(pokemonData.types[0].type.name);
  
      const pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = pokemonData.sprites.front_default;
      
      const pokemonNumber = document.createElement('p');
      pokemonNumber.classList.add('pokemon-number');
      pokemonNumber.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
      
      const pokemonName = document.createElement('h2');
      pokemonName.textContent = pokemonData.name;
  
      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonNumber);
      pokemonCard.appendChild(pokemonName);
  
      pokemonCard.addEventListener('click', () => showDetails(pokemonData));
  
      pokedexContainer.appendChild(pokemonCard);
    }
    
    function getColorByType(type) {
        switch (type) {
          case 'grass':
            return '#78C850';
          case 'fire':
            return '#F08030';
          case 'water':
            return '#6890F0';
          case 'bug':
            return '#A8B820';
          case 'normal':
            return '#A8A878';
          case 'poison':
            return '#A040A0';
          case 'electric':
            return '#F8D030';
          case 'ground':
            return '#E0C068';
          case 'fairy':
            return '#EE99AC';
          // Add more cases for other types
          default:
            return '#68A090'; // Default color
        }
      }
  
    function showDetails(pokemonData) {
      detailsCard.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: ${pokemonData.height / 10} m</p>
        <p>Peso: ${pokemonData.weight / 10} kg</p>
        <!-- More details here -->
      `;
  
      detailsOverlay.style.display = 'flex';
    }

    
    function drawPokedex() {
      const pokemonDataArray = [];
  
      // Función para crear las tarjetas una vez se hayan obtenido los datos de todos los Pokémon
      function createCardsAfterFetch() {
        pokemonDataArray.sort((a, b) => a.id - b.id);
        pokemonDataArray.forEach(pokemonData => createPokemonCard(pokemonData));
      }
  
      for (let i = 1; i <= 150; i++) {
        fetchPokemonData(i)
          .then(pokemonData => {
            pokemonDataArray.push(pokemonData);
            if (pokemonDataArray.length === 150) {
              createCardsAfterFetch();
            }
          });
      }
    }
   
 

  return {
    drawPokedex: drawPokedex
  };
})();

PokedexModule.drawPokedex();
  