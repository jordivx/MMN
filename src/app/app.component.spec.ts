import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CodeComponent } from './code/code.component';
import { NumberComponent } from './number/number.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
describe('AppComponent', () => {

  let title="MMN";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CodeComponent,
        NumberComponent,
        NavbarComponent,
        GameListComponent,
        GameComponent
      ],
      imports: [
        AppRoutingModule,
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue : '/' },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title '${title}'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(`${title}`);
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(`Welcome to ${title}!`);
  }));
});
