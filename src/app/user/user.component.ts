import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  private username: string;
  private password: string;

  constructor() {}

  ngOnInit() {}

  // Getter for the username attribute
  getUsername() {
    return this.username;
  }

  // Setter for the username attribute
  setUsername(_username: string) {
    this.username = _username;
  }

}

