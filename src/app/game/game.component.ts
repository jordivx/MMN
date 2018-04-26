// tslint:disable:radix
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { UserComponent } from '../user/user.component';
import { NumberComponent } from '../number/number.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // Variable declarations
  private id: string;
  @Input() public codes: CodeComponent[];
  private myCodes: CodeComponent[];
  private opponentCodes: CodeComponent[];
  private user1: UserComponent;
  private user2: UserComponent;
  private user1Code: number;
  private user2Code: number;
  private startDate: Date;
  private editDate: Date;
  private finishDate: Date;
  private codesLength: number;
  private codesLengthArray: Array < Number > ;
  private gameSubscription;
  private myTurn: boolean;
  private seeMyCodes = true;
  private gameInitialized = false;
  private gameInitializedByYou = false;
  private havePendingChecking = false;
  private correctGuess = 0;
  private wrongGuess = 0;

  inputCodeForm: FormGroup;
  myCodeForm: FormGroup;

  constructor(private _formBuild: FormBuilder,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private user: UserService) {

    // Get the game id from the parameter
    this.id = this.route.snapshot.paramMap.get('id');

    // If the game's id from the parameter is not valid, redirect to the games list
    if (this.id == null || this.id === '') {
      console.log('Invalid game\'s id.');
      this.router.navigate(['/gameList']);
    }

    // Get the game data from database
    this.db.object('/games/' + this.id).valueChanges().subscribe(
      (game: any) => {
        this.getGameCodesById(this.id); // This function fills the this.codes variable
        const user1 = new UserComponent();
        user1.setUsername(game.user1);
        this.user1 = user1;
        const user2 = new UserComponent();
        user2.setUsername(game.user2);
        this.user2 = user2;
        this.user1Code = game.user1Code;
        this.user2Code = game.user2Code;
        this.startDate = game.startDate;
        this.editDate = game.editDate;
        this.finishDate = game.finishDate;
        this.codesLength = game.codesLength;

        // Checks if the game has been initialized and if has been initialized by the current user or not.
        this.checkGameInitialized(game.user1Code, game.user2Code);

        // Initialize the length array to know how many positions have to have the codes
        this.codesLengthArray = Array.apply(0, {
          length: this.codesLength
        });

        // Initialize the code forms empty with the correct positions
        this.resetInputCodeFormFields();
        this.resetMyCodeFormFields();
      }
    );
  }


  ngOnInit() {
    // Initialize the codes forms empty to avoid null pointers.
    this.inputCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        []
      )
    });
    this.myCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        []
      )
    });
  }

  // Checks if the game has been initialized and if has been initialized by the current user or not.
  checkGameInitialized(user1Code, user2Code) {
    this.gameInitialized = (user1Code !== '' && user2Code !== '');
    if (!this.gameInitialized) {
      if (this.user1.getUsername() === this.user.getUsername()) {
        if (user1Code === '') {
          this.gameInitializedByYou = false;
        } else {
          this.gameInitializedByYou = true;
        }
      } else {
        if (this.user2.getUsername() === this.user.getUsername()) {
          if (user2Code === '') {
            this.gameInitializedByYou = false;
          } else {
            this.gameInitializedByYou = true;
          }
        }
      }
    }
  }

  /**
   * Function that adds as many formGroups to the formArray as characters has the code.
   * The "codesLengthArray" is defined to know which is the length of the codes of this
   * session.
   */
  addNInputFields() {
    const inputFieldsArray = new Array();
    for (let i = 0; i < this.codesLengthArray.length; i++) {
      inputFieldsArray.push(
        this._formBuild.group({
          inputNumber: ['']
        })
      );
    }
    return inputFieldsArray;
  }

  // Create a code object from the data obtained
  createNewCode(values: number[], user: UserComponent, date: Date, correct: number, wrong: number, checked: boolean) {
    const newCode = new CodeComponent();
    values.forEach(value => {
      const newNumberComponent = new NumberComponent();
      newNumberComponent.setValue(value);
      newCode.addValue(newNumberComponent);
    });
    newCode.setUser(user);
    newCode.setDate(date);
    newCode.setCorrect(correct);
    newCode.setWrong(wrong);
    newCode.setChecked(checked);

    return newCode;
  }

  // Parse the code into a code object and save it to the database
  newCode(values: number[]) {
    const newCode = this.createNewCode(values, this.user.getUsername(), new Date(), 0, 0, false);
    this.addNewCodeDatabase(newCode);
  }

  // Get the code guess from the user, parse it to a code object, save it to the database and reset the input fields
  submitNewCode() {
    // Get the code guess from the user
    const codeValues = this.getInputCodeFormValues();
    // Parse the code to a code object and save it to the database
    this.newCode(codeValues);
    // Reset the code input fields
    this.resetInputCodeFormFields();
  }

  // Reset the code input fields
  resetInputCodeFormFields() {
    this.inputCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        this.addNInputFields()
      )
    });
  }

  // Get the code guess from the user
  getInputCodeFormValues() {
    const codeValues = new Array();
    this.inputCodeForm.value.inputNumbers.forEach(inputNumbers => {
      codeValues.push(inputNumbers.inputNumber);
    });
    return codeValues;
  }

  // Get the first code and associate it with the user in the database
  submitFirstCode() {

    const gameId = this.id;

    // Create an object with the game object to mantain the old information and only update the necessary fields
    const newData = {
      codes: '',
      user1: this.user1.getUsername(),
      user2: this.user2.getUsername(),
      user1Code: this.user1Code,
      user2Code: this.user2Code,
      startDate: this.startDate,
      editDate: new Date().toISOString(),
      finishDate: '',
      codesLength: this.codesLength
    };

    // Obtain the user input parsed to a number
    const codeValues: number = this.getMyCodeFormValues();

    // Associate the code to the user 1 or 2 depending on which user is using
    if (this.user1.getUsername() === this.user.getUsername()) {
      newData.user1Code = codeValues;
    } else {
      if (this.user2.getUsername() === this.user.getUsername()) {
        newData.user2Code = codeValues;
      }
    }

    // Update the database with the new object (only has been modified user1Code or user2Code)
    this.db.list('/games').set(gameId, newData);
  }

  // Reset the users code input fields
  resetMyCodeFormFields() {
    this.myCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        this.addNInputFields()
      )
    });
  }

  // Get the code from the user and parse it to a number
  getMyCodeFormValues() {
    let codeValuesString = '';
    this.myCodeForm.value.inputNumbers.forEach(inputNumbers => {
      codeValuesString = codeValuesString.concat(inputNumbers.inputNumber);
    });
    return (parseInt(codeValuesString));
  }

  // Add the new code introduced to the database
  addNewCodeDatabase(newCode: CodeComponent) {
    this.db.list('/codes').push({
      gameId: this.id,
      values: newCode.getStringValue(),
      user: this.user.getUsername(),
      date: new Date().toISOString(),
      correct: 0,
      wrong: 0,
      checked: false
    });
  }

  // Having the game id, get the codes from database, parse them into code objects and move them to the scope
  getGameCodesById(gameId: string) {
    let codeArray = new Array < CodeComponent > ();

    const self = this;

    this.db.list('/codes', ref =>
        ref.orderByChild('gameId').equalTo(gameId))
      .valueChanges()
      .subscribe(gameCodes => {
        // Get the codes and parse into code objects
        codeArray = [];
        gameCodes.forEach((code: any) => {
          codeArray.push(self.createNewCodeFromDatabase(code));
        });

        // Sort "My Games List" by edit time to have the latest on the top
        codeArray.sort((a: any, b: any) =>
          new Date(b.getDate()).getTime() - new Date(a.getDate()).getTime()
        );

        // Save the ordered list into the scope
        this.codes = codeArray;

        // Checks if is your turn or not to show one thing or another in the screen
        this.checkTurn();

        this.checkHavePendingChecking();

        // Filter the codes into 2 groups, your codes and the opponent ones
        this.myCodes = this.codes.filter(
          (code: CodeComponent) => code.getUser().getUsername() === this.user.getUsername()
        );
        this.opponentCodes = this.codes.filter(
          (code: CodeComponent) => code.getUser().getUsername() !== this.user.getUsername()
        );
      });
  }

  // Creates a new code object from the info obtained from database
  createNewCodeFromDatabase(code: any) {
    let numberCode = new Array();
    let correctNumbers = 0;
    let wrongNumbers = 0;
    let codeUser = null;
    let codeDate = null;
    let codeChecked = false;

    numberCode = code.values.split('');
    for (let x = 0; x < numberCode.length; x++) {
      numberCode[x] = parseInt(numberCode[x]);
    }
    correctNumbers = code.correct;
    wrongNumbers = code.wrong;
    const userForCode = new UserComponent();
    userForCode.setUsername(code.user);
    codeUser = userForCode;
    codeDate = new Date(code.date);
    codeChecked = code.checked;

    return this.createNewCode(numberCode, codeUser, codeDate, correctNumbers, wrongNumbers, codeChecked);
  }

  // Checks if is your turn or not to show one thing or another in the screen
  checkTurn() {
    if (this.codes.length > 0) {
      this.myTurn = (this.codes[0].getUser().getUsername() !== this.user.getUsername());
    } else {
      if ((this.user1.getUsername() === this.user.getUsername()) ||
        (this.user2.getUsername() === this.user.getUsername() &&
        this.user1Code.toString().length > 0 &&
        this.user2Code.toString().length === 0)) {
        this.myTurn = true;
      } else {
        this.myTurn = false;
      }
    }
  }

  // Function to check if the last code is pending to check by you
  checkHavePendingChecking() {
    if (this.codes.length > 0) {
      if (this.codes[0].getUser().getUsername() === this.user.getUsername()) {
        this.havePendingChecking = false;
      } else {
        if (this.codes[0].getChecked()) {
          this.havePendingChecking = false;
        } else {
          this.havePendingChecking = true;
        }
      }
    } else {
      this.havePendingChecking = false;
    }
  }

  // Function to change the tabs variable to show "myCodes" or the "opponentCodes"
  seeCodesTab(tab: string) {
    if (tab === 'myCodes') {
      this.seeMyCodes = true;
    } else {
      this.seeMyCodes = false;
    }
  }

  decreaseCorrectGuess() {
    this.correctGuess--;
  }

  disableMinusCorrectButton() {
    return (this.correctGuess <= 0);
  }

  increaseCorrectGuess() {
    this.correctGuess++;
  }

  disablePlusCorrectButton() {
    return (this.correctGuess >= this.codesLength);
  }

  decreaseWrongGuess() {
    this.wrongGuess--;
  }

  disableMinusWrongButton() {
    return (this.wrongGuess <= 0);
  }

  increaseWrongGuess() {
    this.wrongGuess++;
  }

  disablePlusWrongButton() {
    return (this.wrongGuess >= this.codesLength);
  }
}

