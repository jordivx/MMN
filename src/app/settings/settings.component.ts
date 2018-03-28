import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private codeLength:number;
  private codeMinLength:number = environment.codeMinLength;
  private codeMaxLength:number = environment.codeMaxLength;

  constructor(public settingsService: SettingsService) { 
    this.codeLength = this.settingsService.getCodeLength();
  }

  ngOnInit() {
  }

  getCodeLength() {
    return this.codeLength;
  }

  setCodeLength(_newCodeLength:number) {
    this.codeLength = _newCodeLength;
  }

  setServiceCodeLength(){
    this.settingsService.setCodeLength(this.codeLength);
  }

  decreaseCodeLength() {
    this.codeLength--;
  }

  disableMinusButton() {
    return (this.codeLength<=this.codeMinLength);
  }

  disablePlusButton() {
    return (this.codeLength>=this.codeMaxLength);
  }

  increaseCodeLength() {
    this.codeLength++;
  }

  applySettings(){
    this.setServiceCodeLength();
  }
}
