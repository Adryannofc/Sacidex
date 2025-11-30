export const pokemons = [];
let currentPage = 0;
const PAGE_SIZE = 20 ;
const MAX_POKEMON = 1025;

export async function loadPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const pokemon = await response.json();
        pokemons.push(pokemon);
        document.dispatchEvent(new CustomEvent('pokemonAdded', { detail: pokemon }));
        return pokemon;
    } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
        return null;
    }
}

export async function loadNextBatch() {
    const start = currentPage * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, MAX_POKEMON);
    const promises = [];
    for (let id = start; id <= end; id++) {
        promises.push(loadPokemon(id));
    }
    currentPage++;
    const results = await Promise.all(promises);
    return results.filter(Boolean); // retorna apenas os carregados
}

export function hasMorePokemon() {
    return pokemons.length < MAX_POKEMON;
}

export function resetPokemonPagination() {
    pokemons.length = 0;
    currentPage = 0;
}

let allPokemonList = null;

// Armazena a lista completa de nomes de pokémons
export async function getAllPokemonList() {
  if (allPokemonList) return allPokemonList;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
    if (!res.ok) return []; // Retorna lista vazia em caso de erro
    const json = await res.json();
    allPokemonList = (json.results || []).map((r) => r.name);
    return allPokemonList;
  } catch (err) {
    console.error("Erro ao buscar lista de pokémons:", err);
    return [];
  }
}