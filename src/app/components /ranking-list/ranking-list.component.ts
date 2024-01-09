import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/shared/user-data.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {

  userList: User[] = [];
  gameList: Game[] = [];

  @Input() 
  game!: Game

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getAllUsersByGame(this.game.id).subscribe(data =>{
      this.userList = data;
    })
  }
}

