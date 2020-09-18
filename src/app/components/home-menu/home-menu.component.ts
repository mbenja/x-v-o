import { Component, OnInit } from '@angular/core';

import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  public playerName: string;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
  }

  setPlayerName(name: string):void {
    this.stateService.setPlayerName(name);
    this.playerName = name;
  }

  getButtonClasses() {
    return({
      "home-menu-item": true,
      "disabled-primary": !this.playerName
    });
  }

}
