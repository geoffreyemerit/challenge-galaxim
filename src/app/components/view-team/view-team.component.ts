import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { DbGameService } from 'src/app/shared/db-game.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss']
})
export class ViewTeamComponent implements OnInit {

  teamId: string = "";
  gameList: Game[] = [];

  constructor(private route: ActivatedRoute, private dbGameService: DbGameService) { }

// Méthode appelée automatiquement lors de l'initialisation du composant
ngOnInit(): void {
  // Abonnement aux changements d'URL et de ses paramètres
  this.route.paramMap.subscribe((params: ParamMap) => {
    // Vérifier si le paramètre "job" est présent dans l'URL
    if (params.get("job")) {
      // Récupérer la valeur du paramètre "job" et la convertir en entier, puis l'assigner à la variable locale 'teamId'
      this.teamId = params.get("job") as string;

      // Utilisez la méthode getGameByJob pour récupérer les jeux par job
      this.dbGameService.getGameByJob(this.teamId).subscribe(
        (games: Game[]) => {
          this.gameList = games;
        },
        (error) => {
          console.error("Erreur lors de la récupération des jeux :", error);
        }
      );
    }
  });
}

}