  const PokedexModule = (() => {
    const pokedexContainer = document.querySelector('.pokedex');
    const detailsOverlay = document.querySelector('.pokemon-details-overlay');
    const detailsCard = document.querySelector('.pokemon-details-card');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('pokemonSearchInput');
    
    
  
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
      pokemonImage.src = pokemonData.sprites.other.home.front_default;
      
      const pokemonNumber = document.createElement('p');
      pokemonNumber.classList.add('pokemon-number');
      pokemonNumber.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
      
      const pokemonName = document.createElement('h2');
      pokemonName.textContent = pokemonData.name;

      const typesContainer = document.createElement('div'); // Nuevo contenedor de tipos
  typesContainer.classList.add('types-container');

 ////// AQUI LO DE LOS TIPO EN LA TARJETA PRINCIPAL
  pokemonData.types.forEach(type => {
    const typeBadge = document.createElement('div');
    typeBadge.classList.add('type-badge');
    typeBadge.textContent = type.type.name;
    typeBadge.style.backgroundColor = getColorByType(type.type.name);
    typesContainer.appendChild(typeBadge);
  });



  
      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonNumber);
      pokemonCard.appendChild(pokemonName);
      /////
      pokemonCard.appendChild(typesContainer);
  
      pokemonCard.addEventListener('click', () => {
        showDetails(pokemonData);
        pokemonCard.classList.add('hidden-card'); // Ocultar la tarjeta principal
      });

      
    
      pokedexContainer.appendChild(pokemonCard);
    }
    
    function getColorByType(type) {
        switch (type) {
          case 'grass':
            return '#7AC74C';
          case 'fire':
            return '#E25822';
          case 'water':
            return '#6890F0';
          case 'bug':
            return '#A8B820';
          case 'normal':
            return '#A8A77A';
          case 'poison':
            return '#A040A0';
          case 'electric':
            return '#F8D030';
          case 'ground':
            return '#E0C068';
          case 'fairy':
            return '#EE99AC';
          case 'psychic':
            return '#F95587';
          case 'fighting':
          return '#FF0000';
          case 'steel':
            return '#B7B7CE';
          case 'dragon':
            return '#6F35FC';
          case 'ice':
            return '#96D9D6';
          case 'poison':
            return '#A33EA1';
          case 'ground':
            return '#E2BF65';
          case 'flying':
            return '#A98FF3';
          case 'rock':
            return '#B6A136';
          case 'ghost':
            return '#735797';
          case 'dark':
            return '#705746';
          
          
          default:
            return '#68A090'; 
        }
      }

      
  
     
      async function showDetails(pokemonData) {
      searchButton.style.display = 'none';

      const blurBackground = document.createElement('div');
      blurBackground.classList.add('blur-background');
      document.body.appendChild(blurBackground);


      

  // Mostrar detalles y superposición
  
  detailsCard.style.display = 'block';
  detailsOverlay.style.display = 'flex';
      detailsCard.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: ${pokemonData.height / 10} m</p>
        <p>Peso: ${pokemonData.weight / 10} kg</p>


        const movesByType = {};
        pokemonData.moves.forEach(move => {
          move.types.forEach(type => {
            if (!movesByType[type.type.name]) {
              movesByType[type.type.name] = [];
            }
            movesByType[type.type.name].push(move.move.name);
          });
        });


        
        
      `;

      

      function closeDetails() {
        // Restaurar elementos al cerrar los detalles
        searchButton.style.display = 'block';
      
        // Ocultar detalles y superposición
        detailsCard.style.display = 'none';
        detailsOverlay.style.display = 'none';

        const hiddenCard = document.querySelector('.hidden-card');
  if (hiddenCard) {
    hiddenCard.classList.remove('hidden-card');

    
  }
      }

      const evolutionHtml = await getEvolutionChainHTML(pokemonData.species.url);


      
      detailsCard.innerHTML = `
      <div class="card-container" style="max-height: 500px; overflow: hidden;">
        <div class="card" style="max-width: 400px; height: 100%;"" >
       
        <div class="card-footer" style="max-width: 400px; margin: 0 auto;" >
        <button class="btn btn-primary" id="backButton">Regresar ala Pokedex</button>
        </div>
          <div class="card-body " style="max-height: 500px; overflow: hidden;">
          
            <ul class="nav nav-tabs" id="pokemonTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="aboutTab" data-toggle="tab" href="#aboutCollapse" role="tab" aria-controls="aboutCollapse" aria-selected="true">About</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="statsTab" data-toggle="tab" href="#statsCollapse" role="tab" aria-controls="statsCollapse" aria-selected="false">Estadísticas Básicas</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="evolutionTab" data-toggle="tab" href="#evolutionCollapse" role="tab" aria-controls="evolutionCollapse" aria-selected="false">Evolución del Pokémon</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="movesTab" data-toggle="tab" href="#movesCollapse" role="tab" aria-controls="movesCollapse" aria-selected="false">Movimientos del Pokémon</a>
              </li>
            </ul>
            <div class="tab-content" id="pokemonTabContent" >
              <div class="tab-pane fade show active" id="aboutCollapse" role="tabpanel" aria-labelledby="aboutTab">
                <p class="card-text">Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                <p class="card-text">Altura: ${pokemonData.height / 10} m</p>
                <p class="card-text">Peso: ${pokemonData.weight / 10} kg</p>
                <p class="card-text">Especie: ${pokemonData.species.name}</p>
                <p class="card-text">Habilidades: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p class="card-text">Debilidades: ... <!-- Agrega las debilidades aquí --></p>
                <p class="card-text">Machos: ${getGenderCount(pokemonData, 'male')}</p>
                <p class="card-text">Hembras: ${getGenderCount(pokemonData, 'female')}</p>
              </div>
              <div class="tab-pane fade" id="statsCollapse" role="tabpanel" aria-labelledby="statsTab">
                <!-- Estadísticas en barras de progreso -->
                ${pokemonData.stats.map(stat => `
                  <p class="card-text">${stat.stat.name}: ${stat.base_stat}</p>
                  <div class="progress">
                    <div class="progress-bar ${stat.base_stat >= 50 ? 'bg-success' : 'bg-danger'}" role="progressbar" style="width: ${stat.base_stat}%;" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                `).join('')}
              </div>
    
    
              <div class="tab-pane fade" id="evolutionCollapse" role="tabpanel" aria-labelledby="evolutionTab">
          <div class="evolution-chain-container">
            <div class="evolution-chain">
              ${evolutionHtml}
            </div>
          </div>
        </div>
             
            
            
              <div class="tab-pane fade" id="movesCollapse" role="tabpanel" aria-labelledby="movesTab">
            <div class="moves-list-container">
              <ul class="moves-list">
                ${pokemonData.moves.map(move => `<li class="move">${move.move.name}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
              
              
              
              
              
    
              
              
              
              
              </div>
            </div>
          </div>
        </div>
        </div>
      `;

        
   ////////// funcion nuvea evolucion
async function getEvolutionChainHTML(speciesUrl) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesData = await speciesResponse.json();
  
  const evolutionChainUrl = speciesData.evolution_chain.url;
  const evolutionChainResponse = await fetch(evolutionChainUrl);
  const evolutionChainData = await evolutionChainResponse.json();

  return buildEvolutionHTML(evolutionChainData.chain);
}

function buildEvolutionHTML(evolutionData) {
  let html = '';
  while (evolutionData) {
    const pokemonSpecies = evolutionData.species;
    const spriteId = pokemonSpecies.url.split('/')[6];
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteId}.png`;

    html += `
      <div class="evolution-pokemon">
        <img src="${spriteUrl}" alt="${pokemonSpecies.name}" class="evolution-sprite">
        <p>${pokemonSpecies.name}</p>
      </div>
    `;

    if (evolutionData.evolves_to.length > 0) {
      html += '<div class="evolution-arrow">→</div>';
    }
    evolutionData = evolutionData.evolves_to[0];
  }
  return html;
}
  
detailsOverlay.style.display = 'flex';




//boton de regresooooooo
     const backButton = document.getElementById('backButton');
      backButton.addEventListener('click', () => {
  // Llamar a la función para cerrar los detalles
  closeDetails();
});


    const tabs = document.querySelectorAll('.nav-link');
          tabs.forEach(tab => {
          tab.addEventListener('click', (event) => {
          event.preventDefault();
    const targetId = event.target.getAttribute('href');
          tabs.forEach(otherTab => {
       
            otherTab.classList.remove('active');
          });
          tab.classList.add('active');
    const tabPanes = document.querySelectorAll('.tab-pane');
          tabPanes.forEach(pane => {
          pane.classList.remove('show', 'active');
          });
          document.querySelector(targetId).classList.add('show', 'active');
        });
    });

   
  
    }

    function getGenderCount(pokemonData, gender) {
      const genderData = pokemonData.gender_rate;
        if (genderData === -1) {
          return 'Sin género';
        } else {
      const malePercent = (genderData / 8) * 100;
      const femalePercent = 100 - malePercent;
          return gender === 'male' ? `${malePercent.toFixed(2)}%` : `${femalePercent.toFixed(2)}%`;
        }
      }
    
    function drawPokedex() {
      const pokemonDataArray = [];
      
      // Función para crear las tarjetas una vez se hayan obtenido los datos de todos los Pokémon
      function createCardsAfterFetch() {
        pokemonDataArray.sort((a, b) => a.id - b.id);
        pokemonDataArray.forEach(pokemonData => createPokemonCard(pokemonData));

        //Agregue esto para selecionar el orden por abecedario o por tipo
        const sortSelector = document.getElementById('sortSelector');
        sortSelector.addEventListener('change', () => {
        const selectedValue = sortSelector.value;
          
          if (selectedValue === 'name') {
            pokemonDataArray.sort((a, b) => a.name.localeCompare(b.name));
          } 
          else if (selectedValue === 'type') {
            pokemonDataArray.sort((a, b) => {
              const typeA = a.types[0].type.name;
              const typeB = b.types[0].type.name;
              return typeA.localeCompare(typeB);
            });
          } else {
            
            pokemonDataArray.sort((a, b) => a.id - b.id);
          }
      
          pokedexContainer.innerHTML = ''; // Limpiar el contenedor antes de ordenar
      
          pokemonDataArray.forEach(pokemonData => createPokemonCard(pokemonData));
        });

        const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
      
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

//********************************************************************************************************************************* */
    const errorMessagesContainer = document.getElementById('errorMessages');

//*************************************************************************************************************************************** */
searchButton.addEventListener('click', async () => {
  const userInput = searchInput.value.trim();
  errorMessagesContainer.textContent = ''; // Limpiar mensajes anteriores

  if (userInput === '') {
    displayErrorMessage('Por favor ingresa el nombre o número de un Pokémon.');
    return;
  }

  try {
    let pokemonData;
    if (/^\d{1,3}$/.test(userInput)) {
      const pokemonNumber = parseInt(userInput, 10);
      if (pokemonNumber >= 1 && pokemonNumber <= 150) {
        pokemonData = await fetchPokemonData(pokemonNumber);
        pokedexContainer.innerHTML = '';
        createPokemonCard(pokemonData);
      } else {
        throw new Error('Número de Pokémon fuera del rango permitido.');
      }
    } else {
      pokemonData = await fetchPokemonData(userInput.toLowerCase());
      pokedexContainer.innerHTML = '';
      createPokemonCard(pokemonData);
    }
    searchInput.value = ''; // Limpiar el input
  } catch (error) {
    console.error('Error al buscar el Pokémon:', error);
    if (error.message === 'Pokémon no encontrado' || error.message === 'Número de Pokémon fuera del rango permitido.') {
      displayErrorMessage('Pokémon no encontrado o número fuera de rango. Por favor, verifica la entrada.');
      searchInput.value = ''; // Limpiar el input
    }
  }
});

searchInput.addEventListener('keydown', async event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const userInput = searchInput.value.trim();
    errorMessagesContainer.textContent = ''; // Limpiar mensajes anteriores

    if (userInput === '') {
      displayErrorMessage('Por favor ingresa el nombre o número de un Pokémon.');
      return;
    }

    try {
      let pokemonData;
      if (/^\d{1,3}$/.test(userInput)) {
        const pokemonNumber = parseInt(userInput, 10);
        if (pokemonNumber >= 1 && pokemonNumber <= 150) {
          pokemonData = await fetchPokemonData(pokemonNumber);
          pokedexContainer.innerHTML = '';
          createPokemonCard(pokemonData);
        } else {
          throw new Error('Número de Pokémon fuera del rango permitido.');
        }
      } else {
        pokemonData = await fetchPokemonData(userInput.toLowerCase());
        pokedexContainer.innerHTML = '';
        createPokemonCard(pokemonData);
      }
      searchInput.value = ''; // Limpiar el input
    } catch (error) {
      console.error('Error al buscar el Pokémon:', error);
      if (error.message === 'Pokémon no encontrado' || error.message === 'Número de Pokémon fuera del rango permitido.') {
        displayErrorMessage('Pokémon no encontrado o número fuera de rango. Por favor, verifica la entrada.');
        searchInput.value = ''; // Limpiar el input
      }
    }
  }
});


function displayErrorMessage(message) {
  // Eliminar alerta anterior si existe
  const existingErrorMessage = errorMessagesContainer.querySelector('.error-message');
  if (existingErrorMessage) {
    existingErrorMessage.remove();
  }

  const errorMessageElement = document.createElement('span');
  errorMessageElement.classList.add('error-message', 'alert', 'alert-danger', 'alert-sm');
  errorMessageElement.textContent = message;
  errorMessagesContainer.appendChild(errorMessageElement);
}


//*************************************************************************************************************************************** */


    function fetchPokemonData(identifier) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`)
        .then(response => {
        if (!response.ok) {
        throw new Error('Pokémon no encontrado');
        }
        return response.json();
        });
    }



  return {
    drawPokedex: drawPokedex
  };
})();

PokedexModule.drawPokedex();
  