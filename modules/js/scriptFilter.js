import { main } from '../main.js';
import { pokemons } from '../js/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('filter-toggle');
  const filterBox = document.getElementById('filter-box');
  const buttons = filterBox.querySelectorAll('.type-btn');

  let tiposSelecionados = [];

  main(pokemons);

  // alterna a visibilidade da caixa de filtro
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // impede fechamento imediato
    filterBox.classList.toggle('hidden');
  });

  // fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!filterBox.contains(e.target) && e.target !== toggle) {
      filterBox.classList.add('hidden');
    }
  });

  // seleção dos tipos
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // impede que clique feche o menu

      const tipo = btn.dataset.type.toLowerCase();
      btn.classList.toggle('active');

      if (tiposSelecionados.includes(tipo)) {
        tiposSelecionados = tiposSelecionados.filter(t => t !== tipo);
      } else {
        tiposSelecionados.push(tipo);
      }

      console.log('Selecionados:', tiposSelecionados);

      if (tiposSelecionados.length === 0) {
        main(pokemons);
        return;
      }

      const filtrados = pokemons.filter(pokemon => {
        const tiposDoPokemon = pokemon.types.map(t => t.type.name.toLowerCase());
        return tiposSelecionados.every(tipo => tiposDoPokemon.includes(tipo));
      });

      main(filtrados);

      
    });
  });
});


