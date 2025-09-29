import './style.css';
// 1. Importa a função que criamos no outro arquivo
import { searchPokemon } from './functions/pokedex.js';

// 2. Define o HTML da aplicação (isso não muda)
document.querySelector('#app').innerHTML = `
  <div class="pokedex">
    <div class="pokedex-header">
      <div class="pokedex-light-container">
        <div class="pokedex-light big-light"></div>
        <div class="pokedex-light red-light"></div>
        <div class="pokedex-light yellow-light"></div>
        <div class="pokedex-light green-light"></div>
      </div>
    </div>

    <div id="pokemonResultContainer">
      <div class="pokedex-screen-placeholder">
        <p>Aguardando um Pokémon...</p>
      </div>
    </div>

    <div class="pokedex-footer">
        <div class="search-container">
          <input type="text" id="pokemonInput" placeholder="Nome do Pokémon" />
          <button id="searchButton">Buscar</button>
        </div>
    </div>
  </div>
`;

// 3. Seleciona os elementos do DOM
const input = document.querySelector('#pokemonInput');
const button = document.querySelector('#searchButton');
const resultContainer = document.querySelector('#pokemonResultContainer');

// 4. Conecta os eventos à função importada, passando os elementos necessários
button.addEventListener('click', () => {
  searchPokemon(input, resultContainer);
});

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchPokemon(input, resultContainer);
  }
});