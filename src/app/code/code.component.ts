import { Component, OnInit } from '@angular/core';
import { NumberComponent } from '../number/number.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  private values:NumberComponent[];
  private user:UserComponent;
  private date:Date;

  constructor() { }

  ngOnInit() {
  }

}
