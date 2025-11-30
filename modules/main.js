import { createPokemonCard } from "./js/ui.js";
import {
  pokemons,
  loadNextBatch,
  hasMorePokemon,
  resetPokemonPagination,
  loadPokemon,
  getAllPokemonList,
} from "./js/api.js";

//===================//
//==== DOM ELEMENTS ==//
//===================//

const campoBusca = document.getElementById("busca");
const favoriteButton = document.getElementById("favorite-btn");
const container = document.getElementById("cards");
const loader = document.getElementById("infinite-loader");
const toggleThemeBtn = document.querySelector(".toggle-theme button");
const toggleThemeImg = document.getElementById("toggleTheme");
const headertheme = document.querySelector("header");
const iconimglogo = document.querySelector(".icon");
const logo = document.querySelector(".sacidex");
const filterLogo = document.getElementById("filter-toggle");

//===================//
//==== STATE ========//
//===================//

let loading = false;
export let activeTiposFilter = [];

export function setActiveTiposFilter(tipos) {
  activeTiposFilter = tipos;
}

export function getActiveTiposFilter() {
  return activeTiposFilter;
}

//===================//
//==== THEME ========//
//===================//

function aplicarTema(tema) {
  const cardtheme = document.querySelectorAll(".card");
  const idEls = document.querySelectorAll(".card-id");
  const cardPokeboll = document.querySelectorAll(
    ".card-favoriteButton.removeCapture"
  );

  if (tema === "dark") {
    document.body.classList.add("dark");
    headertheme?.classList.add("dark-header");
    cardtheme.forEach((card) => card.classList.add("dark-card"));
    idEls.forEach((el) => el.classList.add("dark"));
    cardPokeboll.forEach((p) => p.classList.add("dark"));
    if (toggleThemeImg) toggleThemeImg.src = "/assets/img/sunwhite.png";
    if (iconimglogo) iconimglogo.src = "/assets/img/pokebola-logo-branca.png";
    if (logo) logo.src = "/assets/img/logo-sacidex-branca.png";
    if (filterLogo) filterLogo.src = "/assets/img/darkFilter.png";
  } else {
    document.body.classList.remove("dark");
    headertheme?.classList.remove("dark-header");
    cardtheme.forEach((card) => card.classList.remove("dark-card"));
    idEls.forEach((el) => el.classList.remove("dark"));
    cardPokeboll.forEach((p) => p.classList.remove("dark"));
    if (toggleThemeImg) toggleThemeImg.src = "/assets/img/moon-icon.png";
    if (iconimglogo) iconimglogo.src = "/assets/img/pokebola-logo.png";
    if (logo) logo.src = "/assets/img/logo-sacidex.png";
  }

  localStorage.setItem("theme", tema);
}

function verificarTemaSalvo() {
  const tema = localStorage.getItem("theme") || "light";
  aplicarTema(tema);
}

function setupThemeToggle() {
  const themeToggle = () => {
    const atual = localStorage.getItem("theme") || "light";
    aplicarTema(atual === "dark" ? "light" : "dark");
  };

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", themeToggle);
  } else if (toggleThemeImg) {
    toggleThemeImg.addEventListener("click", themeToggle);
  }
}

//===================//
//==== MENU MOBILE ===//
//===================//

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const header = document.querySelector("header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () =>
    header.classList.toggle("menu-open")
  );

  document.addEventListener("click", (e) => {
    if (
      !header.contains(e.target) &&
      header.classList.contains("menu-open")
    ) {
      header.classList.remove("menu-open");
    }
  });
}

//===================//
//==== SEARCH BAR ====//
//===================//

