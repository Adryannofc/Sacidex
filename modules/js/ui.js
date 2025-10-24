export function createPokemonCard(pokemon) {
    const card = document.createElement('a'); 
    card.classList.add('card');
    
    // 2. Defina o destino do link para a página de detalhes
    // O caminho é relativo de 'modules/index.html' para 'modules/pages/pokemon.html'
    card.href = `pages/pokemon.html?id=${pokemon.id}`;

    card.style.textDecoration = 'none'; // Remove sublinhado
    card.style.color = 'inherit';     // Usa a cor do texto normal do card

    const header = document.createElement('div');
    header.classList.add('card-header');

    const id = document.createElement('span');
    id.classList.add('card-id');
    id.textContent = `#${pokemon.id.toString().padStart(4, '0')}`

    const name = document.createElement('h2');
    name.classList.add('card-name');
    name.textContent = pokemon.name;

    const types = document.createElement('div');
    types.classList.add('card-types');
    pokemon.types.forEach(t => {
        const type = document.createElement('span');
        type.classList.add("type", t.type.name);
        type.textContent = t.type.name;
        types.appendChild(type);
    });

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image');

    const image = document.createElement('img');
    image.src = pokemon.sprites.other["official-artwork"].front_default;
    image.alt = pokemon.name
    imageContainer.appendChild(image);

    header.appendChild(name)
    header.appendChild(id);

    card.appendChild(header);
    card.appendChild(imageContainer);
    card.appendChild(types);

    return card;
}

export function createDeatailCard(pokemon) {
    const container = document.querySelector('.pokemon-id');
    container.textContent = `#${pokemon.id.toString().padStart(4, '0')}`;
}
