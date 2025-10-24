import { createDeatailCard } from "./ui.js"; // Importa a função de UI
import { pokemons } from "./data.js";

function loadDetail() {
    // 3. Pega o ID da URL
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id'); // (Ex: "6")

    if (!pokemonId) {
        console.error("ID não encontrado na URL!");
        return;
    }

    // 4. Encontra o Pokémon no array importado
    const pokemon = pokemons.find(p => p.id == pokemonId);

    if (pokemon) {
        // Puxa funcao das informacoes do pokemon
    } else {
        console.error("Pokémon não encontrado no array!");
        document.body.innerHTML = "<h1>Pokémon não encontrado 😢</h1>";
    }
}
loadDetail();