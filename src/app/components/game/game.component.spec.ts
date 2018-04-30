import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CodeComponent } from '../code/code.component';
import { NumberComponent } from '../number/number.component';
import { SettingsService } from '../../services/settings.service';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { GameListComponent } from '../game-list/game-list.component';
import { SettingsComponent } from '../settings/settings.component';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { UserService } from '../../services/user.service';

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

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        {provide: APP_BASE_HREF, useValue : '/' },
        UserService
      ],
      declarations: [
        GameComponent,
        CodeComponent,
        NumberComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        GameListComponent,
        SettingsComponent
      ],
      imports: [
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseAuth),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
