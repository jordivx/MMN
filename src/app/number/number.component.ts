import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css'],
})
export class NumberComponent implements OnInit {
  
  @Input() public value:number;
  constructor() { }

  ngOnInit() {
  }

  setValue(_value:number) {
    this.value=_value;
  }

  newNumberComponent(_value:number) {
    this.value=_value;
    return this;
  }

}
