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
    
    // Carrega dados adicionais para evoluções
    await loadEvolutionChain(pokemon.species.url);
    
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

    // 🆕 PREENCHE ABA STATUS
    fillStatusTab(pokemon.stats);

    // 🆕 PREENCHE ABA MOVES
    fillMovesTab(pokemon.moves);

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


/**
 * 🚀 Preenche aba de Status
 */
function fillStatusTab(stats) {
    const statusTab = document.getElementById('status-tab');
    
    const statsHTML = stats.map(stat => {
        const statName = stat.stat.name
            .replace('special-attack', 'Sp. Attack')
            .replace('special-defense', 'Sp. Defense')
            .replace('hp', 'HP')
            .replace('attack', 'Attack')
            .replace('defense', 'Defense')
            .replace('speed', 'Speed');
        
        const percentage = Math.min((stat.base_stat / 255) * 100, 100);
        
        return `
            <div class="stat-row">
                <div class="stat-name">${statName}</div>
                <div class="stat-value">${stat.base_stat}</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');

    statusTab.innerHTML = `
        <div class="stats-container">
            ${statsHTML}
        </div>
    `;
}


/**
 * 🚀 Preenche aba de Moves
 */
function fillMovesTab(moves) {
    const movesTab = document.getElementById('moves-tab');
    
    // Ordena moves por nível aprendido
    const sortedMoves = moves
        .filter(m => m.version_group_details[0])
        .sort((a, b) => {
            const levelA = a.version_group_details[0].level_learned_at;
            const levelB = b.version_group_details[0].level_learned_at;
            return levelA - levelB;
        });

    const movesHTML = sortedMoves.slice(0, 30).map(move => {
        const learnMethod = move.version_group_details[0].move_learn_method.name;
        const level = move.version_group_details[0].level_learned_at;
        
        let learnInfo = '';
        if (learnMethod === 'level-up' && level > 0) {
            learnInfo = `Nível ${level}`;
        } else if (learnMethod === 'machine') {
            learnInfo = 'TM/HM';
        } else if (learnMethod === 'egg') {
            learnInfo = 'Egg Move';
        } else if (learnMethod === 'tutor') {
            learnInfo = 'Tutor';
        } else {
            learnInfo = learnMethod;
        }

        return `
            <div class="move-item">
                <div class="move-name">${move.move.name.replace(/-/g, ' ')}</div>
                <div class="move-learn">${learnInfo}</div>
            </div>
        `;
    }).join('');

    movesTab.innerHTML = `
        <div class="moves-container">
            ${movesHTML}
        </div>
    `;
}


/**
 * 🚀 Carrega cadeia evolutiva
 */
async function loadEvolutionChain(speciesUrl) {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        
        await fillEvolutionsTab(evolutionData.chain);
    } catch (error) {
        console.error("Erro ao carregar evoluções:", error);
        document.getElementById('evolucoes-tab').innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <p style="color: #999;">Não foi possível carregar as evoluções.</p>
            </div>
        `;
    }
}


/**
 * 🚀 Preenche aba de Evoluções
 */
async function fillEvolutionsTab(chain) {
    const evolutions = [];
    
    // Função recursiva para extrair toda a cadeia
    function extractEvolutions(node) {
        const pokemonName = node.species.name;
        const pokemonId = node.species.url.split('/').filter(Boolean).pop();
        
        evolutions.push({ name: pokemonName, id: pokemonId });
        
        if (node.evolves_to.length > 0) {
            node.evolves_to.forEach(evo => extractEvolutions(evo));
        }
    }
    
    extractEvolutions(chain);
    
    // Busca imagens para cada evolução
    const evolutionsWithImages = await Promise.all(
        evolutions.map(async (evo) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.id}`);
                const data = await response.json();
                return {
                    ...evo,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types
                };
            } catch (error) {
                console.error(`Erro ao carregar ${evo.name}:`, error);
                return evo;
            }
        })
    );
    
    const evolutionsHTML = evolutionsWithImages.map((evo, index) => {
        const typesHTML = evo.types ? evo.types.map(t => 
            `<span class="type ${t.type.name}">${t.type.name}</span>`
        ).join('') : '';
        
        return `
            <div class="evolution-item">
                ${index > 0 ? '<div class="evolution-arrow">→</div>' : ''}
                <div class="evolution-card">
                    <img src="${evo.image}" alt="${evo.name}" class="evolution-img">
                    <div class="evolution-name">${evo.name}</div>
                    <div class="evolution-id">#${evo.id.padStart(4, '0')}</div>
                    <div class="evolution-types">${typesHTML}</div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('evolucoes-tab').innerHTML = `
        <div class="evolutions-container">
            ${evolutionsHTML}
        </div>
    `;
}


// 🚀 roda ao abrir
loadDetail();