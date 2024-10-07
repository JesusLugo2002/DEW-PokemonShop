export default class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`
        this.price = 0;
        this.types = data.types;
    }
}