function setupSearchBarPosition() {
  const MOBILE_QUERY = "(max-width: 768px)";
  const header = document.querySelector(".header-home");
  const search = header?.querySelector(".search");
  const main = document.querySelector("main.card-container");
  
  if (!header || !search || !main) return;

  const placeholder = document.createElement("div");
  placeholder.id = "search-original-slot";
  placeholder.style.display = "none";
  search.after(placeholder);

  const placeBelowHeader = () => {
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
}

//===================//
//==== MAIN UI ======//
//===================//

export async function main(lista) {
  container.innerHTML = "";
  for (const item of lista) {
    const card = createPokemonCard(item);
    container.appendChild(card);
  }
}

function resetarFavoritePage() {
  localStorage.removeItem("pageFavorite");
  localStorage.removeItem("clickFavorite");
}

//===================//
//==== INFINITE SCROLL//
//===================//

async function renderNextBatch() {
  if (loading || !hasMorePokemon()) return;
  loading = true;
  loader.classList.remove("hidden");

  let pokemonsToRender = [];

  while (pokemonsToRender.length < 20 && hasMorePokemon()) {
    const pokemonsBatch = await loadNextBatch();

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

    if (activeTiposFilter.length === 0) break;
  }

  pokemonsToRender.forEach((pokemon) => {
    const card = createPokemonCard(pokemon);
    container.appendChild(card);
  });

  loader.classList.add("hidden");
  loading = false;

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
  loading = false;
  window.removeEventListener("scroll", onScroll);
  renderNextBatch();
  window.addEventListener("scroll", onScroll);
}

export function reloadWithFilters() {
  resetPokemonPagination();
  container.innerHTML = "";
  loading = false;
  window.removeEventListener("scroll", onScroll);
  renderNextBatch();
  window.addEventListener("scroll", onScroll);
}

//===================//
//==== SEARCH ======//
//===================//

function debounce(fn, wait = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

async function loadWithLimit(names, maxConcurrent = 5) {
  const results = [];
  for (let i = 0; i < names.length; i += maxConcurrent) {
    const batch = names.slice(i, i + maxConcurrent);
    const batchResults = await Promise.all(batch.map((n) => loadPokemon(n)));
    results.push(...batchResults);
  }
  return results.filter(Boolean);
}

const doSearch = debounce(async () => {
  const texto = campoBusca.value.toLowerCase().trim();

  if (!texto) {
    resetarFavoritePage();
    resetPokemonPagination();
    loading = false;
    container.innerHTML = "";
    window.removeEventListener("scroll", onScroll);

    setTimeout(() => {
      renderNextBatch();
      window.addEventListener("scroll", onScroll);
    }, 100);
    return;
  }

  loader.classList.remove("hidden");
  loader.innerHTML = "<p>Buscando...</p>";

  const names = await getAllPokemonList();
  const matchedNames = names.filter((name) => name.includes(texto));

  if (matchedNames.length === 0) {
    container.innerHTML = "";
    loader.innerHTML = "<p>Nenhum pokémon encontrado.</p>";
    loader.classList.add("hidden");
    return;
  }

  const MAX_REQUESTS = 30;
  const slice = matchedNames.slice(0, MAX_REQUESTS);
  const pokemonsEncontrados = await loadWithLimit(slice, 5);

  container.innerHTML = "";
  main(pokemonsEncontrados);

  loader.innerHTML = "";
  loader.classList.add("hidden");
}, 500);

function setupSearch() {
  campoBusca.removeEventListener("input", campoBusca.__searchHandler);
  campoBusca.__searchHandler = doSearch;
  campoBusca.addEventListener("input", doSearch);
}

//===================//
//==== FAVORITES ====//
//===================//

function setupFavoritesButton() {
  favoriteButton.addEventListener("click", () => {
    localStorage.setItem("pageFavorite", "true");
    // Assumindo que carregarFavoritos() existe
    if (typeof carregarFavoritos === "function") {
      carregarFavoritos();
    }
  });
}

//===================//
//==== INIT =========//
//===================//

function init() {
  setupThemeToggle();
  setupMobileMenu();
  setupSearchBarPosition();
  setupSearch();
  setupFavoritesButton();

  document.addEventListener("pokemonsLoaded", () => {
    const overlay = document.getElementById("loading");
    overlay?.classList.add("hide");
  });

  setTimeout(() => {
    const overlay = document.getElementById("loading");
    if (overlay && !overlay.classList.contains("hide")) {
      overlay.classList.add("hide");
    }
  }, 60000);
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  startInfiniteScroll();
});
