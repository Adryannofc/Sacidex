import { main } from '../main.js';

export function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.addEventListener("click", () => {
        window.location.href = `pages/pokemon.html?id=${pokemon.id}`;
    });

    // Cria o botão dinamicamente
    const divButton = document.createElement('div');
    divButton.classList.add('button-favorite')

    const button = document.createElement("button");
    const imageButton = document.createElement("img")
    button.classList.add("card-favoriteButton");
    button.addEventListener('click', (e) => {
        // Checa se o botão já está ativo
        const isActive = button.classList.contains('active');

        // Alterna a classe
        button.classList.toggle('active');

        // Só dispara partículas se ele **ficou ativo** agora
        if (!isActive) {
            // delay de 3 segundos antes das partículas
            setTimeout(() => {
                const numStars = 15;
                for (let i = 0; i < numStars; i++) {
                    const star = document.createElement('span');
                    star.classList.add('star');

                    // posição inicial


                    // direção aleatória para cima
                    const distance = 50 + Math.random() * 50;
                    const xDir = (Math.random() - 0.5) * distance * 2; // pode ir para esquerda (-) ou direita (+)
                    const yDir = -distance; // sempre sobe

                    star.style.setProperty('--x', `${xDir}px`);
                    star.style.setProperty('--y', `${yDir}px`);

                    button.appendChild(star);
                    setTimeout(() => {
                        star.remove();
                    }, 3000);
                }
            }, 3300); 
        }
    });
    button.addEventListener('click', function (event) {
        // Impede o comportamento padrão do evento
        event.preventDefault();
    });


    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede que o clique no botão dispare o evento do card

        const pageFavorite = localStorage.getItem("pageFavorite");
        if (pageFavorite === 'true') {
            localStorage.setItem("clickFavorite", 'true');
        }

        // Pega os favoritos salvos (ou cria um array vazio)
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Verifica se o Pokémon já está favoritado
        const index = favoritos.findIndex(p => p.id === pokemon.id);

        if (index >= 0) {
            // Se já estiver, remove (desfavorita)
            favoritos.splice(index, 1);
            button.classList.remove('active');
            button.classList.add('removeCapture');
        } else {
            // Se não estiver, adiciona
            favoritos.push(pokemon);
            button.classList.remove('removeCapture');
            button.classList.add('active');
        }

        // Salva de volta no localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        function verificarFavoritePage() {
            if (pageFavorite === 'true') {
                const getFavoritos = localStorage.getItem("favoritos");
                const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
                localStorage.removeItem("clickFavorite");
                main(favoritos);
            }
        }

        verificarFavoritePage();

    });

    // Retorna o css certo segundo o estado de favorito
    function verificarCaptura() {
        const favoritos = JSON.parse(localStorage.getItem("favoritos"));

        // Verifica se o Pokémon já está favoritado
        const index = favoritos.findIndex(p => p.id === pokemon.id);

        if (index >= 0) {
            button.classList.remove('removeCapture');
            button.classList.add('Capture');
        } else {
            button.classList.remove('Capture');
            button.classList.add('removeCapture');
        }
    }

    verificarCaptura();
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
