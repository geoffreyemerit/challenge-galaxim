
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DbOfficeService } from 'src/app/shared/db-office.service';
import { DbUserService } from 'src/app/shared/db-user.service';

@Component({
  selector: 'app-admin-detail-card',
  templateUrl: './admin-detail-card.component.html',
  styleUrls: ['./admin-detail-card.component.scss']
})
export class AdminDetailCardComponent implements OnInit{


  @Input()
  data: any;

  @Input()
  selectedLink!: string;

  updatedLink: string = "upd";

  isOpen: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private dbUserService: DbUserService, private dbOfficeService: DbOfficeService) {
  }

  ngOnInit(): void {
  }

  openForm() {
    this.isOpen = true;
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Êtes vous sûr de vouloir supprimer ?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          if(this.selectedLink != 'agences'){
          this.dbUserService.deleteUser(this.data.id).subscribe(
            () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Agent supprimé', life: 1800 });
            setTimeout(() => {
              window.location.reload();
            }, 1800);

        })} else{
          this.dbOfficeService.deleteOffice(this.data.id).subscribe(
            () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Agence supprimée', life: 1800 });
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
        }},
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Suppression refusée', life: 1800 });
        }
    });
}
}