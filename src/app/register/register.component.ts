// Modules imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// Services imports
import { SettingsService } from '../settings.service';
import { UserService } from '../user.service';

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
    private fire: AngularFireAuth) {}

  ngOnInit() {}

  // Function that calls the switch language function from the settings service
  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  // Create the user in firebase and navigates to the home view
  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.username + '@mmn.mmn', this.password).then(
      data => {
        this.router.navigate(['/']);
      }
    ).catch(error => {
      console.log(error);
    });
  }

}

