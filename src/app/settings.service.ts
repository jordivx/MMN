import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

@Injectable()
export class SettingsService {

  private codeLength: number;
  public showHelpDialog = false;

  constructor(private translate: TranslateService) {
    const storedUser: string = localStorage.getItem('language');
    if (storedUser) {
      translate.setDefaultLang(storedUser);
    } else {
      translate.setDefaultLang('en');
    }
  }

  getCodeLength() {
    return this.codeLength;
  }

  setCodeLength(_newCodeLength: number) {
    if (_newCodeLength === 0) {
      this.codeLength = environment.codeMaxLength;
    } else {
      this.codeLength = _newCodeLength;
      localStorage.setItem('codeLength', _newCodeLength.toString());
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  openHelpDialog() {
    this.showHelpDialog = true;
  }

  closeHelpDialog() {
    this.showHelpDialog = false;
  }

}
