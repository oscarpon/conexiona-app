import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warehouse'
})
export class WarehousePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resul = [];
    for (const warehouse of value) {
      if (warehouse.building.buildingName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || warehouse.building.hospital.hospitalName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
      warehouse.building.hospital.account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || warehouse.wareHouseName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resul.push(warehouse);
      };

    };
    return resul;
  }

}
