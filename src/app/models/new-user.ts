import { Account } from "./account";
import { Rol } from "./rol";

export class NewUser {
    id?: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    roles = []
    account?: Account;
}
