import { createPokemonCard } from "./js/ui.js";
import {
  pokemons,
  loadNextBatch,
  hasMorePokemon,
  resetPokemonPagination,
} from "./js/api.js";

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");
// botão de troca de tema (seleciona o botão que envolve a imagem, se existir)
const toggleThemeBtn = document.querySelector(".toggle-theme button");
const toggleThemeImg = document.getElementById("toggleTheme");

// busca dinâmica
campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(texto)
  );
  main(filtrados);
});

// botão de favoritos
favoriteButton.addEventListener("click", () => {
  localStorage.setItem("pageFavorite", "true");
  const getFavoritos = localStorage.getItem("favoritos");
  const parseFavoritos = JSON.parse(getFavoritos);
  main(parseFavoritos);
});

// tema: funções limpas e confiáveis
const headertheme = document.querySelector("header");
const iconimglogo = document.querySelector(".icon");
const logo = document.querySelector(".sacidex");
const filterLogo = document.getElementById("filter-toggle");

function aplicarTema(tema) {
  const cardtheme = document.querySelectorAll(".card");
  const idEls = document.querySelectorAll(".card-id");
  const cardPokeboll = document.querySelectorAll(
    ".card-favoriteButton.removeCapture"
  );

  if (tema === "dark") {
    document.body.classList.add("dark");
    headertheme && headertheme.classList.add("dark-header");
    cardtheme.forEach((card) => card.classList.add("dark-card"));
    idEls.forEach((el) => el.classList.add("dark"));
    cardPokeboll.forEach((p) => p.classList.add("dark"));
    if (toggleThemeImg) toggleThemeImg.src = "/assets/img/sunwhite.png";
    if (iconimglogo) iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    if (logo) logo.src = "/assets/img/logo-sacidex-branca.png";
    if (filterLogo) filterLogo.src = "/assets/img/darkFilter.png";
  } else {
    document.body.classList.remove("dark");
    headertheme && headertheme.classList.remove("dark-header");
    cardtheme.forEach((card) => card.classList.remove("dark-card"));
    idEls.forEach((el) => el.classList.remove("dark"));
    cardPokeboll.forEach((p) => p.classList.remove("dark"));
    if (toggleThemeImg) toggleThemeImg.src = "/assets/img/moon-icon.png";
    if (iconimglogo) iconimglogo.src = "/assets/img/pokebola-logo.png";
    if (logo) logo.src = "/assets/img/logo-sacidex.png";
  }

  localStorage.setItem("theme", tema);
}

(function () {
  const toggle = document.getElementById("menu-toggle");
  const header = document.querySelector(".header");
  if (toggle && header) {
    toggle.addEventListener("click", () =>
      header.classList.toggle("menu-open")
    );
    // fecha o menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !header.contains(e.target) &&
        header.classList.contains("menu-open")
      ) {
        header.classList.remove("menu-open");
      }
    });
  }
})();

// Move a barra de busca para fora do header no mobile
(function () {
  const MOBILE_QUERY = "(max-width: 768px)";
  const header = document.querySelector(".header-home");
  const search = header ? header.querySelector(".search") : null;
  const main = document.querySelector("main.card-container");
  if (!header || !search || !main) return;

  // Placeholder para restaurar a posição original no desktop
  const placeholder = document.createElement("div");
  placeholder.id = "search-original-slot";
  placeholder.style.display = "none";
  search.after(placeholder);

  const placeBelowHeader = () => {
    // insere a busca logo antes do main (entre header e cards)
    if (main.parentNode) {
      main.parentNode.insertBefore(search, main);
      search.classList.add("below-header");
    }
  };

  const restoreToHeader = () => {
    if (placeholder.parentNode) {
      placeholder.parentNode.insertBefore(search, placeholder);
      search.classList.remove("below-header");
    }
  };

  const mq = window.matchMedia(MOBILE_QUERY);
  const apply = (e) => (e.matches ? placeBelowHeader() : restoreToHeader());
  apply(mq);
  if (mq.addEventListener) mq.addEventListener("change", apply);
  else mq.addListener(apply);
})();

// Esconde o spinner quando todos os Pokémons forem carregados
document.addEventListener("pokemonsLoaded", () => {
  const overlay = document.getElementById("loading");
  if (overlay) overlay.classList.add("hide");
});

