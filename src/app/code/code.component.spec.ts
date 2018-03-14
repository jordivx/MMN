import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeComponent } from './code.component';
import { NumberComponent } from '../number/number.component';

describe('CodeComponent', () => {
  let component: CodeComponent;
  let fixture: ComponentFixture<CodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CodeComponent,
        NumberComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
