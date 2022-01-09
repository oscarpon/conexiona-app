import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Warehouse } from '../models/warehouse';
import { WarehouseProduct } from '../models/warehouseProduct';

@Injectable({
  providedIn: 'root'
})
export class WarehouseProductService {

  warehouseProductUrl = environment.wareHouseProductUrl;

  constructor(private http: HttpClient) { }

  public new(newWarehouseProduct: WarehouseProduct, wareHouseId: Warehouse): Observable<any>{
      return this.http.post<any>(this.warehouseProductUrl + `add`, newWarehouseProduct);
  }

  public getOne(id: string): Observable<any>{
    return this.http.get<any>(this.warehouseProductUrl + `/${id}`);
  }

  public getWarehouseProductsByWarehouse(wareHouseId: string): Observable<any>{
    return this.http.get<any>(this.warehouseProductUrl + `get-products/warehouse-id/${wareHouseId}`);
  }

}
