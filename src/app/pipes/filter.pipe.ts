import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, arg: any): any {
      if (arg === '' || arg.length < 3) return value;
      const resul = [];
      for (const account of value) {
        if (account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resul.push(account);
        };
      };
      return resul;
    }
}


