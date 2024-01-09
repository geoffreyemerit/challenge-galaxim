import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameDataService } from 'src/app/shared/game-data.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss']
})
export class ViewTeamComponent implements OnInit {

  teamId: string = "";
  gameList: Game[] = [];

  constructor(    private route: ActivatedRoute,
    private gamesService: GameDataService) { }

// Méthode appelée automatiquement lors de l'initialisation du composant
ngOnInit(): void {
  // Je récupère mon tableau de jeux depuis mon fichier .json et je m'y abonne
  this.gamesService.getAllGames().subscribe((games: Game[]) => {

    // Je remplis mon tableau local 'gameList' avec les jeux récupérés
    this.gameList = games;

    // MAINTENANT que j'ai rempli mon tableau, je m'abonne aux changements d'URL et de ses paramètres
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Vérifier si le paramètre "category" est présent dans l'URL
      if (params.get("category")) {
        // Récupérer la valeur du paramètre "category" et l'assigner à la variable locale 'teamId'
        this.teamId = (params.get("category") as string);

        // Filtrer les jeux pour ne conserver que ceux ayant la même catégorie que 'teamId'
        this.gameList = games.filter((game: Game) => game.category === this.teamId);
      }
    });
  });
}

}