// 1. Importa o array de dados
// O caminho './data.js' está correto porque 'detail.js' e 'data.js'
// estão ambos na mesma pasta 'modules/js/'
import { pokemons } from './data.js'; 

/**
 * Função principal para carregar os detalhes
 */
function loadDetail() {
  // 2. Pega o ID da URL (ex: ?id=6)
  const params = new URLSearchParams(window.location.search);
  const pokemonId = params.get('id');

  if (!pokemonId) {
    console.error("ID do Pokémon não encontrado na URL.");
    // Se não achar o ID, mostra um erro
    document.querySelector('.sobrepokemon p').textContent = "Erro: ID do Pokémon não encontrado na URL.";
    return;
  }

  // 3. Encontra o Pokémon no array importado
  // (p.id == pokemonId) compara o número do data.js com o texto da URL
  const pokemon = pokemons.find(p => p.id == pokemonId);

  if (!pokemon) {
    console.error("Pokémon não encontrado no array 'data.js'.");
    // Se não achar o Pokémon com esse ID, mostra um erro
    document.querySelector('.sobrepokemon p').textContent = `Erro: Pokémon com ID ${pokemonId} não foi encontrado.`;
    return;
  }

  // 4. Se encontrou, preenche a página com os dados
  fillPageWithPokemonData(pokemon);
}

/**
 * Esta função preenche seu HTML usando os dados do Pokémon
 */
function fillPageWithPokemonData(pokemon) {
    
    // Alvo: .pokemon-id
    document.querySelector('.pokemon-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    // Alvo: .pokeimg img
    const imgElement = document.querySelector('.pokeimg img');
    imgElement.src = pokemon.sprites.other["official-artwork"].front_default;
    imgElement.alt = pokemon.name; // Usa o 'alt' da imagem

    // Alvo: .sobrepokemon p
    // (Substitui o "Carregando informações...")
    document.querySelector('.sobrepokemon p').textContent = pokemon.description;

    // Alvo: .progress-fill-male e .progress-text
    document.querySelector('.progress-fill-male').style.width = `${pokemon.genderRateMale}%`;
    document.querySelector('.progress-text').textContent = `${pokemon.genderRateMale}% / ${100 - pokemon.genderRateMale}%`;

    // Alvo: .progress-fill-catch e .catchrate-text
    document.querySelector('.progress-fill-catch').style.width = `${pokemon.catchRate}%`;
    document.querySelector('.catchrate-text').textContent = `${pokemon.catchRate}%`;
    
    // Alvo: #TypesIMG
    const typesContainer = document.querySelector('#TypesIMG');
    typesContainer.innerHTML = "<br>"; // Limpa o conteúdo estático
    
    pokemon.types.forEach(typeInfo => {
        const typeName = typeInfo.type.name;
        const typeSpan = document.createElement('span');
        typeSpan.textContent = typeName;
        
        // Usa as classes de tipo (ex: .type.fire) do seu 'style.css'
        typeSpan.className = `type ${typeName}`; 
        typeSpan.style.marginRight = '8px'; // Adiciona um espaço
        typesContainer.appendChild(typeSpan);
    });

    // Alvo: #WeaknessesIMG
    const weaknessContainer = document.querySelector('#WeaknessesIMG');
    weaknessContainer.innerHTML = "<br><p style='font-size:12px; font-weight:normal;'><i>(Fraquezas não definidas)</i></p>";
}

// Roda o script assim que a página carrega
loadDetail();