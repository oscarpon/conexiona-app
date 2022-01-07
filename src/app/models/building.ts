import { Hospital } from "./hospital";
import { Warehouse } from "./warehouse";

export class Building {
    id?: string;
    buildingName: string;
    warehouseList?: Warehouse[];
    hospital?: Hospital;
}
