// Funções auxiliares
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function findFlavorText(speciesData) {
    const flavorTextEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    );
    return flavorTextEntry ? flavorTextEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'Nenhuma descrição encontrada.';
}

function calculateTypeEffectiveness(typeDataArray) {
    const allTypes = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
        'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];
    const multipliers = {};
    allTypes.forEach(t => { multipliers[t] = 1; });
    typeDataArray.forEach(typeData => {
        const relations = typeData.damage_relations;
        relations.double_damage_from.forEach(t => { multipliers[t.name] *= 2; });
        relations.half_damage_from.forEach(t => { multipliers[t.name] *= 0.5; });
        relations.no_damage_from.forEach(t => { multipliers[t.name] *= 0; });
    });
    const effectiveness = { weaknesses: [], resistances: [], immunities: [] };
    for (const type in multipliers) {
        if (multipliers[type] > 1) effectiveness.weaknesses.push({ name: type, multiplier: multipliers[type] });
        else if (multipliers[type] < 1 && multipliers[type] > 0) effectiveness.resistances.push({ name: type, multiplier: multipliers[type] });
        else if (multipliers[type] === 0) effectiveness.immunities.push({ name: type, multiplier: 0 });
    }
    return effectiveness;
}

function createTypesHtml(types) {
    return types.map(typeInfo => `<span class="pokemon-type type-${typeInfo.type.name.toLowerCase()}">${capitalize(typeInfo.type.name)}</span>`).join('');
}

function createStatsHtml(stats) {
    return stats.map(statInfo => `
        <div class="stat-row">
            <span class="stat-name">${statInfo.stat.name.replace('special-', 'Sp. ')}</span>
            <span class="stat-value">${statInfo.base_stat}</span>
            <div class="stat-bar"><div class="stat-bar-inner" style="width: ${Math.min(statInfo.base_stat / 2, 100)}%;"></div></div>
        </div>`).join('');
}

function createEffectivenessHtml(effectiveness) {
    const createSection = (title, types) => {
        if (types.length === 0) return '';
        return `<h4>${title}</h4><div class="types-grid">${types.map(t => `<div class="pokemon-type type-${t.name}">${capitalize(t.name)} <span>${t.multiplier}x</span></div>`).join('')}</div>`;
    };
    return `${createSection('Fraquezas', effectiveness.weaknesses)}${createSection('Resistências', effectiveness.resistances)}${createSection('Imunidades', effectiveness.immunities)}`;
}

function createAbilitiesInfoHtml(abilities, abilityDetails) {
    if (abilities.length === 0) return '';
    return `
        <div class="abilities-info-section">
            <h4>Habilidades</h4>
            ${abilities.map((abilityInfo, index) => {
                const detail = abilityDetails[index];
                const effectEntry = detail.effect_entries.find(e => e.language.name === 'en');
                const description = effectEntry ? effectEntry.short_effect : 'Sem descrição.';
                const hiddenTag = abilityInfo.is_hidden ? '<span class="hidden-ability-tag">Oculta</span>' : '';

                return `
                    <div class="ability-compact">
                        <div class="ability-header-compact">
                            <h5 class="ability-name-compact">${capitalize(abilityInfo.ability.name.replace('-', ' '))}</h5>
                            ${hiddenTag}
                        </div>
                        <p class="ability-description-compact">${description}</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function createMovesHtml(moves) {
    const levelUpMoves = moves
        .map(moveInfo => {
            const versionDetail = moveInfo.version_group_details.find(
                detail => detail.move_learn_method.name === 'level-up' && detail.version_group.name === 'scarlet-violet'
            );
            if (versionDetail && versionDetail.level_learned_at > 0) {
                return { name: moveInfo.move.name, level: versionDetail.level_learned_at };
            }
            return null;
        })
        .filter(move => move !== null)
        .sort((a, b) => a.level - b.level);

    if (levelUpMoves.length === 0) {
        return '<p>Nenhum golpe de level-up encontrado para a geração mais recente.</p>';
    }

    return `
        <div class="moves-list">
            <div class="moves-header"><span>Nível</span><span>Golpe</span></div>
            ${levelUpMoves.map(move => `
                <div class="move-row">
                    <span class="move-level">Lv. ${move.level}</span>
                    <span class="move-name">${capitalize(move.name.replace('-', ' '))}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// --- FUNÇÃO PRINCIPAL ---
export async function searchPokemon(inputElement, resultContainer) {
    const pokemonName = inputElement.value.trim().toLowerCase();
    if (!pokemonName) {
        resultContainer.innerHTML = `<div class="pokedex-screen error"><p>Digite o nome de um Pokémon.</p></div>`;
        return;
    }

    resultContainer.innerHTML = `<div class="pokedex-screen loading"><p>Buscando...</p></div>`;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokémon não encontrado!');
        const data = await response.json();

        const [speciesData, typeDataArray, abilityDetails] = await Promise.all([
            fetch(data.species.url).then(res => res.json()),
            Promise.all(data.types.map(t => fetch(t.type.url).then(res => res.json()))),
            Promise.all(data.abilities.map(a => fetch(a.ability.url).then(res => res.json())))
        ]);

        const flavorText = findFlavorText(speciesData);
        const effectiveness = calculateTypeEffectiveness(typeDataArray);

        const typesHtml = createTypesHtml(data.types);
        const statsHtml = createStatsHtml(data.stats);
        const effectivenessHtml = createEffectivenessHtml(effectiveness);
        const abilitiesInfoHtml = createAbilitiesInfoHtml(data.abilities, abilityDetails);
        const movesHtml = createMovesHtml(data.moves);

        resultContainer.innerHTML = `
            <div class="pokedex-screen">
                <div class="pokemon-main-info">
                     <div class="pokemon-image-container">
                        <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="pokemon-image" />
                    </div>
                    <div class="pokemon-id-name">
                        <span class="pokemon-id">#${data.id.toString().padStart(3, '0')}</span>
                        <h2 class="pokemon-name">${capitalize(data.name)}</h2>
                        <div class="pokemon-types-container">${typesHtml}</div>
                    </div>
                </div>
                <div class="pokemon-attributes">
                    <div><strong>Altura:</strong> ${(data.height / 10).toFixed(1)} m</div>
                    <div><strong>Peso:</strong> ${(data.weight / 10).toFixed(1)} kg</div>
                </div>
                <p class="pokemon-description">${flavorText}</p>
                <div class="tabs-container">
                    <button class="tab-button active" data-tab="stats">Status</button>
                    <button class="tab-button" data-tab="effectiveness">Eficiência</button>
                    <button class="tab-button" data-tab="moves">Golpes</button>
                </div>
                <div class="tab-content" id="stats-content">
                    ${statsHtml}
                    ${abilitiesInfoHtml}
                </div>
                <div class="tab-content hidden" id="effectiveness-content">${effectivenessHtml}</div>
                <div class="tab-content hidden" id="moves-content">${movesHtml}</div>
            </div>
        `;
    } catch (error) {
        console.error('Erro na busca:', error);
        resultContainer.innerHTML = `<div class="pokedex-screen error"><p>${error.message}</p></div>`;
    }
}