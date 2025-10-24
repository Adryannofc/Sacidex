import { createPokemonCard } from "./js/ui.js";
import { pokemons } from "./js/data.js";

const campoBusca = document.getElementById("busca");
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
