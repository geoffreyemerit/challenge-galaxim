import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HomeDescriptionComponent } from './components/home-description/home-description.component';
import { ViewTeamComponent } from './components/view-team/view-team.component';
import { ViewGameComponent } from './components/view-game/view-game.component';
import { RankingListComponent } from './components/ranking-list/ranking-list.component';
import { RankingCardComponent } from './components/ranking-card/ranking-card.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdminDetailListComponent } from './components/admin-detail-list/admin-detail-list.component';
import { AdminDetailCardComponent } from './components/admin-detail-card/admin-detail-card.component';
import { AdminDetailFormComponent } from './components/admin-detail-form/admin-detail-form.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RulesChallengeComponent } from './components/rules-challenge/rules-challenge.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TokenInterceptorInterceptor } from './core/token-interceptor.interceptor';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AdminDetailFilterComponent } from './admin-detail-filter/admin-detail-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ErrorComponent,
    RankingListComponent,
    RankingCardComponent,
    ViewGameComponent,
    ViewTeamComponent,
    RegisterFormComponent,
    HomeDescriptionComponent,
    RulesChallengeComponent,
    AuthenticationFormComponent,
    AdminHomeComponent,
    AdminDetailComponent,
    AdminDetailListComponent,
    AdminDetailCardComponent,
    AdminDetailFormComponent,
    AdminDetailFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,

    SidebarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    ScrollTopModule,
    DialogModule,
    AvatarModule,
    ConfirmDialogModule,
    InputNumberModule,
    ConfirmPopupModule

  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }