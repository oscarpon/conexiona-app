import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAdministrator = false;
  isGestorVar = false;
  isTablet = false;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit()  {
    this.isAdmin();
    this.isGestor();
    this.isTabletFunc();
  }

  isAdmin(): boolean{
    return this.isAdministrator = this.tokenService.isAdmin();
  }

  isGestor(): boolean{
    return this.isGestorVar = this.tokenService.isGestor();
  }

  isTabletFunc(): boolean{
    return this.isTablet = this.tokenService.isTablet();
  }


}
