import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameDataService } from 'src/app/shared/game-data.service';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.scss']
})
export class ViewGameComponent implements OnInit {
  
  gameId!: number;
  myGame!: Game;
  gameList: Game[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private gameDataService: GameDataService,
    private router: Router
  ) {}
  
  // Méthode appelée automatiquement lors de l'initialisation du composant
  ngOnInit(): void {
    // Abonnement aux changements d'URL et de ses paramètres
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Vérifier si le paramètre "id" est présent dans l'URL
      if (params.get("id")) {
        // Récupérer la valeur du paramètre "id" et la convertir en entier, puis l'assigner à la variable locale 'gameId'
        this.gameId = parseInt(params.get("id") as string);

        // Appel au service pour récupérer les données du jeu correspondant à l'identifiant 'gameId' et abonnement aux données
        this.gameDataService.getGameById(this.gameId).subscribe(data => {
          // Remplir la variable locale 'myGame' avec les données du jeu récupérées
          this.myGame = data;
          // Afficher les données du jeu dans la console à des fins de suivi et de débogage
        });
      }
    });
  }
  


    // Méthode appelée lors du clic sur le bouton "Retour"
    returnPreviousPage(): void {
      if (this.gameId >= 1 && this.gameId <= 5) {
        this.router.navigate(['/team/agences']);
      } else if (this.gameId >= 6 && this.gameId <= 10) {
        this.router.navigate(['/team/mandataires']);
      } else {
        // Redirection par défaut ou gestion d'erreur
        console.error("ID de jeu invalide");
      }
    }
}


