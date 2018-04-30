// Modules imports
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FirebaseOperation } from 'angularfire2/database/interfaces';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
// Components imports
import { GameComponent } from '../game/game.component';
import { UserComponent } from '../user/user.component';
// Services imports
import { SettingsService } from '../settings.service';
import { UserService } from '../user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  // Variable declarations
  private gameList: GameComponent[];
  private user1: UserComponent;
  private user2: UserComponent;
  private gameListSubscription;
  private gameListData: object[] = [];
  private myGamesListData: object[] = [];
  private freeGamesListData: object[] = [];
  private nMyGames = 0;
  private nFreeGames = 0;

  /*
   * Constructor for the game list component
   */
  constructor(private db: AngularFireDatabase,
    private router: Router,
    public settingsService: SettingsService,
    private user: UserService,
    private spinnerService: Ng4LoadingSpinnerService) {

    // Get the games from the database
    this.spinnerService.show();
    this.gameListSubscription = this.db.list('/games').snapshotChanges().subscribe(
      data => {
        // Map the objects to have the uid and the data
        data.map(fireGameObject => {
          const objectData = fireGameObject.payload.val();
          const objectId = fireGameObject.payload.key;
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
            codesLength: objectData.codesLength,
            myTurn: (objectData.turnUsername === this.user.getUsername())
          });
        });
        // Filter the results by the current user to have the games associated with it.
        this.myGamesListData = this.gameListData.filter(
          (game: any) =>
          game.user1 === this.user.getUsername() ||
          game.user2 === this.user.getUsername()
        );
        // Sort "My Games List" by edit time to have the latest on the top
        this.myGamesListData.sort((a: any, b: any) =>
          new Date(b.editDate).getTime() - new Date(a.editDate).getTime()
        );
        this.nMyGames = this.myGamesListData.length;
        // Filter the results not associated with the current user and with some empty place
        this.freeGamesListData = this.gameListData.filter(
          (game: any) =>
          (game.user1 === '' || game.user2 === '') &&
          game.user1 !== this.user.getUsername() &&
          game.user2 !== this.user.getUsername() &&
          game.user1Code !== ''
        );
        // Sort "Free Games List"  by edit time to have the latest on the top
        this.freeGamesListData.sort((a: any, b: any) =>
          new Date(b.editDate).getTime() - new Date(a.editDate).getTime()
        );
        this.nFreeGames = this.freeGamesListData.length;
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  // Function to push a new game object into the database and navigate to the game view
  newGame() {
    const newGameObject = this.db.list('/games').push({
      codes: '',
      user1: this.user.getUsername(),
      user2: '',
      user1Code: '',
      user2Code: '',
      startDate: new Date().toISOString(),
      editDate: new Date().toISOString(),
      finishDate: '',
      codesLength: this.settingsService.getCodeLength()
    }).then(data => {
      this.router.navigate(['/game', data.key]);
    });
  }

  // Function to navigate to the chosen game view
  openGame(gameId: string) {
    this.router.navigate(['/game', gameId]);
  }

  // Function that adds the user to an existing game, updates the database object and navigates to the game view
  joinGame(game: any) {
    const gameId = game.id;
    const newData = {
      codes: game.codes,
      user1: game.user1,
      user2: this.user.getUsername(),
      user1Code: game.user1Code,
      user2Code: '',
      startDate: game.startDate,
      editDate: new Date().toISOString(),
      finishDate: '',
      codesLength: game.codesLength
    };
    this.db.list('/games').set(gameId, newData);
    this.router.navigate(['/game', gameId]);
  }
}

