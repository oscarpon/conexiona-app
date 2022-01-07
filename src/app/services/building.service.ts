import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';1
import { Building } from '../models/building';


@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  buildingUrl = environment.buildingUrl;

  constructor(private http: HttpClient) { }

  public all(): Observable<Building[]>{
    return this.http.get<Building[]>(this.buildingUrl + 'all');
  }

  public new(newBuilding: Building, id: string): Observable<any>{
    return this.http.post<any>(this.buildingUrl + `add/${id}`, newBuilding);
  }

  public update(building: Building): Observable<any>{
    return this.http.put<any>(this.buildingUrl + `add/${building.id}`, building);
  }

  public delete(id: string): Observable<Building>{
    return this.http.delete<Building>(this.buildingUrl + 'add' + `/${id}`);
  }

  public detail(id: string): Observable<Building>{
    return this.http.get<any>(this.buildingUrl + `all/${id}`)
  }

  public listByAccount(id: string): Observable<Building[]>{
    return this.http.get<Building[]>(this.buildingUrl + `all/account/${id}`);
  }

}
