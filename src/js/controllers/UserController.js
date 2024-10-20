import DBConnection from "../models/database.js";

export default class UserController {
    constructor() {
        this.database = new DBConnection()
        this.id;
        this.username;
        this.password;
        this.balance;
    }

    async fetchData(id) {
        const allUsers = await this.database.readAll()
        for (let user of allUsers) {
            if (user["id"] == id) {
                this.id = user["id"]
                this.username = user["username"];
                this.password = user["password"];
                this.balance = user["balance"];
                return
            }
        }
    }

    printData() {
        console.log(`ID: ${this.id} - Username: ${this.username} - Balance: ${this.balance}`)
    }
}