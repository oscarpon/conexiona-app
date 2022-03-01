import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class RoleGuardService implements CanActivate{

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean{

    const expectedRole = route.data.expectedRole;

    const roles = this.tokenService.getRoles();

    if(!this.tokenService.isLogged() || (roles.indexOf(expectedRole) < 0)){
      this.router.navigate(['/index']);
      return false;
    }
    return true;    
  }
}