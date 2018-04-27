import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css'],
})
export class NumberComponent implements OnInit {

  @Input() public value: number;
  constructor() { }

  ngOnInit() {
  }

  // Set the value attribute
  setValue(_value: number) {
    this.value = _value;
  }

  // Get the value attribute
  getValue() {
    return this.value;
  }

  // Initializes the value for a new number component
  newNumberComponent(_value: number) {
    this.value = _value;
    return this;
  }

}
