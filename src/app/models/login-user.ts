export class LoginUser {
    userName: string;
    password: string;

    constructor(username: string, password: string){
        this.password = password;
        this.userName = username;
    }
}
