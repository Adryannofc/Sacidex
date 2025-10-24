import { createPokemonCard } from "./js/ui.js";
import { pokemons } from "./js/data.js";

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");

async function main(lista) {
  // limpa o container antes de recriar
  container.innerHTML = "";

  for (const item of lista) {
    const card = createPokemonCard(item); // cria o elemento
    container.appendChild(card);          // adiciona aqui
  }

}

// mostra todos
main(pokemons);

// busca dinâmica
campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(texto));
  main(filtrados);
});

// LocalStorage para favoritos
  const favoritos = pokemons.filter(p => p.favorite);
  const storageFavoritos = JSON.stringify(favoritos);
  localStorage.setItem("favoritos", storageFavoritos);

// botão de favoritos
favoriteButton.addEventListener("click", () => {
  const getFavoritos = localStorage.getItem("favoritos");
  const parseFavoritos = JSON.parse(getFavoritos);
  main(parseFavoritos);
});
