import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user.model';
import { DbOfficeService } from 'src/app/shared/db-office.service';
import { DbUserService } from 'src/app/shared/db-user.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit{
  
  selectedLink: string;
  addedLink: string = "add";

  isOpen: boolean = false; //false

  dataList!: (User | Office)[];

  constructor(private route: ActivatedRoute, private dbUserService: DbUserService,
    private dbOfficeService: DbOfficeService){
    this.selectedLink = this.route.snapshot.params['type'];
  }

  ngOnInit(): void {
    this.loadDataList();    
  }

  openForm() {
    this.isOpen = true; 
  }

  loadDataList() {  
    if (this.selectedLink === 'agents') {
      this.dbUserService.getUserByJob('AGENCES').subscribe(
        (data: User[]) => {
          this.dataList = data.sort((a: User, b: User) => b.caHtAct - a.caHtAct);
        },
        error => console.error("Error loading data for agents: ", error)
      );
    } else if (this.selectedLink === 'mandataires') {
      this.dbUserService.getUserByJob('MANDATAIRES').subscribe(
        (data: User[]) => {
          this.dataList = data.sort((a: User, b: User) => b.caHtAct - a.caHtAct);
        },
        error => console.error("Error loading data for mandataires: ", error)
      );
    } else if (this.selectedLink === 'agences') {
      this.dbOfficeService.getAllOffices().subscribe(
        (data: Office[]) => {
          this.dataList = data.sort((a: Office, b: Office) => b.caHtOfficeSsp - a.caHtOfficeSsp);
        },
        error => console.error("Error loading data for agences: ", error)
      );
    } else {
      console.error("Invalid selected link: ", this.selectedLink);
    }
  }
}
