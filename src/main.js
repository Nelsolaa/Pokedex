import './style.css';
import { searchPokemon } from './functions/pokedex.js';

// Define o HTML da aplicação
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

// Seleciona os elementos do DOM
const input = document.querySelector('#pokemonInput');
const button = document.querySelector('#searchButton');
const resultContainer = document.querySelector('#pokemonResultContainer');

// Função para lidar com a busca
function handleSearch() {
  searchPokemon(input, resultContainer);
}

// Conecta os eventos à função de busca
button.addEventListener('click', handleSearch);
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// --- LÓGICA DAS ABAS (TABS) ---
// Adiciona um listener no container dos resultados para pegar cliques nos botões das abas
resultContainer.addEventListener('click', (event) => {
  if (event.target.matches('.tab-button')) {
    const tabName = event.target.dataset.tab;

    // Remove a classe 'active' de todos os botões e esconde todos os conteúdos
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));

    // Adiciona 'active' ao botão clicado e mostra o conteúdo correspondente
    event.target.classList.add('active');
    document.getElementById(`${tabName}-content`).classList.remove('hidden');
  }
});