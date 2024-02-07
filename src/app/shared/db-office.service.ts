import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';

@Injectable({
  providedIn: 'root'
})
export class DbOfficeService {

  private apiUrl = 'http://localhost:8080/api/v1/offices'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(`${this.apiUrl}/all`);
  }

  getOfficeById(id: number): Observable<Office> {
    return this.http.get<Office>(`${this.apiUrl}/${id}`);
  }

  addOffice(office: Office): Observable<Office> {
    return this.http.post<Office>(`${this.apiUrl}/add`, office);
  }

  updateOffice(updatedOffice: Office): Observable<Office> {
    return this.http.put<Office>(`${this.apiUrl}/update`, updatedOffice);
  }

  deleteOffice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getTop20OfficesByCaHtOfficeSsp(): Observable<Office[]> {
    return this.http.get<Office[]>(`${this.apiUrl}/top20/caHtOfficeSsp`);
  }

    // Nouvelle méthode pour récupérer les données en fonction de gameId
    getTop20OfficesByGameId(gameId: number): Observable<Office[]> {
      switch (gameId) {
        case 5:
          return this.http.get<Office[]>(`${this.apiUrl}/top20/caHtOfficeSsp`);
        default:
          return new Observable<Office[]>();
      }
    }
}