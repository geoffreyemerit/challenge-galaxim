import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss']
})
export class RankingCardComponent {

  @Input()
  userChild!: User;

  @Input() 
  position!: number;

  @Input() 
  idGame!: number;

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
      } else {
        items = `€`;
      }

      return items;
    }
}
