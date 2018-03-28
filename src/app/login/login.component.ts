import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public settingsService: SettingsService,
    private router:Router,
    private user:UserService) {

   }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  loginUser(){

    console.log(this.username, this.password);
    if(this.username=='admin' && this.password == 'admin') {
      this.user.setIsUserLoggedIn(true);
      this.router.navigate(['/']);
    }
  }

}
