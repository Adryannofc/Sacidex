

export function createPokemonCard(pokemon) {
    // 1. Crie o elemento do card
    const card = document.createElement('div');
    card.classList.add('card');

    // 2. Defina o destino do link para a página de detalhes
    // O caminho é relativo de 'modules/index.html' para 'modules/pages/pokemon.html'
    card.addEventListener("click", () => {
        window.location.href = `pages/pokemon.html?id=${pokemon.id}`;
    });

    // 🔹 Cria o botão dinamicamente
    const divButton = document.createElement('div');
    divButton.classList.add('button-favorite')



    const button = document.createElement("button");
    const imageButton = document.createElement("img")
    button.classList.add("card-favoriteButton");


    //As seguintes linhas de código a seguir foram tiradas diretamente do CHAT GPT com fins de estilização da pagina
    button.addEventListener('click', (e) => {
        // Checa se o botão já está ativo
        const isActive = button.classList.contains('activec');
        button.classList.toggle('active');

        // Alterna a classe
        button.classList.toggle('activec');

        // Só dispara partículas se ele **ficou ativo** agora
        if (!isActive) {
            setTimeout(() => {
                const numStars = 20;
                for (let i = 0; i < numStars; i++) {
                    const star = document.createElement('span');
                    star.classList.add('star');



                    // direção aleatória para cima
                    const distance = 50 + Math.random() * 50;
                    const xDir = (Math.random() - 0.5) * distance * 2; // pode ir para esquerda (-) ou direita (+)
                    const yDir = -distance; // sempre sobe

                    star.style.setProperty('--x', `${xDir}px`);
                    star.style.setProperty('--y', `${yDir}px`);

                    button.appendChild(star);

                    // remove depois de 1s
                    setTimeout(() => {
                        star.remove();
                    }, 8000);
                }
            }, 3000); // delay 3 segundos
        }
    });

    // Ultima linha tirada do Chat gpt


  


    // 🔹 Define o que o botão faz ao clicar
    button.addEventListener("click", (event) => {
        console.log(3)
        event.stopPropagation(); 
        
        
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
