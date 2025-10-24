import { createDeatailCard } from "./ui.js"; // Importa a função de UI

const pokemons = [
    {
        id: 1,
        name: "Bulbasaur",
        types: [{ type: { name: "Grama" } }, { type: { name: "Venenoso" } }],
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                }
            }
        }
    },
    {
        id: 4,
        name: "Charmander",
        types: [{ type: { name: "Fogo" } }],
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                }
            }
        }
    },
    {
        id: 7,
        name: "Squirtle",
        types: [{ type: { name: "Água" } }],
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
                }
            }
        }
    },
    {
        id: 25,
        name: "Pikachu",
        types: [{ type: { name: "Elétrico" } }],
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                }
            }
        }
    }
];

function loadDetail() {
    // Escolhe um Pokémon do array para preencher a div ".pokemon-id"
    const pokemonDetail = pokemons[1]; 

    if (pokemonDetail) {
        createDeatailCard(pokemonDetail);
    } else {
        console.error("Pokémon não encontrado no índice especificado.");
    }
}

loadDetail();