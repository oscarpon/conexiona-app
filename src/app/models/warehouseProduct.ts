import { Warehouse } from "./warehouse";
import { Products } from "./products";

export class WarehouseProduct{
    id?: string;
    warehouse: Warehouse;
    products: Products;
    stock: number;
}