import { Component, OnInit, Input } from '@angular/core';
import { NumberComponent } from '../number/number.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  @Input() public values:NumberComponent[];
  public codeValues:NumberComponent[]=new Array<NumberComponent>();
  private user:UserComponent;
  private date:Date;

  constructor() {}

  ngOnInit() {
  }

  newCodeComponent(_values:NumberComponent[],_user:UserComponent,_date:Date) {
    this.values = _values;
    this.user = _user;
    this.date = _date;
  }

  getValues() {
    return this.values;
  }

  getStringValue() {
    let stringValue:string = "";
    this.values.forEach(value=>{
      stringValue=stringValue.concat(value.getValue().toString());
    })
    return stringValue;
  }

  setValues(_values:NumberComponent[]) {
    this.values = _values;
  }

  addValue(_value:NumberComponent) {
    if(!this.values){
      this.values=new Array<NumberComponent>();
    }
    this.values.push(_value);
    this.codeValues = this.values;
  }

}
