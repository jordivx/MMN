import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { UserComponent } from '../user/user.component';
import { NumberComponent } from '../number/number.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private id:string;
  @Input() public codes:CodeComponent[];
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

  inputCodeForm: FormGroup;

  constructor(private _formBuild: FormBuilder,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase) { 

      this.id = this.route.snapshot.paramMap.get('id');
      
      //If the game's id from the parameter is not valid, redirect to the games list
      if(this.id==null || this.id=="") {
        console.log("Invalid game's id.");
        this.router.navigate(['/gameList']);
      }

      this.db.object('/games/'+this.id).valueChanges().subscribe(
        (game:any) => {
          this.codes=[];
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

  createNewCode(values:number[]) {
    let newCode = new CodeComponent();
    values.forEach(value => {
      let newNumberComponent = new NumberComponent();
      newNumberComponent.setValue(value);
      newCode.addValue(newNumberComponent)
    });
    return newCode;
  }

  newCode(values:number[]) {
    let newCode = this.createNewCode(values);
    this.codes.push(newCode);
  }
  
  submitNewCode(){
    let codeValues = new Array();
    this.inputCodeForm.value.inputNumbers.forEach(inputNumbers=>{
      codeValues.push(inputNumbers.inputNumber);
    });
    this.newCode(codeValues);
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
}
