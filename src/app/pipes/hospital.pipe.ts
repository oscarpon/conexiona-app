import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hospital'
})
export class HospitalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resul = [];
    for (const hospital of value) {
      if (hospital.hospitalName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || hospital.city.toLowerCase().indexOf(arg.toLowerCase()) > -1 || hospital.account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resul.push(hospital);
      };

    };
    return resul;
  }

}
