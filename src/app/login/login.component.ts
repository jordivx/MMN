import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public settingsService: SettingsService,
    private router: Router,
    private user: UserService,
    private fire: AngularFireAuth) {

  }

  ngOnInit() {}

  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  loginUser() {
    this.fire.auth.signInWithEmailAndPassword(this.username + '@mmn.mmn', this.password).then(
      data => {
        this.user.setIsUserLoggedIn(true, this.username);
        this.user.checkUserConnection().then(
          x => {
            this.router.navigate(['/']);
          }
        ).catch(err => {
          console.log('User not logged');
        });

      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }

}

