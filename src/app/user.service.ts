import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setIsUserLoggedIn(_value:boolean){
    this.isUserLoggedIn = _value;
  }

  getIsUserLoggedIn(){
    return this.isUserLoggedIn;
  }

}
