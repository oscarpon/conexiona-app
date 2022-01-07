import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDoorOpen, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { textChangeRangeIsUnchanged } from 'typescript';







@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isAuthenticated = false;
  isAdministrator = false;
  isStockist = false;
  isGestorvar = false;
  faUser = faUser;
  faKey = faKey;
  faDoorOpen = faDoorOpen;
  userName ='';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogged();
    this.isAdmin();
    this.isReponedor();
    this.getUserName();
  }

  onLogOut(): void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean{
    return this.isAuthenticated = this.tokenService.isLogged();
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  isReponedor(): boolean{
    return this.isStockist = this.tokenService.isStockist();
  }

  isGestor(): boolean{
    return this.isGestorvar = this.tokenService.isGestor();
  }

  getUserName(): string{
    return this.userName = this.tokenService.getUserName();
  }



}
