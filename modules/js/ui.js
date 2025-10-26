export function createPokemonCard(pokemon) {
    // 1. Crie o elemento do card
    const card = document.createElement('div');
    card.classList.add('card');

    // 2. Defina o destino do link para a página de detalhes
    // O caminho é relativo de 'modules/index.html' para 'modules/pages/pokemon.html'
    card.addEventListener("click", () => {
        window.location.href = `pages/pokemon.html?id=${pokemon.id}`;
    });

    // Cria o botão dinamicamente
    const divButton = document.createElement('div');
    divButton.classList.add('button-favorite')



    const button = document.createElement("button");
    const imageButton = document.createElement("img")
    button.classList.add("card-favoriteButton");
    

    button.addEventListener('click', function (event) {
        // Impede o comportamento padrão do evento
        event.preventDefault();
    });


    // Define o que o botão faz ao clicar
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede que o clique no botão dispare o evento do card
        button.classList.toggle('active')
    });

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

    header.appendChild(divButton);
    divButton.appendChild(button);
    button.appendChild(imageButton);


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
