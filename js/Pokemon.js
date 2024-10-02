export default class Pokemon{
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.spr_front = data.sprites.front_default;
        this.spr_back = data.sprites.back_default;
        this.types = data.types;
    }
}