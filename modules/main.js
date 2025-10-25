import { createPokemonCard } from "./js/ui.js";
import { pokemons } from "./js/data.js";

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");

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

// função principal de criação dos cards
async function main(lista) {
  // limpa o container antes de recriar
  container.innerHTML = "";

  for (const item of lista) {
    const card = createPokemonCard(item); // cria o elemento
    container.appendChild(card);          // adiciona aqui
  }

}

// busca por localStorage
function buscaLocalStorage() {
const storageBusca = localStorage.getItem("busca");

  if(storageBusca) {
    const campoBusca = storageBusca.toLowerCase();
    const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(campoBusca));
    localStorage.removeItem("busca");
    main(filtrados);
  } else {
    main(pokemons);
  };

};

// Verifica se veio da página de outra página para mostrar favoritos
function outraPage() {  
 const storagePage = localStorage.getItem("page");

  if(storagePage === "outraPage") {
    const getFavoritos = localStorage.getItem("favoritos");
    const parseFavoritos = JSON.parse(getFavoritos);
    localStorage.removeItem("page");
    console.log(parseFavoritos);
    main(parseFavoritos);
  };
  
};

// mostra todos
main(pokemons);
buscaLocalStorage();
outraPage();
