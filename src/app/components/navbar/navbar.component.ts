// Modules imports
import { Component, OnInit } from '@angular/core';
// Services imports
import { UserService } from '../../services/user.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
  private settingsService: SettingsService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
