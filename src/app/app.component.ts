import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MMN';

  public notificationOptions = {
    timeOut: 3000,
    lastOnBottom: true
  };

  constructor(public settingsService: SettingsService) {
    settingsService.setCodeLength(+localStorage.getItem('codeLength'));
  }
}
