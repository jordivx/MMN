import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseAuth),
        AngularFireDatabaseModule,
      ],
      providers: [
        SettingsService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
