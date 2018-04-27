import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private username: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  logout() {
    this.userService.logout();
  }

}
