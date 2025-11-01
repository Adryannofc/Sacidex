// Em modules/js/data.js
export const pokemons = [
    {
        id: 1,
        name: "Bulbasaur",
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        favorite: true,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
                    "shine_version": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
                }
            }
        },
        "description": "Bulbasaur pode ser visto cochilando sob a luz do sol...",
        "genderRateMale": 87.5,
        "catchRate": 45
    },
    {
        id: 4,
        name: "Charmander",
        types: [{ type: { name: "fire" } }],
        favorite: true,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
                }
            }
        },
        "description": "A chama que queima na ponta de sua cauda é uma indicação...",
        "genderRateMale": 87.5,
        "catchRate": 45
    },
    {
        id: 6,
        name: "Charizard",
        types: [{ type: { name: "fire" } }, { type: { name: "flying" } }],
        favorite: true,
        sprites: {
            other: {
                "official-artwork": {

                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"
                }
            }
        },
        "description": "Charizard, a forma final de Charmander, é um Pokémon...",
        "genderRateMale": 87.5,
        "catchRate": 45
    },
    {
        id: 25,
        name: "Pikachu",
        types: [{ type: { name: "electric" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {

                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
                }
            }
        },
        "description": "Este Pokémon tem bolsas elétricas em suas bochechas...",
        "genderRateMale": 50.0,
        "catchRate": 190
    },

    {
        id: 39,
        name: "Jigglypuff",
        types: [{ type: { name: "normal" } }, { type: { name: "fairy" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png"
                }
            }
        },
        "description": "Quando este Pokémon canta, ele modula o comprimento de onda de sua voz para coincidir com as ondas cerebrais de quem está com sono, fazendo-os adormecer.",
        "genderRateMale": 25,
        "catchRate": 170
    },
    {
        id: 54,
        name: "Psyduck",
        types: [{ type: { name: "water" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png"
                }
            }
        },
        "description": "Sofre de uma dor de cabeça crônica. Quando a dor de cabeça fica muito forte, ele libera uma energia psíquica misteriosa.",
        "genderRateMale": 50,
        "catchRate": 190
    },
    {
        id: 58,
        name: "Growlithe",
        types: [{ type: { name: "fire" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png"
                }
            }
        },
        "description": "É um Pokémon corajoso e leal. Ele latirá sem medo para qualquer inimigo maior e mais forte, tentando proteger seu Treinador.",
        "genderRateMale": 75,
        "catchRate": 190
    },
    {
        id: 92,
        name: "Gastly",
        types: [{ type: { name: "ghost" } }, { type: { name: "poison" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png"
                }
            }
        },
        "description": "Quase invisível, este Pokémon gasoso envolve o alvo e o adormece. Ele pode nocautear um elefante indiano em 2 segundos.",
        "genderRateMale": 50,
        "catchRate": 190
    },
    {
        id: 94,
        name: "Gengar",
        types: [{ type: { name: "ghost" } }, { type: { name: "poison" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png"
                }
            }
        },
        "description": "Para roubar a vida de seu alvo, ele se esconde na sombra da vítima e espera silenciosamente por uma oportunidade.",
        "genderRateMale": 50,
        "catchRate": 45
    },

    {
        id: 63,
        name: "Abra",
        types: [{ type: { name: "psychic" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png"
                }
            }
        },
        "description": "Ele dorme 18 horas por dia. Mesmo dormindo, ele usa seus poderes psíquicos. Se estiver em perigo, ele se teletransporta.",
        "genderRateMale": 75,
        "catchRate": 200
    },
    {
        id: 129,
        name: "Magikarp",
        types: [{ type: { name: "water" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/129.png"
                }
            }
        },
        "description": "Um Pokémon patético e fraco. Consegue sobreviver em qualquer corpo de água, mas é conhecido apenas por pular.",
        "genderRateMale": 50,
        "catchRate": 255
    },
    {
        id: 131,
        name: "Lapras",
        types: [{ type: { name: "water" } }, { type: { name: "ice" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png"
                }
            }
        },
        "description": "Um Pokémon gentil que adora transportar pessoas nas costas. Sua inteligência permite que ele entenda a fala humana.",
        "genderRateMale": 50,
        "catchRate": 45
    },
    {
        id: 143,
        name: "Snorlax",
        types: [{ type: { name: "normal" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png"
                }
            }
        },
        "description": "Muito preguiçoso. Não faz nada além de comer e dormir. É tão dócil que crianças pulam em sua barriga.",
        "genderRateMale": 87.5,
        "catchRate": 25
    },
    {
        id: 150,
        name: "Mewtwo",
        types: [{ type: { name: "psychic" } }],
        favorite: false,
        sprites: {
            other: {
                "official-artwork": {
                    "front_default": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png"
                }
            }
        },
        "description": "Foi criado por engenharia genética. Seu DNA é quase o mesmo de Mew, mas seu tamanho e poder são muito maiores.",
        "genderRateMale": 0,
        "catchRate": 3
    }
];