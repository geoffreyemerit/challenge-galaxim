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
  selectedLink: string = "";

  @Input()
  dataList: (User | Office)[] = [];

  filteredList: (User | Office)[] = [];

  constructor() {}

  ngOnInit() {
    this.filteredList = this.dataList;
  }

  filterDataList(inputSearch: string): void {
    if (!inputSearch) {
      // If search input is empty, show all data
      this.filteredList = this.dataList;
      return;
    }

    // Otherwise, filter dataList based on inputSearch
    this.filteredList = this.dataList.filter((item: User | Office) => {
      if (item instanceof User) {
        // If item is a User, filter based on user properties like firstname, lastname, etc.
        const user = item as User;
        return (
          user.firstname.toLowerCase().includes(inputSearch.toLowerCase()) || 
          user.lastname.toLowerCase().includes(inputSearch.toLowerCase())
        );
      } else if (item instanceof Office) {
        // If item is an Office, filter based on office name
        const office = item as Office;
        return office.nameOffice.toLowerCase().includes(inputSearch.toLowerCase());
      }
      return false; // Default to false if neither User nor Office
    });
  }
  
}