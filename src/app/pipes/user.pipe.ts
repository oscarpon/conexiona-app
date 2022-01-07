import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resul = [];
    for (const user of value) {
      if (user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.userName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.email.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resul.push(user);
      };

    };
    return resul;
  }

}
