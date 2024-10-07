export default class PokemonView {
    constructor() {
        this.pokedex = document.getElementById("pokedex");
    }

    hideLoading() {
        const loadingText = document.getElementById("loadingDataText");
        loadingText.remove();
    }

    displayPokemons(pokemons) {
        this.pokedex.innerHTML = "";
        for (const pokemon of pokemons) {
            this.pokedex.innerHTML += this.printCard(pokemon);
        }
    }

    getTypesLine(pokemon) {
        let result = ""
        for (let type of pokemon.types) {
            result += `<p class='type-pill ${type.type.name}-color'>${type.type.name}</p>`
        }
        return result
    }

    printCard(pokemon) {
        const types = this.getTypesLine(pokemon);
        const result = `
        <div class="pokemon-card">
            <img class="pokemon-sprite" src="${pokemon.sprite}" width="50%">
            <div class="pokemon-info">
                <p>${pokemon.id}. ${pokemon.name}</p>
                <div class="pokemon-types">
                    ${types}
                </div>
            </div>
        </div>
        `
        return result
    }
}