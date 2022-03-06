import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private urlEndPoint = environment.productUrl;

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Products[]>{
    return this.httpClient.get<Products[]>(this.urlEndPoint + 'all');
  }

  public save(newProduct: Products, id: string): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint + `add/${id}`, newProduct);
  }

  public delete(id: string): Observable<Products>{
    return this.httpClient.delete<Products>(this.urlEndPoint + 'add' + `/${id}`);
  }

  public update(product: Products): Observable<any>{
    return this.httpClient.put<any>(this.urlEndPoint + `add/${product.id}`, product);
  }

  public detail(id: string): Observable<Products>{
    return this.httpClient.get<any>(this.urlEndPoint + `${id}`);
  }

  public listByAccount(id: string): Observable<Products[]>{
    return this.httpClient.get<Products[]>(this.urlEndPoint + `all/${id}`);
  }

}
