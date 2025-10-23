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
    // Vamos usar o Charmander, que está no índice 1 do array.
    const pokemonDetail = pokemons[1]; // Charmander (ID 4)

    if (pokemonDetail) {
        // Chama a função para preencher a div .pokemon-id com o ID do Charmander (#0004)
        createDeatailCard(pokemonDetail);
    } else {
        console.error("Pokémon não encontrado no índice especificado.");
    }
}

// Inicia o carregamento dos detalhes na página
loadDetail();