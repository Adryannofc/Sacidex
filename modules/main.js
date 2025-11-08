import { createPokemonCard } from "../modules/js/ui.js";
import { pokemons } from "../modules/js/api.js";

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
  localStorage.setItem("pageFavorite", "true");
  const getFavoritos = localStorage.getItem("favoritos");
  const parseFavoritos = JSON.parse(getFavoritos);
  main(parseFavoritos);

});


// verifica o tema atual do usuario
verificarTheme();
const headertheme = document.querySelector('header');
const iconimglogo = document.querySelector('.icon');
const logo = document.querySelector('.sacidex');

// botao do tema
toggleTheme.addEventListener("click", () => {
  const getTheme = localStorage.getItem('theme');
  const cardtheme = document.querySelectorAll('.card');
  const id = document.querySelectorAll('.card-id');
  const cardPokeboll = document.querySelectorAll('.card-favoriteButton.removeCapture');

  if (getTheme === "dark") {
    // claro
    document.body.classList.remove("dark");
    headertheme.classList.remove("dark-header");
    cardtheme.forEach(card => card.classList.remove("dark-card"));
    id.forEach(idcard => idcard.classList.remove("dark"));
    cardPokeboll.forEach(pokebollimg => {
      pokebollimg.classList.remove('dark');
    });
    toggleTheme.src = "/assets/img/moon-icon.png";
    iconimglogo.src = "/assets/img/pokebola-logo.png";
    logo.src = "/assets/img/logo-sacidex.png";
    localStorage.setItem("theme", "light");
  } else {
    // escuro
    document.body.classList.add("dark");
    headertheme.classList.add("dark-header")
    cardtheme.forEach(card => card.classList.add("dark-card"));
    id.forEach(idcard => idcard.classList.add("dark"));
    cardPokeboll.forEach(pokebollimg => {
      pokebollimg.classList.add('dark');
    });
    toggleTheme.src = "/assets/img/sunwhite.png";
    iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    logo.src = "/assets/img/logo-sacidex-branca.png";


    localStorage.setItem("theme", "dark");
  }
});

// funcao que verifica o tema salvo
function verificarTheme() {
  const getTheme = localStorage.getItem("theme");
  const headertheme = document.querySelector('header');
  const iconimglogo = document.querySelector('.icon')
  const cardtheme = document.querySelectorAll('.card');
  const logo = document.querySelector('.sacidex')
  const id = document.querySelectorAll('.card-id');
  const cardPokeboll = document.querySelectorAll('.card-favoriteButton.removeCapture');

  document.addEventListener("DOMContentLoaded", verificarTheme);


  if (getTheme === "dark") {
    document.body.classList.add("dark");
    headertheme.classList.add("dark-header")
    cardtheme.forEach(card => card.classList.add("dark-card"));
    id.forEach(idcard => idcard.classList.add("dark"));
    cardPokeboll.forEach(pokebollimg => {
      pokebollimg.classList.add('dark');
    });
    toggleTheme.src = "/assets/img/sun.png";
    toggleTheme.src = "/assets/img/sunwhite.png";
    iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    logo.src = "/assets/img/logo-sacidex-branca.png";
    

  } else {
    document.body.classList.remove("dark");
    headertheme.classList.remove("dark-header")
    id.forEach(idcard => idcard.classList.remove("dark"));
    cardPokeboll.forEach(pokebollimg => {
      pokebollimg.classList.remove('dark');
    });
    toggleTheme.src = "/assets/img/moon-icon.png";
    iconimglogo.src = "/assets/img/pokebola-logo.png";
    logo.src = "/assets/img/logo-sacidex.png";
  }

  localStorage.setItem("theme", tema);
}

function verificarTemaSalvo() {
  const tema = localStorage.getItem("theme") || "light";
  aplicarTema(tema);
}

toggleTheme.addEventListener("click", () => {
  const temaAtual = localStorage.getItem("theme");
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  aplicarTema(novoTema);
});

//===================//
//==== FUNÇÕES ======//
//===================//

export async function main(lista) {
  container.innerHTML = "";

  for (const item of lista) {
    const card = createPokemonCard(item); // cria o elemento
    container.appendChild(card);          // adiciona aqui
  }

}

// busca por localStorage 
function carregarBuscaSalva() {
  const storageBusca = localStorage.getItem("busca");

  if (storageBusca) {
    const campoBusca = storageBusca.toLowerCase();
    const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(campoBusca));
    localStorage.removeItem("busca");
    main(filtrados);
  } else {
    main(pokemons);
  };

};

// Verifica se veio da página de outra página para mostrar favoritos
function VerifcaroutraPage() {
  const storagePage = localStorage.getItem("page");

  if (storagePage === "outraPage") {
    const getFavoritos = localStorage.getItem("favoritos");
    const parseFavoritos = JSON.parse(getFavoritos);
    localStorage.setItem("pageFavorite", "true");
    localStorage.removeItem("page");
    main(parseFavoritos);
  };

};

function resetarFavoritePage() {
  localStorage.removeItem("pageFavorite");
  localStorage.removeItem("clickFavorite");
}

//===================//
//==== EVENTOS ======//
//===================//

campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(texto));
  main(filtrados);
});

favoriteButton.addEventListener("click", () => {
  localStorage.setItem("pageFavorite", "true");
  carregarFavoritos();
});

//===================//
//==== INICIALIZA ====//
//===================//

resetarFavoritePage();
verificarTemaSalvo();
carregarBuscaSalva();
VerifcaroutraPage();