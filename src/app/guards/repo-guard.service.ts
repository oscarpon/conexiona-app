import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RepoGuardService implements CanActivate{

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const roles = this.tokenService.isStockist();
    if(!this.tokenService.getToken() || !roles){
      this.toastr.error("No tienes permisos para inciar la reposición");
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
}
