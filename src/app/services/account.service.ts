import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountUrl = environment.accountUrl;
  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.accountUrl + 'all');
  }

  public save(account: Account): Observable<any>{
    return this.httpClient.post<any>(this.accountUrl + 'add', account)
  }

  public delete(id: String): Observable<Account>{
    return this.httpClient.delete<Account>(this.accountUrl + 'add' + `/${id}`);
  }

  public update(account: Account): Observable<any>{
    return this.httpClient.put<any>(this.accountUrl + `add/${account.id}`, account);
  }

  public detail(id: String): Observable<Account>{
    return this.httpClient.get<any>(this.accountUrl + `all/${id}`);
  }

  

}
