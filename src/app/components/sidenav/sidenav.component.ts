import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBoxOpen, faBuilding, faHome, faHospital, faIdCardAlt, faPills, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { textChangeRangeIsUnchanged } from 'typescript';





@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAuthenticated = false;
  isAdministrator = false;
  isStockist = false;
  isGestorvar = false;
  faHome = faHome;
  faUsers = faUsers;
  faIdCardAlt = faIdCardAlt;
  faBuilding = faBuilding;
  faHospital = faHospital;
  faPills = faPills;
  faBoxOpen = faBoxOpen;
  show = true;
  myAccountId: string;
  userName = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogged();
    this.isAdmin();
    this.isReponedor();
    this.isGestor();
    this.showSide();
    this.getAccount();
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

  showSide(): boolean{
    if(this.show === true){
      return false;
    }else{
      return true;
    }
  }

  getAccount(): string{
    return this.myAccountId = this.tokenService.getAccount();
  }

  

}
