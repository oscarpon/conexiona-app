import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospitalUrl = environment.hospitalUrl;

  constructor(private http: HttpClient) { }

  public new(newHospital: Hospital, id: string): Observable<any>{
    return this.http.post<any>(this.hospitalUrl + `add/${id}`, newHospital);
  }

  public all(): Observable<Hospital[]>{
    return this.http.get<Hospital[]>(this.hospitalUrl + 'all');
  }

  public getbyAccount(id: string): Observable<Hospital[]>{
    return this.http.get<Hospital[]>(this.hospitalUrl + `all/${id}`);
  }

  public update(hospital: Hospital): Observable<any>{
    return this.http.put<any>(this.hospitalUrl + `add/${hospital.id}`, hospital);
  }

  public delete(id: string): Observable<Hospital>{
    return this.http.delete<Hospital>(this.hospitalUrl + 'add' + `/${id}`);
  }

  public detail(id: string): Observable<Hospital>{
    return this.http.get<any>(this.hospitalUrl + `${id}`);
  }

}
