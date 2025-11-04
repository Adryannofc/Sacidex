import { createPokemonCard } from "./js/ui.js";
import { pokemons } from "./js/data.js";

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");
const toggleTheme = document.getElementById("toggleTheme");

// busca dinâmica
campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(texto));
  main(filtrados);
});

// botão de favoritos
favoriteButton.addEventListener("click", () => {
  localStorage.setItem("pageFavorite","true");
  const getFavoritos = localStorage.getItem("favoritos");
  const parseFavoritos = JSON.parse(getFavoritos);
  main(parseFavoritos);

});


// verifica o tema atual do usuario
verificarTheme();
const headertheme = document.querySelector('header');
const toggleThemeButton = document.querySelector('#toggleTheme')
const iconimglogo = document.querySelector('.icon')
const logo = document.querySelector('.sacidex')

// botao do tema
toggleTheme.addEventListener("click", () => {
  const getTheme = localStorage.getItem("theme");

  if (getTheme === "dark") {
    // claro
    document.body.classList.remove("dark");
    headertheme.classList.remove("dark-header")
    toggleTheme.src = "/assets/img/moon-icon.png";
    iconimglogo.src = "/assets/img/pokebola-logo.png";
    logo.src = "/assets/img/logo-sacidex.png";
    localStorage.setItem("theme", "light");
  } else {
    // escuro
    document.body.classList.add("dark");
    headertheme.classList.add("dark-header")
    toggleThemeButton.classList.add('dark-mode')
    toggleTheme.src = "/assets/img/sunwhite.png";
    iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    logo.src = "/assets/img/logo-sacidex-branca.png";
    localStorage.setItem("theme", "dark");
  }
});

// funcao que verifica o tema salvo
function verificarTheme() {
  const getTheme = localStorage.getItem("theme");

  if (getTheme === "dark") {
    document.body.classList.add("dark");
    toggleTheme.src = "/assets/img/sun.png";
  } else {
    document.body.classList.remove("dark");
    toggleTheme.src = "/assets/img/moon-icon.png";
    localStorage.setItem("theme", "light"); // garante o valor inicial
  }
}

// função principal de criação dos cards
export async function main(lista) {
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
    localStorage.setItem("pageFavorite", "true");
    localStorage.removeItem("page");
    main(parseFavoritos);
  };
  
};

function removeFavoritePage() {
localStorage.removeItem("pageFavorite");
localStorage.removeItem("clickFavorite");
}

//==== principais funcoes===== //

// reseta localStorage que indica que o usuario esta em favoritos
removeFavoritePage();
// cria os cards do catalogo e funcao geral para criar cards
main(pokemons);
// para interatividade da busca com outra página
buscaLocalStorage();
// Verifica se veio da página de outra página para mostrar favoritos 
outraPage();
