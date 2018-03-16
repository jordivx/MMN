import { Component, OnInit } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private codes:CodeComponent[];
  private user1:UserComponent;
  private user2:UserComponent;
  private startDate:Date;
  private finishDate:Date;

  constructor() { }

  ngOnInit() {
  }

}
