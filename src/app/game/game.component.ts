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

  private id:string;
  @Input() public codes:CodeComponent[];
  private myCodes:CodeComponent[];
  private opponentCodes:CodeComponent[];
  private user1:UserComponent;
  private user2:UserComponent;
  private user1Code:number[];
  private user2Code:number[];
  private startDate:Date;
  private editDate:Date;
  private finishDate:Date;
  private codesLength:number;
  private codesLengthArray:Array<Number>;
  private gameSubscription;
  private myTurn:boolean;
  private seeMyCodes:boolean=true;

  inputCodeForm: FormGroup;

  constructor(private _formBuild: FormBuilder,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private user:UserService) { 

      this.id = this.route.snapshot.paramMap.get('id');
      
      //If the game's id from the parameter is not valid, redirect to the games list
      if(this.id==null || this.id=="") {
        console.log("Invalid game's id.");
        this.router.navigate(['/gameList']);
      }

      this.db.object('/games/'+this.id).valueChanges().subscribe(
        (game:any) => {
          this.getGameCodesById(this.id); // This function fills the this.codes variable
          this.user1=game.user1;
          this.user2=game.user2;
          this.user1Code=game.user1code;
          this.user2Code=game.user2code;
          this.startDate=game.startDate;
          this.editDate=game.editDate;
          this.finishDate=game.finishDate;
          this.codesLength=game.codesLength;

          this.codesLengthArray=Array.apply( 0, { length: this.codesLength } );
          this.inputCodeForm = this._formBuild.group({
            inputNumbers: this._formBuild.array(
              this.addNInputFields()
            )
          });
        }
      );
    }

  ngOnInit() {
    this.inputCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        []
      )
    });
  }

  /** 
   * Function that adds as many formGroups to the formArray as characters has the code.
   * The "codesLengthArray" is defined to know which is the length of the codes of this 
   * session.
  */
  addNInputFields() {
    let inputFieldsArray = new Array();
    for(let i=0;i<this.codesLengthArray.length;i++){
      inputFieldsArray.push(
        this._formBuild.group({
          inputNumber: ['']
        })
      );
    }
    return inputFieldsArray;
  }
  createNewCode(values:number[], user:UserComponent, date:Date, correct:number, wrong:number, checked:boolean) {
    let newCode = new CodeComponent();
    values.forEach(value => {
      let newNumberComponent = new NumberComponent();
      newNumberComponent.setValue(value);
      newCode.addValue(newNumberComponent)
    });
    newCode.setUser(user);
    newCode.setDate(date);
    newCode.setCorrect(correct);
    newCode.setWrong(wrong);
    newCode.setChecked(checked);

    return newCode;
  }

  newCode(values:number[]) {
    let newCode = this.createNewCode(values,this.user.getUsername(),new Date(),0,0,false);
    this.addNewCodeDatabase(newCode);
  }
  
  submitNewCode(){
    let codeValues = new Array();
    this.inputCodeForm.value.inputNumbers.forEach(inputNumbers=>{
      codeValues.push(inputNumbers.inputNumber);
    });
    this.newCode(codeValues);
    // Reset the input fields
    this.inputCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        this.addNInputFields()
      )
    });
  }

  checkLength(maxLen:number,ele:ElementRef){
    console.log(maxLen);
    let fieldLength = ele.nativeElement.value.length;
    if(fieldLength <= maxLen){
        return true;
    }
    else
    {
      let str = ele.nativeElement.value;
      str = str.substring(0, str.length - 1);
      ele.nativeElement.value = str;
    }
  }

  addNewCodeDatabase(newCode:CodeComponent) {
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

  getGameCodesById(gameId:string) {
    let codeArray = new Array<CodeComponent>();
    let numberCode=new Array();
    let correctNumbers = 0;
    let wrongNumbers = 0;
    let codeUser = null;
    let codeDate = null;
    let codeChecked = false;

    let self = this;

    this.db.list('/codes', ref => 
      ref.orderByChild('gameId').equalTo(gameId))
      .valueChanges()
      .subscribe(gameCodes => {
        codeArray=[];
        gameCodes.forEach((code:any)=>{
          numberCode = code.values.split('');
          for(let x=0; x<numberCode.length; x++) {
            numberCode[x] = parseInt(numberCode[x]);
          }

          correctNumbers = code.correct;
          wrongNumbers = code.wrong;
          let userForCode = new UserComponent();
          userForCode.setUsername(code.user);
          codeUser = userForCode;
          codeDate = new Date(code.date);
          codeChecked = code.checked;

          codeArray.push(self.createNewCode(numberCode,codeUser,codeDate,correctNumbers,wrongNumbers,codeChecked));
        });
        //Sort "My Games List" by edit time to have the latest on the top
        codeArray.sort((a: any, b: any) => 
          new Date(b.getDate()).getTime() - new Date(a.getDate()).getTime()
        );
        this.codes=codeArray;
        if(this.codes.length>0) {
          this.myTurn = (this.codes[0].getUser().getUsername() != this.user.getUsername());
        } else {
          this.myTurn = true;
        }
        this.myCodes = this.codes.filter(
          (code:CodeComponent) => code.getUser().getUsername() == this.user.getUsername()
        );
        this.opponentCodes = this.codes.filter(
          (code:CodeComponent) => code.getUser().getUsername() != this.user.getUsername()
        );
    });
  }

  seeMyCodesTab() {
    this.seeMyCodes=true;
  }

  seeOpponentCodesTab() {
    this.seeMyCodes=false;
  }
}
