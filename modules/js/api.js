import { createPokemonCard } from "./ui.js";

export const pokemons = []; // lista global

const QUANTIDADE = 500;

export async function loadPokemons() {
    for (let id = 1; id <= QUANTIDADE; id++) {
        await loadPokemon(id);
    }
    // sinaliza que o carregamento inicial terminou
    document.dispatchEvent(new Event('pokemonsLoaded'));
}

export async function loadPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) return;

        const pokemon = await response.json();

        pokemons.push(pokemon); // salva no array global
        // adiciona card à página somente se o container existir (aguarda DOM)
        const cardsContainer = document.getElementById("cards");
        if (cardsContainer) {
            const card = createPokemonCard(pokemon);
            cardsContainer.appendChild(card);
        }

        // notifica outras partes da aplicação que um Pokémon foi carregado
        document.dispatchEvent(new CustomEvent('pokemonAdded', { detail: pokemon }));

    } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
    }
}

// inicia o carregamento quando o DOM estiver pronto para evitar erro em containers nulos
document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
});

// quando todos carregarem, dispara evento (loadPokemons dispara internamente)
// Para isso alteramos loadPokemons para sinalizar fim
