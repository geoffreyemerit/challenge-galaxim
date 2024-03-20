import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-detail-filter',
  templateUrl: './admin-detail-filter.component.html',
  styleUrls: ['./admin-detail-filter.component.scss']
})
export class AdminDetailFilterComponent implements OnInit {

  inputSearch: string = "";

  @Output()
  emitInputSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(){  }

  ngOnInit(): void {  }

  onSearch():void {
    this.emitInputSearch.emit(this.inputSearch);
  }
}
