import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'building'
})
export class BuildingPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resul = [];
    for (const building of value) {
      if (building.buildingName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || building.hospital.hospitalName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || building.hospital.account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resul.push(building);
      };

    };
    return resul;
  }

}
