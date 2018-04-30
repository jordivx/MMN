// Modules imports
import { Component, OnInit } from '@angular/core';
// Services imports
import { UserService } from '../../services/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private username: string;
  private totalGames: number;
  private wonGames: number;

  constructor(private userService: UserService,
    private db: AngularFireDatabase) {
    }

  ngOnInit() {
    this.username = this.userService.getUsername();
    this.db.list('/users', ref =>
      ref.orderByChild('username').equalTo(this.username))
    .valueChanges()
    .subscribe(user => {
      const userFromDatabase: any = user[0];
      if (userFromDatabase) {
        this.totalGames = +userFromDatabase.totalGames || 0;
        this.wonGames = +userFromDatabase.wonGames || 0;
      }
    });
  }

  logout() {
    this.userService.logout();
  }

}
