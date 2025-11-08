import { createPokemonCard } from "../modules/js/ui.js";
import { pokemons } from "../modules/js/api.js";

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");
const toggleTheme = document.getElementById("toggleTheme");
const headertheme = document.querySelector("header");
const iconimglogo = document.querySelector(".icon");
const logo = document.querySelector(".sacidex");

//===================//
//==== TEMAS ========//
//===================//

function aplicarTema(tema) {
  const isDark = tema === "dark";
  const cards = document.querySelectorAll(".card");
  const ids = document.querySelectorAll(".card-id");

  document.body.classList.toggle("dark", isDark);
  headertheme.classList.toggle("dark-header", isDark);
  cards.forEach(card => card.classList.toggle("dark-card", isDark));
  ids.forEach(id => id.classList.toggle("dark", isDark));

  if (isDark) {
    toggleTheme.src = "/assets/img/sunwhite.png";
    iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    logo.src = "/assets/img/logo-sacidex-branca.png";
  } else {
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
  lista.forEach(item => container.appendChild(createPokemonCard(item)));
}

function carregarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  main(favoritos);
}

function carregarBuscaSalva() {
  const termo = localStorage.getItem("busca");
  if (termo) {
    const filtrados = pokemons.filter(p =>
      p.name.toLowerCase().includes(termo.toLowerCase())
    );
    localStorage.removeItem("busca");
    main(filtrados);
  } else {
    main(pokemons);
  }
}

function carregarOutraPagina() {
  const veioDeOutra = localStorage.getItem("page") === "outraPage";
  if (veioDeOutra) {
    carregarFavoritos();
    localStorage.setItem("pageFavorite", "true");
    localStorage.removeItem("page");
  }
}

function resetarFavoritosTemporarios() {
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

resetarFavoritosTemporarios();
verificarTemaSalvo();
carregarBuscaSalva();
carregarOutraPagina();