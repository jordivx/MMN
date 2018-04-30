// Modules imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// Services imports
import { SettingsService } from '../../services/settings.service';
import { UserService } from '../../services/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;

  constructor(public settingsService: SettingsService,
    public router: Router,
    private user: UserService,
    private fire: AngularFireAuth,
    private db: AngularFireDatabase,
    private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {}

  // Function that calls the switch language function from the settings service
  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  // Create the user in firebase and navigates to the home view
  registerUser() {
    this.spinnerService.show();
    this.fire.auth.createUserWithEmailAndPassword(this.username + '@mmn.mmn', this.password).then(
      data => {
        const databaseUserObject = this.db.list('/users').push({
          username: this.username,
          password: this.password,
          totalGames: 0,
          wonGames: 0
        }).then(databaseUserAdded => {
          this.db.list('/users').set(databaseUserAdded.key,
            {
              userId: databaseUserAdded.key,
              username: this.username,
              password: this.password,
              totalGames: 0,
              wonGames: 0
            }).catch(error => {
              this.spinnerService.hide();
              console.log(error);
            });
          this.spinnerService.hide();
          this.router.navigate(['/']);
        });
      }
    ).catch(error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

}

