import { Component } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MMN';

  constructor(public settingsService: SettingsService) {
    settingsService.setCodeLength(5); // By default the codeLength will be 5
  }
}
