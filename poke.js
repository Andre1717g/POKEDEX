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
          
          default:
            return '#68A090'; 
        }
      }

      
  
    function showDetails(pokemonData) {
      detailsCard.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: ${pokemonData.height / 10} m</p>
        <p>Peso: ${pokemonData.weight / 10} kg</p>
        
      `;

  detailsCard.innerHTML = `
    <div class="card">
      <div class="card-body">
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
        <div class="tab-content" id="pokemonTabContent">
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
                <div class="progress-bar" role="progressbar" style="width: ${stat.base_stat}%;" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            `).join('')}
          </div>
          <div class="tab-pane fade" id="evolutionCollapse" role="tabpanel" aria-labelledby="evolutionTab">
            <p class="card-text">Evolución: ... <!-- Agrega información sobre la evolución aquí --></p>
          </div>
          <div class="tab-pane fade" id="movesCollapse" role="tabpanel" aria-labelledby="movesTab">
            <p class="card-text">Movimientos: ... <!-- Agrega información sobre los movimientos aquí --></p>
          </div>
        </div>
      </div>
    </div>
  `;
  
      detailsOverlay.style.display = 'flex';

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
          } else if (selectedValue === 'type') {
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

      searchButton.addEventListener('click', () => {
      const pokemonName = searchInput.value.toLowerCase();
        fetchPokemonData(pokemonName)
        .then(pokemonData => {
        pokedexContainer.innerHTML = '';
        createPokemonCard(pokemonData);
        })
        .catch(error => {
        console.error('Error al buscar el Pokémon:', error);
        });
    });
  

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
  