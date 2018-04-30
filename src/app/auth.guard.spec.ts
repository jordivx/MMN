import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const firebaseAuth = {
  apiKey: 'AIzaSyDyYOONbKe-rfjVHxGTYZmvq5tajEUUeKw',
  authDomain: 'mmnfirebase.firebaseapp.com',
  databaseURL: 'https://mmnfirebase.firebaseio.com',
  projectId: 'mmnfirebase',
  storageBucket: 'mmnfirebase.appspot.com',
  messagingSenderId: '146888784036'
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        UserService,
      ],
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseAuth),
        RouterTestingModule
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
