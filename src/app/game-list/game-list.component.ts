import { Component, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { UserComponent } from '../user/user.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { UserService } from '../user.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private gameList:GameComponent[];
  private user1:UserComponent;
  private user2:UserComponent;

  private gameListSubscription;
  private gameListData: object[] = [];
  private myGamesListData: object[] = [];
  private freeGamesListData: object[] = [];

  constructor(private db: AngularFireDatabase,
    private router:Router,
    public settingsService: SettingsService,
    private user:UserService) {
    this.gameListSubscription = this.db.list('/games').valueChanges().subscribe(
      data => {
        this.gameListData = data;
        this.myGamesListData = data.filter(
          (game:any) => 
            game.user1===this.user.getUsername() || 
            game.user2===this.user.getUsername()
        );
        this.freeGamesListData = data.filter(
          (game:any) => 
            (game.user1==="" || game.user2==="") && 
            game.user1!=this.user.getUsername() && 
            game.user2!=this.user.getUsername()
        );
      }
    );
    console.log(this.gameListSubscription);
  }

  ngOnInit() {
  }

  newGame() {
    this.db.list('/games').push({
      codes: '',
      user1: this.user.getUsername(),
      user2: '',
      startDate: new Date().toISOString(),
      finishDate: '',
      codesLengthArray:this.settingsService.getCodeLength()
    }).then( () => {/*Game pushed into DB*/});
    this.router.navigate(['/game']);
  }

  openGame() {
    
  }
}
