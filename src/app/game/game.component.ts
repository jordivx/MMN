import { Component, OnInit, Input } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { UserComponent } from '../user/user.component';
import { NumberComponent } from '../number/number.component';

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

  constructor() { }

  ngOnInit() {
    this.codes = [];
    this.newCode([1,2,3]);
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

}
