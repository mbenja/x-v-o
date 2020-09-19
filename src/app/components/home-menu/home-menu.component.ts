import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game/game.service';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  public playerName: string;

  constructor(private gameService: GameService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
  }

  setPlayerName(name: string):void {
    this.stateService.setPlayerName(name);
    this.playerName = name;
  }

  createGame(): void {
    this.gameService.createGame(this.playerName).then(gameId => {
      this.stateService.setIsP1(true);
      this.router.navigateByUrl(`/game/${gameId}`);
    });
  }

  getButtonClasses() {
    return({
      "home-menu-item": true,
      "disabled-primary": !this.playerName
    });
  }

}
