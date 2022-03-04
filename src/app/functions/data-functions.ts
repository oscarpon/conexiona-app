import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Warehouse } from "../models/warehouse";
import { WarehouseService } from "../services/warehouse.service";

@Injectable()
export class DataFunctions{

    constructor(
        private wareHouseService: WarehouseService
    ){}

    public loadWareHouses(id: string): Observable<Warehouse[]>{
        return this.wareHouseService.getbyAccount(id);
    }

}