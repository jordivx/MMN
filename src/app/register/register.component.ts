import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;

  constructor(public settingsService: SettingsService,
  public router:Router,
  private user:UserService,
  private fire:AngularFireAuth) { }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.username+'@mmn.mmn',this.password).then(
      data => {
        this.router.navigate(['/']);
      }
    ).catch( error => {
      console.log(error);
    });
  }

}
