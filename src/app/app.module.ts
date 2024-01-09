import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components /navbar/navbar.component';
import { HomeComponent } from './components /home/home.component';
import { HomeDescriptionComponent } from './components /home-description/home-description.component';
import { ViewTeamComponent } from './components /view-team/view-team.component';
import { ViewGameComponent } from './components /view-game/view-game.component';
import { RankingListComponent } from './components /ranking-list/ranking-list.component';
import { RankingCardComponent } from './components /ranking-card/ranking-card.component';
import { RegisterFormComponent } from './components /register-form/register-form.component';
import { ErrorComponent } from './components /error/error.component';

import { GameDataService } from './shared/game-data.service';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ScrollTopModule } from 'primeng/scrolltop';


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
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    SidebarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    ScrollTopModule
  ],
  providers: [GameDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