// Fallback: se algum erro impedir o evento, esconder após timeout razoável
setTimeout(() => {
  const overlay = document.getElementById("loading");
  if (overlay && !overlay.classList.contains("hide")) {
    overlay.classList.add("hide");
  }
}, 60000); // 60s

function verificarTemaSalvo() {
  const tema = localStorage.getItem("theme") || "light";
  aplicarTema(tema);
}

// adiciona listener ao botão que envolve o ícone; fallback para imagem
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    const atual = localStorage.getItem("theme") || "light";
    aplicarTema(atual === "dark" ? "light" : "dark");
  });
} else if (toggleThemeImg) {
  toggleThemeImg.addEventListener("click", () => {
    const atual = localStorage.getItem("theme") || "light";
    aplicarTema(atual === "dark" ? "light" : "dark");
  });
}

// Verifica e aplica tema ao carregar
document.addEventListener("DOMContentLoaded", verificarTemaSalvo);

//===================//
//==== FUNÇÕES ======//
//===================//

export async function main(lista) {
  container.innerHTML = "";

  for (const item of lista) {
    const card = createPokemonCard(item); // cria o elemento
    container.appendChild(card); // adiciona aqui
  }
}

function resetarFavoritePage() {
  localStorage.removeItem("pageFavorite");
  localStorage.removeItem("clickFavorite");
}

//===================//
//==== EVENTOS ======//
//===================//

campoBusca.addEventListener("input", () => {
  const texto = campoBusca.value.toLowerCase();
  const filtrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(texto)
  );
  main(filtrados);
});

favoriteButton.addEventListener("click", () => {
  localStorage.setItem("pageFavorite", "true");
  carregarFavoritos();
});

//===================//
//==== INFINITE SCROLL ====//
//===================//

const loader = document.getElementById("infinite-loader");
let loading = false;
export let activeTiposFilter = []; // Filtros de tipos ativos

export function setActiveTiposFilter(tipos) {
  activeTiposFilter = tipos;
}

export function getActiveTiposFilter() {
  return activeTiposFilter;
}

async function renderNextBatch() {
  if (loading || !hasMorePokemon()) return;
  loading = true;
  loader.classList.remove("hidden");

  let pokemonsToRender = [];

  // Continua carregando lotes até ter pokémons suficientes ou acabar
  while (pokemonsToRender.length < 20 && hasMorePokemon()) {
    const pokemonsBatch = await loadNextBatch();

    // Aplica filtro se houver tipos selecionados
    const filtered =
      activeTiposFilter.length === 0
        ? pokemonsBatch
        : pokemonsBatch.filter((pokemon) => {
          const tiposDoPokemon = pokemon.types.map((t) =>
            t.type.name.toLowerCase()
          );
          return activeTiposFilter.every((tipo) =>
            tiposDoPokemon.includes(tipo)
          );
        });

    pokemonsToRender.push(...filtered);

    // Se não há filtro ativo, não precisa continuar carregando
    if (activeTiposFilter.length === 0) break;
  }

  pokemonsToRender.forEach((pokemon) => {
    const card = createPokemonCard(pokemon);
    container.appendChild(card);
  });

  loader.classList.add("hidden");
  loading = false;

  // Se a página ainda não tem scroll e há mais pokémons, carrega mais
  setTimeout(() => {
    if (document.body.offsetHeight <= window.innerHeight && hasMorePokemon()) {
      renderNextBatch();
    }
  }, 100);
}

function onScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  const viewport = window.innerHeight;
  const fullHeight = document.body.offsetHeight;
  if (fullHeight - (scrollY + viewport) < 300) {
    renderNextBatch();
  }
}

function startInfiniteScroll() {
  resetarFavoritePage();
  verificarTemaSalvo();
  resetPokemonPagination();
  container.innerHTML = "";
  renderNextBatch();
  window.addEventListener("scroll", onScroll);
}

export function reloadWithFilters() {
  resetPokemonPagination();
  container.innerHTML = "";
  renderNextBatch();
  // Garante que o scroll listener está ativo
  window.removeEventListener("scroll", onScroll);
  window.addEventListener("scroll", onScroll);
}

document.addEventListener("DOMContentLoaded", startInfiniteScroll);
