import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbGameService {

  private readonly _BASE_URL = environment._API_GAME_URL; 

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this._BASE_URL}/all`);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this._BASE_URL}/${id}`);
  }

  getGameByJob(job: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this._BASE_URL}/team/${job}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this._BASE_URL}/add`, game);
  }

  updateGame(updatedGame: Game): Observable<Game> {
    return this.http.put<Game>(`${this._BASE_URL}/update`, updatedGame);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL}/delete/${id}`);
  }

}
