import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private playerName: string = "";
  private isP1: boolean = false;

  constructor() { }

  getPlayerName(): string {
    return this.playerName;
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  getIsP1(): boolean {
    return this.isP1;
  }

  setIsP1(isP1: boolean): void {
    this.isP1 = isP1;
  }
}
