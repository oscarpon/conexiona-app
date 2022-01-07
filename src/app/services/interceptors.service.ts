import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtDto } from '../models/jwt-dto';
import { AuthService } from './auth.service';

const AUTHORIZATION = 'Authorization';



@Injectable({
  providedIn: 'root'
})
export class ProdInterceptor implements HttpInterceptor {
  
  constructor(
    private tokenService: TokenService, 
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
    ){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    if(!this.tokenService.isLogged()){
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();
    
    intReq = this.addToken(req, token);
    
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401){
        const jwt: JwtDto = new JwtDto(this.tokenService.getToken());
        return this.authService.refreshtoken(jwt).pipe(concatMap((data: any) => {
          console.log('refreshing... sesion token');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }))
      }else{
        //this.tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any>{
    return req.clone({headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)});
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptor, multi:true}];
