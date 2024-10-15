export default class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name[0].toUpperCase() + data.name.slice(1);
        this.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`
        this.hp = data.stats[0].base_stat;
        this.attack = data.stats[1].base_stat;
        this.defense = data.stats[2].base_stat;
        this.specialAttack = data.stats[3].base_stat;
        this.specialDefense = data.stats[4].base_stat;
        this.speed = data.stats[5].base_stat;
        this.types = data.types;
    }

    get totalPower() {
        return this.hp + this.attack + this.defense + this.specialAttack + this.specialDefense + this.speed;
    }

    get price() {
        return (this.totalPower/2).toFixed(2);
    }
}