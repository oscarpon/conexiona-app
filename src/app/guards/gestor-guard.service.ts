import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GestorGuardService implements CanActivate{

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = this.tokenService.isGestor();
    if(!this.tokenService.getToken() || !roles){
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
}
