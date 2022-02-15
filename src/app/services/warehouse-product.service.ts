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

  public delete(id: string): Observable<any>{
    return this.http.delete<any>(this.warehouseProductUrl + `delete/${id}`);
  }

  public update(warehouseProduct: WarehouseProduct): Observable<any>{
    return this.http.put(this.warehouseProductUrl + `update-stock`, warehouseProduct);
  }

  public exportData(id: string): Observable<Blob>{
    return this.http.get(this.warehouseProductUrl + `export-data/pdf/warehouse-stock/${id}`, {responseType: 'blob'});
  }

}
