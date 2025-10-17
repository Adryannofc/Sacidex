import { getPokemon } from "./js/api.js";
import { createPokemonCard } from "./js/ui.js"

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

async function main() {
    for(const item of pokemons){
        createPokemonCard(item);
    }
}

main();