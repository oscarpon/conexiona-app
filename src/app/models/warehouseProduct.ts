import { Warehouse } from "./warehouse";
import { Products } from "./products";

export class WarehouseProduct{
    id?: string;
    warehouse: Warehouse;
    product: Products;
    stock: number;
}