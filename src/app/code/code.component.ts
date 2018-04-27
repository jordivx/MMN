import { Component, OnInit, Input } from '@angular/core';
import { NumberComponent } from '../number/number.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  private id: string;
  private values: NumberComponent[];
  @Input() private code: CodeComponent[];
  public codeValues: NumberComponent[] = new Array < NumberComponent > ();
  private user: UserComponent;
  private date: Date;
  private correct: number;
  private wrong: number;
  private checked: boolean;

  constructor() {}

  ngOnInit() {}

  newCodeComponent(_values: NumberComponent[], _user: UserComponent, _date: Date) {
    this.values = _values;
    this.user = _user;
    this.date = _date;
  }

  getId() {
    return this.id;
  }

  setId(_id: string) {
    this.id = _id;
  }

  getValues() {
    return this.values;
  }

  getStringValue() {
    let stringValue = '';
    this.values.forEach(value => {
      stringValue = stringValue.concat(value.getValue().toString());
    });
    return stringValue;
  }

  setValues(_values: NumberComponent[]) {
    this.values = _values;
  }

  addValue(_value: NumberComponent) {
    if (!this.values) {
      this.values = new Array < NumberComponent > ();
    }
    this.values.push(_value);
    this.codeValues = this.values;
  }

  getDate() {
    return this.date;
  }

  setDate(_newDate: Date) {
    this.date = _newDate;
  }

  getUser() {
    return this.user;
  }

  setUser(_user: UserComponent) {
    this.user = _user;
  }

  getCorrect() {
    return this.correct;
  }

  setCorrect(_correct: number) {
    this.correct = _correct;
  }

  getWrong() {
    return this.wrong;
  }

  setWrong(_wrong: number) {
    this.wrong = _wrong;
  }

  getChecked() {
    return this.checked;
  }

  setChecked(_checked: boolean) {
    this.checked = _checked;
  }
}

