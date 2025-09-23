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
        // Card
        const card = document.createElement("div");
        card.classList.add("card");

        //Header
        const header = document.createElement("div");
        header.classList.add("card-header");
        
        // Name
        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = `${this.nome}`;

        // ID
        const id = document.createElement("span");
        id.classList.add("id");
        id.textContent = `#${this.id}`;

        // Image
        const image = document.createElement("img");
        image.classList.add("card-image");
        image.src = this.imagem

        // Type
        const type = document.createElement("p");
        type.classList.add("type");
        type.textContent = `${this.tipagem}`;

        header.appendChild(name);
        header.appendChild(id);

        card.appendChild(header);
        card.appendChild(image);
        card.appendChild(type);
        
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

const Psyduck = new Pokemon(
    54,
    "Psyduck",
    ["Aquático"],
    "https://img.pokemondb.net/artwork/large/psyduck.jpg",
    "Kanto",
    { hp: 50, attack: 52, defense: 48 },
    ["Water Gun", "Surf", "Confusion"],
    0.8,
    19.6,
    "Psyduck é um pokemon de tipo aquático, conhecido pela sua aparencia semelhante a um pato.",
    false

);

const Charizard = new Pokemon(
    "00" + 6,
    "Charizard",
    ["Fogo"],
    "https://img.pokemondb.net/artwork/vector/large/charizard.png",
    "Kanto",
    { hp: 78, attack: 84, defense: 78},
    ["Flamethrower", "Ember", "Dragon Claw"],
    1.7,
    90.5,
    "Indicutivelmente o melhor Pokemon de todos",
    false
);

const Archaludon = new Pokemon(
    1018,
    "Archaludon",
    ["Dragão de Aço"],
    "https://img.pokemondb.net/artwork/large/archaludon.jpg",
    "Beast",
    {hp: 90, attack: 105, defense: 130},
    ["Metal Claw", "Dragon Claw", "Hyper Beam"],
    2.0,
    60.0,
    "Archaludon é um pokemon de aço conhecido por sua forte restência",
    false

);
const cards = document.getElementsByClassName("cards-container")[0];
cards.appendChild(Pikachu.createCard());
cards.appendChild(Psyduck.createCard());
cards.appendChild(Charizard.createCard());
cards.appendChild(Archaludon.createCard());

const stringjson = JSON.stringify(Pikachu);
localStorage.setItem("pokemons Capturados", stringjson);

localStorage.removeItem("") // <--- Caso precisar remover intem da local storage

