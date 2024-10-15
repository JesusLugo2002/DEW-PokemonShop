import UserModel from "../models/UserModel.js";
import UserView from "../views/UserView.js";

export default class UserController {
    constructor() {
        this.uid = '';
        this.username = '';
        this.balance = 0;
        this.isOnline = false;
        this.view = new UserView()
        this.model = new UserModel()

        this.init();
    }
    
    init() {
        this.updateProfileContainer();
        this.bindingEvents();
    }

    updateProfileContainer() {
        if (this.isOnline) {
            this.view.showProfile(this)
        } else {
            this.view.showLogin()
        }
    }

    bindingEvents() {
        
    }
}