import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user.model';
import { DbOfficeService } from 'src/app/shared/db-office.service';
import { DbUserService } from 'src/app/shared/db-user.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {

  userList: User[] = [];
  officeList: Office[] = [];
  gameList: Game[] = [];

  @Input() 
  game!: Game

  constructor(private dbUserService: DbUserService, private dbOfficeService: DbOfficeService) {}

  ngOnInit(): void {
   
      this.dbUserService.getTop20UsersByGameId(this.game.id!).subscribe((data: User[]) =>{
        this.userList = data;
      });
      this.dbOfficeService.getTop20OfficesByGameId(this.game.id!).subscribe((data: Office[]) =>{
        this.officeList = data;
      });
    }
  }


