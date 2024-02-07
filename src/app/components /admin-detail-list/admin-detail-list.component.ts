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

  constructor() {}

  ngOnInit() {
  }
}