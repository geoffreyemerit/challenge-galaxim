import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/auth.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent {
  actionType: 'authenticate' = 'authenticate'; // Only 'authenticate' allowed

  userAuth: UserAuth = new UserAuth("", "");

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private httpS: AuthService,
    private LsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.actionType = 'authenticate'; // Always set to 'authenticate'
    });
  }

  isFormValid(): boolean {
    return !!this.userAuth.email && !!this.userAuth.password;
  }

  onFormSubmit(form: NgForm): void {
    if (this.actionType === 'authenticate') {
      this.httpS.signIn(this.userAuth).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Connexion réussie' });
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la connexion' });
        }
      );
    }
  }

  resetForm(): void {
    this.userAuth = new UserAuth("", "");
  }

  onSubmitAuth(): void {
    this.LsService.clearToken();
    this.httpS.signIn(this.userAuth);
  }
}
