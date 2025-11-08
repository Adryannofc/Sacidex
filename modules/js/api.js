import { createPokemonCard } from "./ui.js";

export const pokemons = []; // ✅ lista global

const cardsContainer = document.getElementById("cards");
const QUANTIDADE = 500;

export async function loadPokemons() {
    for (let id = 1; id <= QUANTIDADE; id++) {
        await loadPokemon(id);
    }
}

export async function loadPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) return;

        const pokemon = await response.json();

        pokemons.push(pokemon); // ✅ salva no array global

        const card = createPokemonCard(pokemon);
        cardsContainer.appendChild(card);

    } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
    }
}

loadPokemons();
