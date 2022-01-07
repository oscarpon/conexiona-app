import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'account'
})
export class AccountPipe implements PipeTransform {

  transform(value: any[], arg: Object): any {
    if (arg === '') return value;
    const resul = [];
    for (const account of value) {
      if (account.accountName.indexOf(arg) > -1) {
        resul.push(account);
      };
    };
    return resul;
  }

}
