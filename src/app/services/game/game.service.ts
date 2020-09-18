import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game, newGame } from '../../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore) { }

  createGame(p1: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.firestore.collection("games").add(newGame(p1)).then(res => resolve(res.id));
    });
  }

  getGame(id: string): Observable<Game> {
    return this.firestore.collection("games").doc(id).snapshotChanges().pipe(map(action => {
      return action.payload.data() as Game;
    }));
  }

  updateGame(updatedGame: Game, id: string): Promise<void> {
    return this.firestore.collection("games").doc(id).set(updatedGame);
  }
}
