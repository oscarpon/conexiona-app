import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Replacement } from '../models/replacement';

@Injectable({
  providedIn: 'root'
})
export class RepositionService {

  replacementUrl = environment.replacementUrl;

  constructor(
    private http: HttpClient
    ) { }

  public new(newReplacement: Replacement): Observable<any>{
    let params = new HttpParams();
    for(let item of newReplacement.replacementItems){
      params.set('productId', item.product);
      params.set('cantidad', item.quantity);
    }
    return this.http.post<any>(this.replacementUrl + `add`, newReplacement, {
      params: params
    });
  }

  public exportData(id: string): Observable<Blob>{
    return this.http.get(this.replacementUrl + `export-data/pdf/${id}`, {responseType: 'blob'});
  }

}
