import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SettingsService {

  private codeLength:number;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  getCodeLength() {
    return this.codeLength;
  }

  setCodeLength(_newCodeLength:number) {
    this.codeLength = _newCodeLength;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
