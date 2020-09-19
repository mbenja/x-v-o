import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { GamePlayerComponent } from './components/game-player/game-player.component';

const routes: Routes = [
  { path: "", component: HomeMenuComponent },
  { path: "game/:id", component: GamePlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
