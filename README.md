# 🔴⚪ SaciDex

<img width="1902" height="1053" alt="image" src="https://github.com/user-attachments/assets/105bb136-a550-4713-b6c7-019439fbeb24" />


> *Uma Pokédex moderna, responsiva e cheia de magia brasileira, desenvolvida pela equipe Saciscode.*

## 📖 Sobre o Projeto

A **SaciDex** é uma aplicação web interativa que consome a [PokeAPI](https://pokeapi.co/) para listar, filtrar e exibir detalhes de Pokémon. O projeto foi desenvolvido com foco em performance, experiência do usuário (UX) e design limpo.

Diferente de listas comuns, a SaciDex oferece uma experiência imersiva com cores dinâmicas baseadas no tipo do Pokémon, modo escuro e interações fluídas.

---

## ✨ Funcionalidades Incríveis

O projeto vai muito além do básico. Confira o que implementamos:

* **📜 Scroll Infinito:** Navegação fluida sem necessidade de clicar em "próxima página". Carregamento dinâmico conforme o usuário desce a tela.
* **🌙 Dark Mode & Light Mode:** Alternância completa de tema, salvando a preferência do usuário no `localStorage`.
* **🔍 Filtro Avançado por Tipos:** Filtre os Pokémon por fogo, água, planta, etc., através de um menu lateral intuitivo.
* **⭐ Sistema de Favoritos:** Salve seus Pokémon preferidos! Eles ficam armazenados no seu navegador para acesso rápido.
* **✨ Modo Shiny:** Na página de detalhes, clique no botão de brilho (✦) para ver a versão rara (Shiny) do Pokémon.
* **🎨 Cores Dinâmicas:** A interface se adapta à cor do tipo principal do Pokémon (ex: fundo vermelho para tipo Fogo).
* **📱 Totalmente Responsivo:** Layout adaptável para celulares, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

Projeto construído com **Vanilla JavaScript** moderno, focando nos fundamentos da web:

* **HTML5 Semântico**
* **CSS3** (Variáveis, Flexbox, Grid, Animações e Glassmorphism)
* **JavaScript (ES6+)**
    * *Fetch API* para consumo de dados.
    * *ES Modules* para organização do código.
    * *LocalStorage* para persistência de dados (favoritos e tema).
    * *Intersection Observer* para animações de scroll.

---

## 📸 Screenshots

| Home (Dark Mode) | Detalhes (Status) |
|:---:|:---:|
| <img width="1902" height="1053" alt="image" src="https://github.com/user-attachments/assets/110902db-f830-4821-90fc-35dbc7e91512" /> | <img width="1915" height="1050" alt="image" src="https://github.com/user-attachments/assets/9d57ed92-166a-4476-8220-01c6fda3da5a" />|

---


## 🚀 Como Rodar o Projeto

Como o projeto utiliza **ES Modules** (`import`/`export`), você precisará de um servidor local para evitar erros de CORS (Cross-Origin Resource Sharing) se abrir o arquivo diretamente.

### Opção 1: VS Code (Recomendado)
1.  Instale a extensão **Live Server** no VS Code.
2.  Clique com o botão direito no arquivo `modules/index.html` (ou no `index.html` da raiz).
3.  Selecione **"Open with Live Server"**.

### Opção 2: Terminal (Python)
Se você tem Python instalado:
```bash
# Clone o repositório
git clone [https://github.com/GuilhermeRM-a1/Sacidex.git](https://github.com/GuilhermeRM-a1/Sacidex.git)

# Entre na pasta
cd Sacidex

# Inicie um servidor simples
python -m http.server
# Acesse http://localhost:8000 no navegador
```

```
Sacidex/
├── assets/             # Imagens, ícones e protótipos
├── modules/            # Código Fonte Principal
│   ├── css/            # Estilos (cards.css, darkmode.css, details.css, etc.)
│   ├── js/             # Lógica (api.js, details.js, ui.js, scriptFilter.js)
│   ├── pages/          # Páginas secundárias (pokemon.html)
│   ├── index.html      # Página Inicial
│   ├── main.js         # Script principal
│   └── style.css       # Estilos globais
└── README.md
```
