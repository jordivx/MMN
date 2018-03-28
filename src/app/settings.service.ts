import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private codeLength:number;

  constructor() {}

  getCodeLength() {
    return this.codeLength;
  }

  setCodeLength(_newCodeLength:number) {
    this.codeLength = _newCodeLength;
  }

}
