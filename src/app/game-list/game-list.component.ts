import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FirebaseOperation } from 'angularfire2/database/interfaces';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { GameComponent } from '../game/game.component';
import { UserComponent } from '../user/user.component';

import { SettingsService } from '../settings.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  // Variable declarations
  private gameList:GameComponent[];
  private user1:UserComponent;
  private user2:UserComponent;
  private gameListSubscription;
  private gameListData: object[] = [];
  private myGamesListData: object[] = [];
  private freeGamesListData: object[] = [];
  private nMyGames: number = 0;
  private nFreeGames: number = 0;

  /*
  * Constructor for the game list component
  */
  constructor(private db: AngularFireDatabase,
    private router:Router,
    public settingsService: SettingsService,
    private user:UserService) {
    
    //Get the games from the database
    this.gameListSubscription = this.db.list('/games').snapshotChanges().subscribe(
      data => {
        //Map the objects to have the uid and the data
        data.map(fireGameObject => {
          let objectData = fireGameObject.payload.val();
          let objectId = fireGameObject.payload.key;
          this.gameListData.push({
            id: objectId,
            codes: objectData.codes,
            user1: objectData.user1,
            user2: objectData.user2,
            user1Code: objectData.user1Code,
            user2Code: objectData.user2Code,
            startDate: objectData.startDate,
            editDate: objectData.editDate,
            finishDate: objectData.finishDate,
            codesLength: objectData.codesLength
          });
        });
        // Filter the results by the current user to have the games associated with it.
        this.myGamesListData = this.gameListData.filter(
          (game:any) => 
            game.user1===this.user.getUsername() || 
            game.user2===this.user.getUsername()
        );
        //Sort "My Games List" by edit time to have the latest on the top
        this.myGamesListData.sort((a: any, b: any) => 
          new Date(b.editDate).getTime() - new Date(a.editDate).getTime()
        )
        this.nMyGames = this.myGamesListData.length; 
        // Filter the results not associated with the current user and with some empty place
        this.freeGamesListData = this.gameListData.filter(
          (game:any) => 
            (game.user1==="" || game.user2==="") && 
            game.user1!=this.user.getUsername() && 
            game.user2!=this.user.getUsername() &&
            game.user1Code != ""
        );
        //Sort "Free Games List"  by edit time to have the latest on the top
        this.freeGamesListData.sort((a: any, b: any) => 
          new Date(b.editDate).getTime() - new Date(a.editDate).getTime()
        )
        this.nFreeGames = this.freeGamesListData.length;
      }
    );
  }

  ngOnInit() {
  }

  newGame() {
    let newGameObject = this.db.list('/games').push({
      codes: '',
      user1: this.user.getUsername(),
      user2: '',
      user1Code: '',
      user2Code: '',
      startDate: new Date().toISOString(),
      editDate: new Date().toISOString(),
      finishDate: '',
      codesLength:this.settingsService.getCodeLength()
    }).then( data => {
      this.router.navigate(['/game',data.key]);
    });
  }

  openGame(gameId:string) {
    this.router.navigate(['/game',gameId]);
  }

  joinGame(game:any) {
    let gameId = game.id;
    let newData={
      codes: game.codes,
      user1: game.user1,
      user2: this.user.getUsername(),
      user1Code: game.user1Code,
      user2Code: '',
      startDate: game.startDate,
      editDate: new Date().toISOString(),
      finishDate: '',
      codesLength:game.codesLength
    };
    this.db.list('/games').set(gameId,newData);
    this.router.navigate(['/game',gameId]);
  }
}
