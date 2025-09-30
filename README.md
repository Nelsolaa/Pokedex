# Projeto Pokedex com Vite e JavaScript Puro

Este projeto é uma implementação simples de uma Pokédex utilizando JavaScript puro (Vanilla JS) e o bundler Vite. Ele permite buscar informações básicas de Pokémon, como nome, ID, tipo e imagem, consumindo a API pública do Pokémon (PokeAPI).

# URL para acesssar 
https://pokedex-kohl-pi-36.vercel.app/

## Tecnologias Utilizadas

*   **Vite**: Um bundler de próxima geração para desenvolvimento web. Ele oferece uma experiência de desenvolvimento extremamente rápida, com hot module replacement (HMR) instantâneo e otimizações de build para produção.
*   **JavaScript (Vanilla JS)**: A linguagem de programação principal, utilizada de forma pura, sem frameworks ou bibliotecas adicionais como React, Vue ou Angular. Isso demonstra a capacidade do JavaScript nativo para manipular o DOM e interagir com APIs.
*   **HTML5**: A estrutura da aplicação é definida em um único arquivo HTML, `index.html`, que serve como ponto de entrada.
*   **CSS3**: Estilização da interface da Pokédex, incluindo um design que remete aos dispositivos clássicos, com luzes e tela de pixel art.
*   **PokeAPI**: Uma API RESTful gratuita e aberta que fornece dados sobre todos os Pokémon. Este projeto consome essa API para obter as informações dos Pokémon.



## Como Funciona

O projeto é estruturado de forma modular para facilitar a organização e manutenção do código:

1.  **`index.html`**: Este é o arquivo HTML principal que define a estrutura da interface da Pokédex. Ele carrega o `main.js` como um módulo JavaScript.
2.  **`main.js`**: Este arquivo é o ponto de entrada da aplicação JavaScript. Ele é responsável por:
    *   Importar o arquivo `style.css` para aplicar a estilização.
    *   Importar a função `searchPokemon` do arquivo `pokedex.js`.
    *   Definir a estrutura HTML inicial da Pokédex dentro do elemento `<div id="app"></div>`.
    *   Selecionar os elementos do DOM (campo de busca, botão de busca e contêiner de resultados).
    *   Adicionar ouvintes de evento (event listeners) ao botão de busca e ao campo de entrada para disparar a função `searchPokemon` quando o usuário interage.
3.  **`pokedex.js`**: Este arquivo contém a lógica principal para buscar e exibir os dados dos Pokémon. A função `searchPokemon` é exportada para ser utilizada em `main.js`. Ela:
    *   Recebe o elemento de input e o contêiner de resultados como argumentos.
    *   Obtém o nome do Pokémon digitado pelo usuário.
    *   Exibe uma mensagem de 


carregamento enquanto a busca é realizada.
    *   Faz uma requisição assíncrona para a PokeAPI usando `fetch` com o nome do Pokémon.
    *   Processa a resposta da API, extraindo o ID, nome, URL da imagem e tipo do Pokémon.
    *   Atualiza o `resultContainer` com as informações formatadas do Pokémon, incluindo a imagem e o tipo com estilização específica.
    *   Em caso de erro (Pokémon não encontrado ou falha na requisição), exibe uma mensagem de erro apropriada.
4.  **`style.css`**: Contém todas as regras de estilo CSS para a aplicação, definindo o layout, cores, fontes e responsividade da interface da Pokédex.



## Como Usar

Para interagir com a Pokédex:

1.  **Digite o nome de um Pokémon** no campo de texto "Nome do Pokémon".
2.  **Clique no botão "Buscar"** ou pressione **Enter** para pesquisar.
3.  As informações do Pokémon (nome, ID, imagem e tipo) serão exibidas na tela da Pokédex.
4.  Se o Pokémon não for encontrado ou houver um erro na busca, uma mensagem de erro será exibida.



## Instalação e Execução

Para configurar e executar este projeto localmente, siga os passos abaixo:

1.  **Certifique-se de ter o Node.js instalado** em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2.  **Navegue até o diretório do projeto** no seu terminal.

3.  **Instale as dependências** do projeto. O Vite é listado como `devDependencies` no `package.json`:

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

4.  **Inicie o servidor de desenvolvimento**:

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```

    Isso iniciará o servidor de desenvolvimento do Vite, e você poderá acessar a aplicação no seu navegador (geralmente em `http://localhost:5173/`).

5.  **Para construir a aplicação para produção**:

    ```bash
    npm run build
    # ou
    yarn build
    # ou
    pnpm build
    ```

    Isso criará uma versão otimizada da aplicação na pasta `dist/`.

6.  **Para pré-visualizar a build de produção localmente**:

    ```bash
    npm run preview
    # ou
    yarn preview
    # ou
    pnpm preview
    ```

    Isso iniciará um servidor local para servir os arquivos da pasta `dist/`.

    Made by Nelson Prado  
