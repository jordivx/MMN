import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { CodeComponent } from './code/code.component';
import { CodeService } from './code.service';
import { AppRoutingModule } from './/app-routing.module';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LimitedCharactersDirective } from './limited-characters.directive';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings.service';
import { HomeComponent } from './home/home.component';


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
    ReactiveFormsModule
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
