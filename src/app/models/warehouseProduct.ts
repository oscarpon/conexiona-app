import { Warehouse } from "./warehouse";
import { Products } from "./products";
import { Device } from "./device";

export class WarehouseProduct{
    
    id?: string;
    warehouse: Warehouse;
    product: Products;
    stock: number;
    deviceName: string;
    idBasket: string;
    
}