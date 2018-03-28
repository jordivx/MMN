import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './/app-routing.module';


import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { CodeComponent } from './code/code.component';
import { CodeService } from './code.service';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';


import { SettingsService } from './settings.service';


import { LimitedCharactersDirective } from './limited-characters.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    CodeComponent,
    GameComponent,
    GameListComponent,
    UserComponent,
    NavbarComponent,
    LimitedCharactersDirective,
    SettingsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CodeService,
    SettingsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
