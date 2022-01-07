import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from '../models/building';
import { Warehouse } from '../models/warehouse';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  wareHouseUrl = environment.wareHouseUrl;

  constructor(private http: HttpClient) { }

  public all(): Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(this.wareHouseUrl + 'all')
  }

  public getbyAccount(id: string): Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(this.wareHouseUrl + `all/account/${id}`);
  }

  public delete(id: String): Observable<Warehouse>{
    return this.http.delete<Warehouse>(this.wareHouseUrl + 'add' + `/${id}`);
  }  

  public create(newWareHouse: Warehouse, id: string): Observable<any>{
    return this.http.post<any>(this.wareHouseUrl + `add/${id}`, newWareHouse);
  }

  public update(warehouse: Warehouse):Observable<any>{
    return this.http.put<any>(this.wareHouseUrl + `add/${warehouse.id}`, warehouse);
  }

  public detail(id: string): Observable<Warehouse>{
    return this.http.get<any>(this.wareHouseUrl + `${id}`);
  }


}
