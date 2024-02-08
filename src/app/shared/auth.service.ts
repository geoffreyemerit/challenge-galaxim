import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';
import { UserAuth } from '../models/user-auth.model';
import { TokenService } from './token.service';
import { TokenResponse } from '../models/token.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserRegister } from '../models/user-register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _BASE_URL = environment._API_AUTH_URL; 

  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));

  // Pour savoir si je suis conncté ou non 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private lsService: LocalStorageService
  ) { 
    // Vérifier l'authentification lors de l'initialisation du service
    this.checkAuthentication();
  }
  
  // Nouvelle méthode pour vérifier l'authentification au démarrage
  private checkAuthentication(): void {
    const token = this.tokenService.getTokenFromLocalStorageAndDecode();
    if (token) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Je m'inscris : j'envoie mon objet UserRegister et retourne l'observable
  signUp(userRegister: UserRegister): Observable<any> {
    return this.http.post<any>(`${this._BASE_URL}/register`, userRegister)
      .pipe(
        tap(res => {
          // Affichez la réponse dans la console pour le moment (vous pouvez gérer la réponse selon vos besoins)
          console.log(res);
        }),
        delay(1000), // Retarde la suite de l'observable de 2 secondes
        tap(() => {
          // Redirigez l'utilisateur vers la page d'authentification ou une autre page de votre choix après 2 secondes
          this.router.navigate(['/authenticate']);
        })
      );
  }

  // Je me connecte : j'envoie mon objet UserAuth et retourne l'observable
  signIn(userAuth: UserAuth): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this._BASE_URL}/authenticate`, userAuth)
      .pipe(
        tap((tokenFromDB: TokenResponse) => {
          // Mettre à jour le token dans le service ou le LocalStorage
          this.tokenService.updateToken(tokenFromDB);
          
          // Mettre à jour l'état d'authentification pour indiquer que l'utilisateur est connecté
          this.isAuthenticatedSubject.next(true);
        }),
        delay(1500), // Retarde la suite de l'observable de 2 secondes
        tap(() => {
          // Redirigez l'utilisateur vers la page d'accueil ou une autre page de votre choix après 2 secondes
          this.router.navigate(['/admin']);
        })
      );
  }

  signOut(): void {
    // Supprimez le token de l'utilisateur du local storage
    this.tokenService.resetToken();
    this.lsService.clearToken();
    
    // Effectuez d'autres actions si nécessaires, comme réinitialiser l'état d'authentification
     this.isAuthenticatedSubject.next(false);
    
    // Redirigez l'utilisateur vers la page d'accueil ou une autre page de votre choix
    this.router.navigate(['/']);
  }

  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }
  setHttpErrorSubject$(error: HttpErrorResponse): void {
    // On retire l'erreur stockée dans le SuccessSubject
    this._httpSuccessSubject$.next(new HttpResponse({}))
    // On ajoute l'erreur au ErrorSubject
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }
  setHttpSuccessSubject$(success: HttpResponse<any>): void {
    // On retire l'erreur stockée dans le ErrorSubject
    this._httpErrorSubject$.next(new HttpErrorResponse({}))
    // On ajoute l'erreur au SuccessSubject
    this._httpSuccessSubject$.next(success);
  }
}


