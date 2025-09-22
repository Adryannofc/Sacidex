//=========================== Objetos no projeto "Sacidex" =====================================

class Pokemon {
    constructor(id, nome, tipagem, imagem, regiao, status, moves, altura, peso, descricao, capturado = false) {
        this.id = id;
        this.nome = nome;
        this.tipagem = tipagem;
        this.imagem = imagem;
        this.regiao = regiao;
        this.status = status;
        this.moves = moves;
        this.altura = altura;
        this.peso = peso;
        this.descricao = descricao;
        this.capturado = capturado;
    }

    createCard() {
        const card = document.createElement("div");
        card.innerHTML = `<img src="${this.imagem} " width="60px" height="60px"/>`;
        return card;
    }
}

const Pikachu = new Pokemon(
    25,
    "Pikachu",
    ["Elétrico"],
    "https://img.pokemondb.net/artwork/large/pikachu.jpg",
    "Kanto",
    { hp: 35, attack: 55, defense: 40 },
    ["Thunder Shock", "Quick Attack", "Iron Tail"],
    0.4,
    6,
    "Pikachu é um Pokémon elétrico famoso por armazenar eletricidade nas bochechas.",
    false
);

const cards = document.getElementsByClassName("cards-container")[0];
cards.appendChild(Pikachu.createCard());


const stringjson = JSON.stringify(Pikachu)
localStorage.setItem("pokemons Capturados", stringjson);

localStorage.removeItem("") // <--- Caso precisar remover intem da local storage