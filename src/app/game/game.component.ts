import { Component, OnInit, Input } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { UserComponent } from '../user/user.component';
import { NumberComponent } from '../number/number.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() public codes:CodeComponent[];
  private user1:UserComponent;
  private user2:UserComponent;
  private startDate:Date;
  private finishDate:Date;
  private codesLengthArray:Array<Number>;

  inputCodeForm: FormGroup;

  constructor(private _formBuild: FormBuilder) { }

  ngOnInit() {
    this.codes = [];
    this.codesLengthArray=[1,2,3,4,5];
    this.newCode([1,2,3]);
    this.inputCodeForm = this._formBuild.group({
      inputNumbers: this._formBuild.array(
        this.addNInputFields()
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

  newCode(values:number[]) {
    let newCode = new CodeComponent();
    values.forEach(value => {
      let newNumberComponent = new NumberComponent();
      newNumberComponent.setValue(value);
      newCode.addValue(newNumberComponent)
    });
    this.codes.push(newCode);
  }
  
  submitNewCode(){
    let codeValues = new Array();
    this.inputCodeForm.value.inputNumbers.forEach(inputNumbers=>{
      codeValues.push(inputNumbers.inputNumber);
    });
    this.newCode(codeValues);
  }
}
