export default class UserController {
    constructor(data) {
        this.id = data["id"]
        this.username = data["username"]
        this.password = data["password"]
    }
}

