import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'code', component: CodeComponent },
  { path: 'gameList', component: GameListComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
