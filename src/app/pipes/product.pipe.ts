import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resul = [];
    for (const product of value) {
      if (product.nameProduct.toLowerCase().indexOf(arg.toLowerCase()) > -1 || product.account.accountName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resul.push(product);
      };

    };
    return resul;
  }

}
