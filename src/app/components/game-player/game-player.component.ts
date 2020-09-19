import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../../services/game/game.service';
import { StateService } from '../../services/state/state.service';
import { Game } from '../../interfaces/Game';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.css']
})
export class GamePlayerComponent implements OnInit {
  private gameId: string;
  public game: Game;
  public playerName: string;
  public isPlayerNameSet: boolean = false;
  public isP1: boolean;
  public shareButtonText: string = "Share";

  constructor(private route: ActivatedRoute, private gameService: GameService, private stateService: StateService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("id");
    this.playerName = this.stateService.getPlayerName();
    this.isP1 = this.stateService.getIsP1();
    this.gameService.getGame(this.gameId).subscribe(res => {
      this.game = res;
    });
  }

  setPlayerName(): void {
    this.stateService.setPlayerName(this.playerName);
    this.game.p2 = this.playerName;
    this.gameService.updateGame(this.game, this.gameId).then(() => this.isPlayerNameSet = true);
  }

  copyGameLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.shareButtonText = "Link Copied!";
      setTimeout(() => this.shareButtonText = "Share", 1000);
    });
  }

  getContinueButtonClasses() {
    return ({
      "game-player-continue-button": true,
      "disabled-primary": !this.playerName
    });
  }

  getTableCellClasses(cellNum: number) {
    let isSelectable: boolean;
    if (this.isP1) {
      isSelectable = this.game.isP1Turn && this.isP1 && this.game.board[cellNum] == "";
    } else {
      isSelectable = !this.game.isP1Turn && !this.isP1 && this.game.board[cellNum] == "";
    }

    return ({
      "selectable": isSelectable
    });
  }

}
