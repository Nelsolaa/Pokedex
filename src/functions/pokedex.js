// Note o "export" antes da função. Isso permite que ela seja importada em outros arquivos.
export async function searchPokemon(inputElement, resultContainer) {
  // A lógica agora usa os elementos que foram passados como argumentos
  const pokemonName = inputElement.value.trim().toLowerCase();

  if (!pokemonName) {
    resultContainer.innerHTML = `
      <div class="pokedex-screen error">
        <p>Digite o nome de um Pokémon.</p>
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = `
    <div class="pokedex-screen loading">
      <p>Buscando...</p>
    </div>
  `;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokémon não encontrado!');
    }

    const data = await response.json();

    const id = data.id;
    const name = data.name;
    const imageUrl = data.sprites.other['official-artwork'].front_default;
    const type = data.types[0].type.name;

    resultContainer.innerHTML = `
      <div class="pokedex-screen">
        <div class="pokemon-info-header">
          <span class="pokemon-name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
          <span class="pokemon-id">#${id.toString().padStart(3, '0')}</span>
        </div>
        <div class="pokemon-image-container">
           <img src="${imageUrl}" alt="Imagem do ${name}" class="pokemon-image" />
        </div>
        <div class="pokemon-info-footer">
          <span class="pokemon-type type-${type.toLowerCase()}">${type}</span>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Erro na busca:', error);
    resultContainer.innerHTML = `
      <div class="pokedex-screen error">
        <p>${error.message}</p>
      </div>
    `;
  }
}