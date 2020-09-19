import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  public isWin: number = -1;
  public isDraw: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private stateService: StateService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("id");
    this.playerName = this.stateService.getPlayerName();
    this.isP1 = this.stateService.getIsP1();
    this.gameService.getGame(this.gameId).subscribe(res => {
      this.game = res;
      this.isWin = this.getIsWin();
      this.isDraw = this.getIsDraw();
    });
  }

  setPlayerName(): void {
    this.stateService.setPlayerName(this.playerName);
    this.game.p2 = this.playerName;
    this.gameService.updateGame(this.game, this.gameId).then(() => this.isPlayerNameSet = true);
  }

  updateGameBoard(cellNum: number): void {
    if (this.getIsCellSelectable(cellNum)) {
      if (this.isP1) {
        this.game.board[cellNum] = "x";
      } else {
        this.game.board[cellNum] = "o";
      }
      this.game.isP1Turn = !this.game.isP1Turn;

      this.isWin = this.getIsWin();
      this.isDraw = this.getIsDraw();
      console.log(this.isWin);
      console.log(this.isDraw);
      this.gameService.updateGame(this.game, this.gameId);
    }
  }

  getIsWin(): number {
    let cellToCheck = -1;
    if (this.game.board[0] === this.game.board[1] && this.game.board[0] === this.game.board[2]) {
      cellToCheck = 0;
    } else if (this.game.board[3] === this.game.board[4] && this.game.board[3] === this.game.board[5]) {
      cellToCheck = 3;
    } else if (this.game.board[6] === this.game.board[7] && this.game.board[6] === this.game.board[8]) {
      cellToCheck = 6;
    } else if (this.game.board[0] === this.game.board[3] && this.game.board[0] === this.game.board[6]) {
      cellToCheck = 0;
    } else if (this.game.board[1] === this.game.board[4] && this.game.board[1] === this.game.board[7]) {
      cellToCheck = 1;
    } else if (this.game.board[2] === this.game.board[5] && this.game.board[2] === this.game.board[8] ) {
      cellToCheck = 2;
    } else if (this.game.board[0] === this.game.board[4] && this.game.board[0] === this.game.board[8]) {
      cellToCheck = 0;
    } else if (this.game.board[2] === this.game.board[4] && this.game.board[0] === this.game.board[6]) {
      cellToCheck = 2;
    }

    if (cellToCheck !== -1) {
      if (this.game.board[cellToCheck] === "x") return 1;
      else if (this.game.board[cellToCheck] === "o") return 2;
      else return -1;
    } else {
      return -1;
    }
  }

  getIsDraw(): boolean {
    let isFull = true;
    this.game.board.forEach(cell => {
      if (!cell) isFull = false;
    })
    
    return this.getIsWin() === -1 && isFull;
  }

  getIsCellSelectable(cellNum: number): boolean {
    if (this.isWin !== -1 || this.isDraw) {
      return false;
    }

    if (this.isP1) {
      return this.game.isP1Turn && this.isP1 && this.game.board[cellNum] == "";
    } else {
      return !this.game.isP1Turn && !this.isP1 && this.game.board[cellNum] == "";
    }
  }

  copyGameLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.shareButtonText = "Link Copied!";
      setTimeout(() => this.shareButtonText = "Share", 1000);
    });
  }

  goHome(): void {
    this.router.navigateByUrl("");
  }

  getContinueButtonClasses() {
    return ({
      "game-player-continue-button": true,
      "disabled-primary": !this.playerName
    });
  }

  getTableCellClasses(cellNum: number) {
    return ({
      "selectable": this.getIsCellSelectable(cellNum)
    });
  }

}
