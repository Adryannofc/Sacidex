/**
 * Busca os dados de um Pokémon na PokéAPI pelo seu nome ou ID.
 * 
 * @param {number|string} identifier - O nome (string) ou o ID (número) do Pokémon a ser buscado.
 * @returns {Promise<Object|null>} Uma promessa que resolve para o objeto de dados do Pokémon, ou null se ocorrer um erro ou o Pokémon não for encontrado.
 */
export async function getPokemon(identifier) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);

        if(!response.ok){
            throw new Error('Pokemon não encontrado');
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.error(error)
        return null
    }
}