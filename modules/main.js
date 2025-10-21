import { getPokemon } from "./js/api.js";
import { createPokemonCard } from "./js/ui.js";

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

const campoBusca = document.getElementById("busca");
const container = document.getElementById("cards");

async function main(lista = pokemons) {
  // limpa o container antes de recriar
  container.innerHTML = "";

  for (const item of lista) {
    const card = createPokemonCard(item); // cria o elemento
    container.appendChild(card);          // adiciona aqui
  }
}


// mostra todos
main();

// busca dinâmica
campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(texto));
  main(filtrados);
});
