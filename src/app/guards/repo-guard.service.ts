import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RepoGuardService implements CanActivate{

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.isStockist();
    if(roles){
      this.realRol = 'reponedor';
    }
    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/index']);
      return false;
    }
    return true;
  }
}
