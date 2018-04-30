import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { reject } from 'q';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor(private fire: AngularFireAuth, private router: Router) {
    this.isUserLoggedIn = this.getIsUserLoggedIn();
  }

  setIsUserLoggedIn(_value: boolean, _username: string) {
    if (_value) {
      this.username = _username;
      localStorage.setItem('username', _username);
    }
    this.isUserLoggedIn = _value;
  }

  getIsUserLoggedIn() {
    const storedUser: string = localStorage.getItem('username');
    if (storedUser) {
      this.isUserLoggedIn = true;
      this.username = storedUser;
    } else {
      this.isUserLoggedIn = false;
    }
    return this.isUserLoggedIn;
  }

  checkUserConnection(): Promise < any > {
    return new Promise(resolve => {
      this.fire.authState.subscribe(
        res => {
          if (res && res.uid) {
            this.isUserLoggedIn = true;
            this.username = res.email.split('@')[0];
            resolve(true);
          } else {
            this.isUserLoggedIn = false;
            reject(true);
          }
        }
      );
    });
  }

  getUsername() {
    return this.username;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('language');
    this.isUserLoggedIn = false;
    this.router.navigate(['login']);
  }
}

