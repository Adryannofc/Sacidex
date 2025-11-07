// coleta elementos do HTML
const botao = document.getElementById("botao");
const busca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");

/**
 * Fraquezas por tipo
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
 * 🚀 CARREGAR DETALHES DO POKEMON
 */
async function loadDetail() {

    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id');

    if (!pokemonId) {
        console.error("ID do Pokémon não encontrado.");
        return;
    }

    // ✅ BUSCA DIRETAMENTE NA API
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    const response = await fetch(url);
    const pokemon = await response.json();

    fillPageWithPokemonData(pokemon);
    setupTabs();
}


/**
 * 🚀 Preenche os dados da página de detalhes
 */
function fillPageWithPokemonData(pokemon) {

    const primaryType = pokemon.types[0].type.name;
    applyBackgroundColor(primaryType);

    // ID
    document.querySelector('.pokemon-id').textContent =
        `#${pokemon.id.toString().padStart(4, '0')}`;

    // IMAGEM
    const imgElement = document.querySelector('.pokeimg img');
    imgElement.src = pokemon.sprites.other["official-artwork"].front_default;
    imgElement.alt = pokemon.name;

    // TIPOS
    const typesContainer = document.querySelector('#TypesIMG');
    typesContainer.innerHTML = "";
    pokemon.types.forEach(t => {
        const span = document.createElement("span");
        span.textContent = t.type.name;
        span.className = `type ${t.type.name}`;
        typesContainer.appendChild(span);
    });

    // FRAQUEZAS
    const weaknessContainer = document.querySelector('#WeaknessesIMG');
    weaknessContainer.innerHTML = "";
    const weaknesses = getWeaknesses(pokemon.types);
    weaknesses.forEach(w => {
        const span = document.createElement("span");
        span.textContent = w;
        span.className = `type ${w}`;
        weaknessContainer.appendChild(span);
    });

    // PESO E ALTURA
    document.querySelector('.pokemon-weight').textContent = `${pokemon.weight / 10}kg`;
    document.querySelector('.pokemon-height').textContent = `${pokemon.height / 10}m`;

}


/**
 * 🚀 Aplica gradiente do tipo no background
 */
function applyBackgroundColor(type) {
    document.body.className = "";
    document.body.classList.add(`type-${type}`);
}


/**
 * 🚀 Calcula fraquezas
 */
function getWeaknesses(types) {
    const set = new Set();
    types.forEach(t => {
        const w = typeWeaknesses[t.type.name] || [];
        w.forEach(item => set.add(item));
    });
    return Array.from(set).slice(0, 3);
}


/**
 * 🚀 Tabs (status / sobre / movimentos)
 */
function setupTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tab = btn.dataset.tab;
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
}


/**
 * 🚀 Navegação entre pokemons
 */
window.navigatePokemon = function (direction) {
    const params = new URLSearchParams(window.location.search);
    const current = Number(params.get('id'));

    let next = direction === "prev" ? current - 1 : current + 1;

    if (next < 1) next = 151;
    if (next > 151) next = 1;

    window.location.href = `pokemon.html?id=${next}`;
};


// 🚀 roda ao abrir
loadDetail();

