import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { reject } from 'q';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor( private fire:AngularFireAuth) {
    this.isUserLoggedIn = false;
  }

  setIsUserLoggedIn(_value:boolean, _username:string){
    if(_value){
      this.isUserLoggedIn=true;
      this.username=_username;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  getIsUserLoggedIn(){
    return this.isUserLoggedIn;
  }

  checkUserConnection():Promise<any> {
    return new Promise(resolve => {
      this.fire.authState.subscribe(
        res => {
          if(res && res.uid) {
            this.isUserLoggedIn=true;
            this.username=res.email.split("@")[0];
            resolve(true);
          } else {
            this.isUserLoggedIn=false;
            reject(true);
          }
        }
      )
    });
  }

}
