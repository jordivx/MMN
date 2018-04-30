import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';

const firebaseAuth = {
  apiKey: 'AIzaSyDyYOONbKe-rfjVHxGTYZmvq5tajEUUeKw',
  authDomain: 'mmnfirebase.firebaseapp.com',
  databaseURL: 'https://mmnfirebase.firebaseio.com',
  projectId: 'mmnfirebase',
  storageBucket: 'mmnfirebase.appspot.com',
  messagingSenderId: '146888784036'
};

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseAuth),
        AngularFireDatabaseModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
