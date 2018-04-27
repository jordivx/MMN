import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private codeLength: number;
  private codeMinLength: number = environment.codeMinLength;
  private codeMaxLength: number = environment.codeMaxLength;

  constructor(public settingsService: SettingsService) {
    this.codeLength = this.settingsService.getCodeLength();
  }

  ngOnInit() {}

  // Get the codeLength attribute
  getCodeLength() {
    return this.codeLength;
  }

  // Set the codeLength attribute
  setCodeLength(_newCodeLength: number) {
    this.codeLength = _newCodeLength;
  }

  // Set the codeLength attribute from the settings service
  setServiceCodeLength() {
    this.settingsService.setCodeLength(this.codeLength);
  }

  // Decrease the codeLength attribute value
  decreaseCodeLength() {
    this.codeLength--;
  }

  // Disable the button to decrease the codeLength attribute value
  disableMinusButton() {
    return (this.codeLength <= this.codeMinLength);
  }

  // Disable the button to increase the codeLength attribute value
  disablePlusButton() {
    return (this.codeLength >= this.codeMaxLength);
  }

  // Increase the codeLength attribute value
  increaseCodeLength() {
    this.codeLength++;
  }

  // Call to the settings service function to change the language of the application
  switchLanguage(language: string) {
    this.settingsService.switchLanguage(language);
  }

  applySettings() {
    this.setServiceCodeLength();
  }
}

