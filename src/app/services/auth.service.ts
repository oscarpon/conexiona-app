import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  public new(newUser: NewUser, id: string): Observable<any>{
    return this.http.post<any>(this.authUrl + `${id}/new`, newUser);
  }

  public login(login: LoginUser): Observable<any>{
    return this.http.post<any>(this.authUrl + 'login', login);
  }

  public all(): Observable<NewUser[]>{
    return this.http.get<NewUser[]>(this.authUrl + 'all');
  }

  public delete(id: string): Observable<Account>{
    return this.http.delete<Account>(this.authUrl + 'add' + `/${id}`);
  }

  public update(user: NewUser): Observable<any>{
    return this.http.put<any>(this.authUrl + `add/${user.id}`, user);
  }

  public detail(id: string): Observable<NewUser>{
    return this.http.get<any>(this.authUrl + `all/${id}`);
  }

  public updatePassword(newPassword: string, oldPassword: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('newpassword', newPassword);
    body = body.set('oldpassword', oldPassword);
    return this.http.post<any>(this.authUrl + 'update/password', body);
  }

  public listByAccount(id: string): Observable<NewUser[]>{
    return this.http.get<NewUser[]>(this.authUrl + `list/${id}`);
  }

  public refreshtoken(dto: JwtDto): Observable<any>{
    return this.http.post<JwtDto>(this.authUrl + 'refreshtoken', dto);
  }

  public forgotPassword(userEmail: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('userEmail', userEmail);
    return this.http.post<any>(this.authUrl + 'forgot-password', body);
  }


  
}
