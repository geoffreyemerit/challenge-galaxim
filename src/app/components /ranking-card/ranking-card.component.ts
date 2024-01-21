import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/shared/user-data.service';

@Component({
  selector: 'app-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss']
})
export class RankingCardComponent implements OnInit {

  @Input()
 userChild!: User;

  @Input() 
  position!: number;

  @Input() 
  idGame!: number;

  userList: User[] = [];


  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getAllUsersByGame(this.idGame)
      .subscribe(users => this.userList = users);
  }

  getCardColor(): any {
    const borderColorMapping: any = {
      1: '#B27A1B',
      2: '#9E9E9E',
      3: '#B15419',
    };
  
    if ((this.idGame === 1 || this.idGame === 6) && this.position >= 1 && this.position <= 10) {
      return { 'border-color': borderColorMapping[this.position] || '#C4C4C4' };
    } 
    else if (this.position >= 1 && this.position <= 3) {
      return { 'border-color': borderColorMapping[this.position]};
    } 
    else {
      return { 'border-color': '#343434' };
    }
  }
  
    getCardLogoRanking(): string {
      let imageName: string;
      
      if ((this.idGame === 1 || this.idGame === 6) && this.position >= 1 && this.position <= 10) {
        imageName = `c${this.position}.svg`;
      } else if (this.position >= 1 && this.position <= 3){
        imageName = `c${this.position}.svg`;
      }
      else {
        imageName = `${this.position}.svg`;
      }
    
      return `assets/ranking/${imageName}`;
    }

    getItemsEurosOrPoints(): string{
      let items: string;

      if (this.idGame === 4 || this.idGame === 8){
        items = `points`;
      } else if (this.idGame === 10){
       (this.userChild.best_dev === 1) ? items = `agent` : items = `agents`;
      } else if (this.idGame === 3){
        (this.userChild.sales_ssp === 1) ? items = `vente` : items = `ventes`;
       }  else {
        items = `€`;
      }

      return items;
    }

    getPerformance(): number {
      switch (this.idGame) {
          case 1:
              return this.userChild.ca_ht_act;
          case 6:
              return this.userChild.ca_ht_act;
          case 2:
              return this.userChild.ca_ht_ssp;
          case 7:
              return this.userChild.ca_ht_ssp;
          case 3:
              return this.userChild.sales_ssp;
          case 4:
              return this.userChild.mandates; // Remplacer par le champ correct si nécessaire
          case 8:
              return this.userChild.mandates; // Remplacer par le champ correct si nécessaire
          case 9:
              return this.userChild.ca_ht_team_ssp;
          case 10:
              return this.userChild.best_dev; 
          case 5:
              return this.userChild.ca_company; 
          default:
              return 0;
      }
  }
}
