import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';

@Injectable()
export class SettingsService {

  private codeLength: number;
  public showHelpDialog = false;
  public showEndGameDialog = false;
  public endGameTitle = '';
  public endGameMessage = '';
  private gameId = '';

  constructor(private translate: TranslateService,
    private db: AngularFireDatabase,
    private user: UserService) {
    const storedUser: string = localStorage.getItem('language');
    if (storedUser) {
      translate.setDefaultLang(storedUser);
    } else {
      translate.setDefaultLang('en');
    }
  }

  getCodeLength() {
    return this.codeLength;
  }

  setCodeLength(_newCodeLength: number) {
    if (_newCodeLength === 0) {
      this.codeLength = environment.codeMaxLength;
    } else {
      this.codeLength = _newCodeLength;
      localStorage.setItem('codeLength', _newCodeLength.toString());
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  openHelpDialog() {
    this.showHelpDialog = true;
  }

  closeHelpDialog() {
    this.showHelpDialog = false;
  }

  openEndGameDialog(gameId: string, _title: string, _message: string) {
    this.endGameTitle = _title;
    this.endGameMessage = _message;
    this.showEndGameDialog = true;
    this.gameId = gameId;
  }

  closeEndGameDialog() {
    this.showEndGameDialog = false;
    this.finishGameInDatabase();
  }

  finishGameInDatabase() {
    this.db.object('/games/' + this.gameId).valueChanges().subscribe((game: any) => {
      const newGameData = {
        user1: game.user1,
        user2: game.user2,
        user1Code: game.user1Code,
        user2Code: game.user2Code,
        startDate: game.startDate,
        editDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        codesLength: game.codesLength,
        turnUsername: game.turnUsername,
        winner: (this.user.getUsername() === game.user1 ? game.user2 : game.user1)
      };
      this.db.list('/games').set(this.gameId, newGameData);
      this.updateUserInDatabase(newGameData.user1, +(newGameData.user1 === newGameData.winner));
      this.updateUserInDatabase(newGameData.user2, +(newGameData.user2 === newGameData.winner));
    });
  }

  updateUserInDatabase(_user: string, _won: number) {
    this.db.list('/users', ref =>
        ref.orderByChild('username').equalTo(_user))
      .valueChanges()
      .subscribe(user => {
        const userObject: any = user[0];
        const updatedUser = {
          userId: userObject.userId,
          username: userObject.username,
          password: userObject.password,
          totalGames: +userObject.totalGames + 1,
          wonGames: +userObject.wonGames + _won
        };
        this.db.list('/users').set(userObject.userId, updatedUser);
      });
  }
}
