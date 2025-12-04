import { main } from '../main.js';

export function createPokemonCard(pokemon) {
    // Cria o elemento do card
    const card = document.createElement('div');
    card.classList.add('card');

    // Define o destino do link para a página de detalhes
    card.addEventListener("click", () => {
        window.location.href = `pages/pokemon.html?id=${pokemon.id}`;
    });

    // Cria o container do botão de favorito
    const divButton = document.createElement('div');
    divButton.classList.add('button-favorite');

    const button = document.createElement("button");
    const imageButton = document.createElement("img");
    let particleTimeout = 0;

    button.classList.add("card-favoriteButton");

    // Função que emite partículas (apenas quando favoritado)
    function emitParticles(target) {
        const numStars = 15;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('span');
            star.classList.add('star');

            const distance = 50 + Math.random() * 50;
            const xDir = (Math.random() - 0.5) * distance * 2;
            const yDir = -distance;

            star.style.setProperty('--x', `${xDir}px`);
            star.style.setProperty('--y', `${yDir}px`);

            target.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 3000);
        }
    }

    // remove partículas já existentes no botão
    function clearParticles(target) {
        const stars = target.querySelectorAll('.star');
        stars.forEach(s => s.remove());
    }

    // Unifica lógica de clique: toggle favorito + animação apenas ao favoritar
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation(); // impede abrir o card

        // Lê flag de estar na página de favoritos
        const pageFavorite = localStorage.getItem("pageFavorite");

        // Carrega lista atual (usa chave "favoritos")
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const index = favoritos.findIndex(p => p.id === pokemon.id);
        const isCurrentlyFavorited = index >= 0;
        const willBeFavorited = !isCurrentlyFavorited;

        // Cancela qualquer emissão agendada anterior para evitar múltiplos brilhos
        if (particleTimeout) {
            clearTimeout(particleTimeout);
            particleTimeout = 0;
        }

        if (!willBeFavorited) {
            // remover favorito
            if (isCurrentlyFavorited) favoritos.splice(index, 1);
            button.classList.remove('Capture', 'active');
            button.classList.add('removeCapture');

            // limpa partículas visíveis (caso tenham sido geradas)
            clearParticles(button);
        } else {
            // adicionar favorito
            favoritos.push(pokemon);
            button.classList.remove('removeCapture');
            button.classList.add('Capture', 'active');

            // agenda emissão de partículas; se o usuário desfavorar antes, o timeout é cancelado
            particleTimeout = setTimeout(() => {
                // só emite se o botão ainda estiver favoritado
                if (button.classList.contains('Capture')) {
                    emitParticles(button);
                }
                particleTimeout = 0;
            }, 3000); // ajuste para 3000 se realmente quiser 3s de espera
        }

        // salva
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Se estiver na página de favoritos, re-renderiza a lista atualizada
        if (pageFavorite === 'true') {
            const atuais = JSON.parse(localStorage.getItem("favoritos")) || [];
            const containerEl = document.getElementById('cards');
            const loaderEl = document.getElementById('infinite-loader');

            if (!atuais || atuais.length === 0) {
                // limpa a tela e mostra mensagem clara quando não há favoritos
                if (containerEl) containerEl.innerHTML = "";
                if (loaderEl) {
                    loaderEl.classList.remove('hidden');
                    loaderEl.innerHTML = "<p>Nenhum pokémon capturado.</p>";
                }
            } else {
                // tem favoritos: oculta loader e renderiza
                if (loaderEl) {
                    loaderEl.classList.add('hidden');
                    loaderEl.innerHTML = "";
                }
                main(atuais);
            }
        }
    });

    // Função para verificar se o Pokémon já está favoritado ao renderizar o card
    function verificarCaptura() {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const index = favoritos.findIndex(p => p.id === pokemon.id);

        if (index >= 0) {
            // ajuste: usa classe 'Capture' para indicar favoritado
            button.classList.remove('removeCapture');
            button.classList.add('Capture');
        } else {
            button.classList.remove('Capture', 'active');
            button.classList.add('removeCapture');
        }
    }

    verificarCaptura();

    // Estilização base
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';

    // Header
    const header = document.createElement('div');
    header.classList.add('card-header');

    const id = document.createElement('span');
    id.classList.add('card-id');
    id.textContent = `#${pokemon.id.toString().padStart(4, '0')}`;

    const name = document.createElement('h2');
    name.classList.add('card-name');
    name.textContent = pokemon.name;

    // Tipos
    const types = document.createElement('div');
    types.classList.add('card-types');
    pokemon.types.forEach(t => {
        const type = document.createElement('span');
        type.classList.add("type", t.type.name);
        type.textContent = t.type.name;
        types.appendChild(type);
    });

    // Imagem
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image');

    const image = document.createElement('img');
    // Usa CDN alternativo (assets.pokemon.com) - mais estável que raw.githubusercontent
    const id3 = String(pokemon.id).padStart(3, '0');
    image.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id3}.png`;
    image.alt = pokemon.name;
    // Fallback para pokemondb.net caso o assets.pokemon falhe
    image.onerror = () => {
        image.onerror = null; // previne loop infinito
        image.src = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`;
    };
    imageContainer.appendChild(image);

    // Montagem final
    header.appendChild(divButton);
    divButton.appendChild(button);
    button.appendChild(imageButton);
    header.appendChild(name);
    header.appendChild(id);

    card.appendChild(header);
    card.appendChild(imageContainer);
    card.appendChild(types);

    // Adiciona observer para animação ao entrar na tela
    if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        observer.observe(card);
    } else {
        // Fallback para navegadores sem suporte
        card.classList.add('card-visible');
    }

    return card;
}

export function createDetailCard(pokemon) {
    const container = document.querySelector('.pokemon-id');
    container.textContent = `#${pokemon.id.toString().padStart(4, '0')}`;
}
