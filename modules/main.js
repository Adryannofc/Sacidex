import { getPokemon } from "./js/api.js";
import { createPokemonCard } from "./js/ui.js";
import { createDeatailCard } from "./js/ui.js";

const pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    types: [
      { type: { name: "grass" } },
      { type: { name: "poison" } }
    ],
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
    name: "charmander",
    types: [
      { type: { name: "fire" } }
    ],
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
    name: "squirtle",
    types: [
      { type: { name: "water" } }
    ],
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
    name: "pikachu",
    types: [
      { type: { name: "electric" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        }
      }
    }
  },
  {
    id: 39,
    name: "jigglypuff",
    types: [
      { type: { name: "normal" } },
      { type: { name: "fairy" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"
        }
      }
    }
  },
  {
    id: 52,
    name: "meowth",
    types: [
      { type: { name: "normal" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"
        }
      }
    }
  },
  {
    id: 133,
    name: "eevee",
    types: [
      { type: { name: "normal" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
        }
      }
    }
  },
  {
    id: 37,
    name: "vulpix",
    types: [
      { type: { name: "fire" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
        }
      }
    }
  },
  {
    id: 92,
    name: "gastly",
    types: [
      { type: { name: "ghost" } },
      { type: { name: "poison" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png"
        }
      }
    }
  },
  {
    id: 150,
    name: "mewtwo",
    types: [
      { type: { name: "psychic" } }
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
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
