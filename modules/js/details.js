import { pokemons } from './data.js'; 

/**
 * Mapa de cores de fundo por tipo de Pokemon
 */
const typeColors = {
    fire: ['#f08030', '#f5ac78'],
    water: ['#6890f0', '#9db7f5'],
    grass: ['#78c850', '#a7db8d'],
    electric: ['#f8d030', '#fae078'],
    psychic: ['#f85888', '#fa92b2'],
    ice: ['#98d8d8', '#bce6e6'],
    dragon: ['#7038f8', '#a27dfa'],
    dark: ['#705848', '#a29288'],
    fairy: ['#ee99ac', '#f4bdc9'],
    normal: ['#a8a878', '#c6c6a7'],
    fighting: ['#c03028', '#d67873'],
    flying: ['#a890f0', '#c6b7f5'],
    poison: ['#a040a0', '#c183c1'],
    ground: ['#e0c068', '#ebd69d'],
    rock: ['#b8a038', '#d1c17d'],
    bug: ['#a8b820', '#c6d16e'],
    ghost: ['#705898', '#a292bc'],
    steel: ['#b8b8d0', '#d1d1e0']
};

/**
 * Tabela de fraquezas por tipo
 */
const typeWeaknesses = {
    fire: ['water', 'ground', 'rock'],
    water: ['electric', 'grass'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    electric: ['ground'],
    psychic: ['bug', 'ghost', 'dark'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    dragon: ['ice', 'dragon', 'fairy'],
    dark: ['fighting', 'bug', 'fairy'],
    fairy: ['poison', 'steel'],
    normal: ['fighting'],
    fighting: ['flying', 'psychic', 'fairy'],
    flying: ['electric', 'ice', 'rock'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'grass', 'ice'],
    rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
    bug: ['fire', 'flying', 'rock'],
    ghost: ['ghost', 'dark'],
    steel: ['fire', 'fighting', 'ground']
};

/**
 * Função principal para carregar os detalhes
 */
function loadDetail() {
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id');

    if (!pokemonId) {
        console.error("ID do Pokémon não encontrado na URL.");
        document.querySelector('.sobrepokemon p').textContent = "Erro: ID do Pokémon não encontrado na URL.";
        return;
    }

    const pokemon = pokemons.find(p => p.id == pokemonId);

    if (!pokemon) {
        console.error("Pokémon não encontrado no array 'data.js'.");
        document.querySelector('.sobrepokemon p').textContent = `Erro: Pokémon com ID ${pokemonId} não foi encontrado.`;
        return;
    }

    fillPageWithPokemonData(pokemon);
    setupTabs();
}

/**
 * Esta função preenche seu HTML usando os dados do Pokémon
 */
function fillPageWithPokemonData(pokemon) {
    // Aplica cor de fundo baseada no tipo primário
    const primaryType = pokemon.types[0].type.name;
    applyBackgroundColor(primaryType);
    
    // Pokemon ID
    document.querySelector('.pokemon-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    // Pokemon image
    const imgElement = document.querySelector('.pokeimg img');
    imgElement.src = pokemon.sprites.other["official-artwork"].front_default;
    imgElement.alt = pokemon.name;

    // Description
    document.querySelector('.sobrepokemon p').textContent = pokemon.description;

    // Gender rate
    document.querySelector('.progress-fill-male').style.width = `${pokemon.genderRateMale}%`;
    document.querySelector('.progress-text').textContent = `${pokemon.genderRateMale}% / ${100 - pokemon.genderRateMale}%`;

    // Catch rate
    document.querySelector('.progress-fill-catch').style.width = `${pokemon.catchRate}%`;
    document.querySelector('.catchrate-text').textContent = `${pokemon.catchRate}%`;
    
    // Types
    const typesContainer = document.querySelector('#TypesIMG');
    typesContainer.innerHTML = "";
    
    pokemon.types.forEach(typeInfo => {
        const typeName = typeInfo.type.name;
        const typeSpan = document.createElement('span');
        typeSpan.textContent = typeName;
        typeSpan.className = `type ${typeName}`;
        typesContainer.appendChild(typeSpan);
    });

    // Weaknesses
    const weaknessContainer = document.querySelector('#WeaknessesIMG');
    weaknessContainer.innerHTML = "";
    
    const weaknesses = getWeaknesses(pokemon.types);
    weaknesses.forEach(weakness => {
        const weakSpan = document.createElement('span');
        weakSpan.textContent = weakness;
        weakSpan.className = `type ${weakness}`;
        weaknessContainer.appendChild(weakSpan);
    });

    // Weight and Height (mock data - you can add these to data.js)
    document.querySelector('.pokemon-weight').textContent = `${(pokemon.id * 10 + 50) / 10}kg`;
    document.querySelector('.pokemon-height').textContent = `${(pokemon.id * 5 + 100) / 100}m`;
}

/**
 * Aplica cor de fundo baseada no tipo do Pokemon
 */
function applyBackgroundColor(type) {
    const colors = typeColors[type] || ['#eb7c44', '#f5ac78'];
    document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
}

/**
 * Obtém as fraquezas baseadas nos tipos do Pokemon
 */
function getWeaknesses(types) {
    const weaknessSet = new Set();
    
    types.forEach(typeInfo => {
        const typeName = typeInfo.type.name;
        const weaknesses = typeWeaknesses[typeName] || [];
        weaknesses.forEach(w => weaknessSet.add(w));
    });
    
    return Array.from(weaknessSet).slice(0, 3); // Limita a 3 fraquezas principais
}

/**
 * Configura as abas
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona active ao clicado
            button.classList.add('active');
            const tabName = button.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

/**
 * Navegação entre Pokemon
 */
window.navigatePokemon = function(direction) {
    const params = new URLSearchParams(window.location.search);
    const currentId = parseInt(params.get('id'));
    
    const currentIndex = pokemons.findIndex(p => p.id === currentId);
    let newIndex;
    
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : pokemons.length - 1;
    } else {
        newIndex = currentIndex < pokemons.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newPokemonId = pokemons[newIndex].id;
    window.location.href = `pokemon.html?id=${newPokemonId}`;
}

// Roda o script assim que a página carrega
loadDetail();