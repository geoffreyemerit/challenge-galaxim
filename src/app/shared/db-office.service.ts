import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DbOfficeService {

  private readonly _BASE_URL = environment._API_OFFICE_URL; 

  constructor(private http: HttpClient) { }

  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(`${this._BASE_URL}/all`);
  }

  getOfficeById(id: number): Observable<Office> {
    return this.http.get<Office>(`${this._BASE_URL}/${id}`);
  }

  addOffice(office: Office): Observable<Office> {
    return this.http.post<Office>(`${this._BASE_URL}/add`, office);
  }

  updateOffice(updatedOffice: Office): Observable<Office> {
    return this.http.put<Office>(`${this._BASE_URL}/update`, updatedOffice);
  }

  deleteOffice(id: number): Observable<void> {
    return this.http.delete<void>(`${this._BASE_URL}/delete/${id}`);
  }

  getTop20OfficesByCaHtOfficeSsp(): Observable<Office[]> {
    return this.http.get<Office[]>(`${this._BASE_URL}/top20/caHtOfficeSsp`);
  }

    // Nouvelle méthode pour récupérer les données en fonction de gameId
    getTop20OfficesByGameId(gameId: number): Observable<Office[]> {
      switch (gameId) {
        case 5:
          return this.http.get<Office[]>(`${this._BASE_URL}/top20/caHtOfficeSsp`);
        default:
          return new Observable<Office[]>();
      }
    }
}