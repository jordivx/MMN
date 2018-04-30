import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './/app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { CodeComponent } from './code/code.component';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


import { SettingsService } from './settings.service';
import { UserService } from './user.service';
import { CodeService } from './code.service';


import { LimitedCharactersDirective } from './limited-characters.directive';
import { AuthGuard } from './auth.guard';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const firebaseAuth = {
  apiKey: 'AIzaSyDyYOONbKe-rfjVHxGTYZmvq5tajEUUeKw',
  authDomain: 'mmnfirebase.firebaseapp.com',
  databaseURL: 'https://mmnfirebase.firebaseio.com',
  projectId: 'mmnfirebase',
  storageBucket: 'mmnfirebase.appspot.com',
  messagingSenderId: '146888784036'
};

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
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    }),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SimpleNotificationsModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    CodeService,
    SettingsService,
    UserService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
