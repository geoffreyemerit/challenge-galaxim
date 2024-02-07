import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { DbOfficeService } from './db-office.service';
import { Office } from '../models/office.model';

@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  private apiUrl = 'http://localhost:8080/api/v1/users'; // Update with your backend API URL

  constructor(private http: HttpClient, private dbOfficeService: DbOfficeService) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  getUserByJob(job: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/team/${job}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, updatedUser);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getTop20AgentsByCaHtAct(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/agents/caHtAct`);
  }

  getTop20AgentsByCaHtSsp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/agents/caHtSsp`);
  }

  getTop20AgentsBySalesSsp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/agents/salesSsp`);
  }

  getTop20AgentsByMandates(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/agents/mandates`);
  }

  getTop20MandatairesByCaHtAct(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtAct`);
  }

  getTop20MandatairesByCaHtSsp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtSsp`);
  }

  getTop20MandatairesByMandates(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/mandates`);
  }

  getTop20MandatairesByBestDev(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/bestDev`);
  }

  getTop20MandatairesByCaHtNetworkTeamSsp(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtNetworkTeamSsp`);
  }

  // Nouvelle méthode pour récupérer les données en fonction de gameId
  getTop20UsersByGameId(gameId: number): Observable<User[]> {
    switch (gameId) {
      case 1:
        return this.http.get<User[]>(`${this.apiUrl}/top20/agents/caHtAct`);
      case 2:
        return this.http.get<User[]>(`${this.apiUrl}/top20/agents/caHtSsp`);
      case 3:
        return this.http.get<User[]>(`${this.apiUrl}/top20/agents/salesSsp`);
      case 4:
        return this.http.get<User[]>(`${this.apiUrl}/top20/agents/mandates`);
      case 6:
        return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtAct`);
      case 7:
        return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtSsp`);
      case 8:
        return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/mandates`);
      case 9:
        return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/caHtNetworkTeamSsp`);
      case 10:
        return this.http.get<User[]>(`${this.apiUrl}/top20/mandataires/bestDev`);
      default:
        return new Observable<User[]>();
    }
  }


}