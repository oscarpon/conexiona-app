import { Warehouse } from "./warehouse";
import { Products } from "./products";
import * as internal from "stream";

export class WarehouseProduct{
    id?: string;
    warehouse: Warehouse;
    product: Products;
    stock: number;
}