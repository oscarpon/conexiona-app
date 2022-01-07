import { Account } from "./account";
import { Building } from "./building";

export class Hospital {
    id?: string;
    hospitalName: string;
    phone: string;
    address: string;
    zipCode: number;
    city: string;
    province: string;
    account?: Account;
    building?: Building[];
}
