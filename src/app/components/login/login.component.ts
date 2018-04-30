// Modules imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// Services imports
import { SettingsService } from '../../services/settings.service';
import { UserService } from '../../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    private fire: AngularFireAuth,
    private spinnerService: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {}

  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  loginUser() {
    this.spinnerService.show();
    this.fire.auth.signInWithEmailAndPassword(this.username + '@mmn.mmn', this.password).then(
      data => {
        this.user.setIsUserLoggedIn(true, this.username);
        this.user.checkUserConnection().then(
          x => {
            this.spinnerService.hide();
            this.router.navigate(['/']);
          }
        ).catch(err => {
          this.spinnerService.hide();
          console.log('User not logged');
        });

      }
    ).catch(
      error => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

}

