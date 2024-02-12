import { Component, Input, OnInit } from '@angular/core';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss']
})
export class RankingCardComponent implements OnInit {

  @Input()
  userChild: User | undefined;

  @Input()
  officeChild: Office | undefined;

  @Input() 
  position!: number;

  @Input() 
  idGame!: number;
  constructor(){}

  ngOnInit(): void {
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
        (this.userChild && this.userChild.bestDev === 1) ? items = `agent` : items = `agents`;
      } else if (this.idGame === 3){
        (this.userChild && this.userChild.salesSsp === 1) ? items = `vente` : items = `ventes`;
       }  else {
        items = `€`;
      }

      return items;
    }

    getPerformance(): string {
      switch (this.idGame) {
          case 1:
              return this.userChild!.caHtAct.toLocaleString();
          case 2:
              return this.userChild!.caHtSsp.toLocaleString();
          case 3:
              return this.userChild!.salesSsp.toLocaleString();
          case 4:
              return this.userChild!.mandates.toLocaleString(); 
          case 6:
              return this.userChild!.caHtAct.toLocaleString();
          case 5:
              return this.officeChild!.caHtOfficeSsp.toLocaleString(); 
          case 7:
              return this.userChild!.caHtSsp.toLocaleString();
          case 8:
              return this.userChild!.mandates.toLocaleString(); 
          case 9:
              return this.userChild!.caHtNetworkTeamSsp.toLocaleString();
          case 10:
              return this.userChild!.bestDev.toLocaleString(); 
          default:
              return '0';
      }
  }
}
