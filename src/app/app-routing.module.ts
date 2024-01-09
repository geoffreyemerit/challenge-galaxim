import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components /home/home.component';
import { ErrorComponent } from './components /error/error.component';
import { ViewGameComponent } from './components /view-game/view-game.component';
import { ViewTeamComponent } from './components /view-team/view-team.component';
import { RegisterFormComponent } from './components /register-form/register-form.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RulesChallengeComponent } from './components /rules-challenge/rules-challenge.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch:'full'},
  {path: '', component: HomeComponent},

  { path: 'game/:id', component: ViewGameComponent },
  { path: 'team/:category', component: ViewTeamComponent },
  
  { path: 'regles', component: RulesChallengeComponent},
  { path: 'inscription', component: RegisterFormComponent},

  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]

})
export class AppRoutingModule { }
