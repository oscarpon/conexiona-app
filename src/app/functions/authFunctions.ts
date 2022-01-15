import { Injectable} from '@angular/core';
import { TokenService  } from "../services/token.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthFunctions{

    constructor(
        private tokenService: TokenService
    ){}

    public isLogged(): boolean{
        return this.tokenService.isLogged();
    }

}

