import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class RoleGuardService implements CanActivate{

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean{

    const expectedRole = route.data.expectedRole;

    const roles = this.tokenService.getRoles();

    if(!this.tokenService.isLogged() || (roles.indexOf(expectedRole) < 0)){
      this.toastr.info("Serás redirigido al inicio", "NO TIENES PERMISOS")
      this.router.navigate(['/index']);
      return false;
    }
    return true;    
  }
}