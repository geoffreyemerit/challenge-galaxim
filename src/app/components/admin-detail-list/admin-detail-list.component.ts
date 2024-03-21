import { Component, Input, OnInit } from '@angular/core';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-detail-list',
  templateUrl: './admin-detail-list.component.html',
  styleUrls: ['./admin-detail-list.component.scss']
})
export class AdminDetailListComponent implements OnInit{

  @Input()
  filterValue: string = "";

  @Input() 
  selectedLink: string = "";

  @Input()
  dataList: (User | Office)[] = [];


  dataListFiltered: (User | Office)[] = [];

  constructor() {}

  ngOnInit() {
    this.filterData();
  }

  ngOnChanges() {
    this.filterData();
  }

  filterData() {
    if (this.dataList && this.dataList.length > 0 && this.filterValue) {
      this.dataListFiltered = this.dataList.filter(item => {
        if (this.selectedLink === 'agents' || this.selectedLink === 'mandataires') {
          const user = item as User;
          return user.firstname.toLowerCase().includes(this.filterValue.toLowerCase()) || 
                 user.lastname.toLowerCase().includes(this.filterValue.toLowerCase());
        } else if (this.selectedLink === 'agences') {
          const office = item as Office;
          return office.nameOffice.toLowerCase().includes(this.filterValue.toLowerCase());
        } else {
          return false; // Si le lien sélectionné n'est pas valide, retourner false
        }
      });
    } else {
      this.dataListFiltered = this.dataList; // Si aucune recherche n'est effectuée, afficher toutes les données
    }
  }
}