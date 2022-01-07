import { ObjectUnsubscribedError } from "rxjs";
import { NewUser } from "./new-user";
import { Products } from "./products";

export class Account {
    id?: string;
    accountName: string;
    users?: NewUser[];
    products?: Products[];
}
