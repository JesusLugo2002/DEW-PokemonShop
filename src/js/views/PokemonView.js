export default class PokemonView {
    constructor() {
        this.pokedex = document.getElementById("pokedex");
    }

    hideLoading() {
        const loadingText = document.getElementById("loadingDataText");
        loadingText.remove();
    }

    displayUser(data) {
        document.getElementById("username").textContent = `Username: ${data.username}`
        document.getElementById("balance").textContent = `Balance: ${data.balance}€`
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
            result += `<p class='type-pill ${type.type.name}-color'>${this.toTitleCase(type.type.name)}</p>`
        }
        return result
    }

    toTitleCase(text) {
        return text[0].toUpperCase() + text.slice(1);
    }

    printCard(pokemon) {
        const types = this.getTypesLine(pokemon);
        const result = `
        <div class="pokemon-card" id="${pokemon.id}">
            <img class="pokemon-sprite" src="${pokemon.sprite}" width="50%">
            <div class="pokemon-info">
                <p>${pokemon.id}. ${pokemon.name} | <span class="pokemon-price">${pokemon.price}€</span></p>
                <div class="pokemon-types">
                    ${types}
                </div>
            </div>
        </div>
        `
        return result
    }
}