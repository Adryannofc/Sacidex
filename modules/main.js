import { getPokemon } from "./js/api.js";
import { createPokemonCard } from "./js/ui.js"

async function main() {
    const pokemon = await getPokemon(1) 
    console.log(pokemon);

    createPokemonCard(pokemon)
}

main();
