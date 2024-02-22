import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Office } from 'src/app/models/office.model';
import { User } from 'src/app/models/user.model';
import { DbOfficeService } from 'src/app/shared/db-office.service';
import { DbUserService } from 'src/app/shared/db-user.service';

@Component({
  selector: 'app-admin-detail-form',
  templateUrl: './admin-detail-form.component.html',
  styleUrls: ['./admin-detail-form.component.scss']
})
export class AdminDetailFormComponent implements OnInit {

  @Input() addedLink: string | undefined;
  @Input() dataList: any;
  @Input() selectedLink!: string;
  @Input() updatedLink: string | undefined;
  @Input() dataOfficeSelected!: Office;
  @Input() dataUserSelected!: User;

  selectedTeamMembers: User[] = [];
  allUsers: User[] = [];

  officeList: Office[] = [];
  selectedOffice!: Office;

  galaximForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private dbOfficeService: DbOfficeService,
    private dbUserService: DbUserService,
    private dialog: Dialog,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadList();
  
    if (this.selectedLink === 'agences') {
      if (this.dataOfficeSelected) {
        this.createFormWithOfficeData();
      } else {
        this.createForm();
      }
    } else {
      if (this.dataUserSelected) {
        this.createFormWithData();
      } else {
        this.createForm();
      }
    }
  }  

  createFormWithOfficeData(): void {
    this.galaximForm = this.fb.group({
      nameOffice: [this.dataOfficeSelected.nameOffice, Validators.required],
      brand: [this.dataOfficeSelected.brand, Validators.required],
      city: [this.dataOfficeSelected.city, Validators.required],
      caHtOfficeSsp: [this.dataOfficeSelected.caHtOfficeSsp],
      userList: [this.selectedTeamMembers] 
    });
  } 

  createForm(): void {
    if (this.selectedLink === 'agences') {
      this.galaximForm = this.fb.group({
        nameOffice: ['', Validators.required],
        brand: ['', Validators.required],
        city: ['', Validators.required],
        caHtOfficeSsp: [''],
        userList: [[]] 
      })} else {
      this.galaximForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        job: [this.selectedLink === 'agents' ? 'AGENCES' : 'MANDATAIRES'],
        caHtAct: [''],
        caHtSsp: [''],
        salesSsp: [''],
        mandates: [''],
        bestDev: [''],
        caHtNetworkTeamSsp: [''],
        office: ['', Validators.required],
      });
    }
  }      
  
  createFormWithData(): void {
    if (this.selectedLink === 'agences'){
      this.galaximForm = this.fb.group({
        nameOffice: [this.dataOfficeSelected.nameOffice, Validators.required],
        brand: [this.dataOfficeSelected.brand, Validators.required],
        city: [this.dataOfficeSelected.city, Validators.required],
        caHtOfficeSsp: [this.dataOfficeSelected.caHtOfficeSsp],
        userList: [this.selectedTeamMembers] 
      });
    } else {
      this.galaximForm = this.fb.group({
        firstname: [this.dataUserSelected.firstname, Validators.required],
        lastname: [this.dataUserSelected.lastname, Validators.required],
        job: [this.dataUserSelected.job],
        caHtAct: [this.dataUserSelected.caHtAct],
        caHtSsp: [this.dataUserSelected.caHtSsp],
        salesSsp: [this.dataUserSelected.salesSsp],
        mandates: [this.dataUserSelected.mandates],
        bestDev: [this.dataUserSelected.bestDev],
        caHtNetworkTeamSsp: [this.dataUserSelected.caHtNetworkTeamSsp],
        office: [this.dataUserSelected.office, Validators.required],
        caAllActions: [this.dataUserSelected.caAllActions]
      });
    }
  }

  loadList(): void {
    if (this.selectedLink != 'agences') {
      this.dbOfficeService.getAllOffices().subscribe(
        (offices: Office[]) => {
          this.officeList = offices;
        },
        (error) => {
          console.error('Erreur lors du chargement des agences:', error);
        }
      );
    } else {
      this.dbUserService.getUserByJob('AGENCES').subscribe(
        (users: User[]) => {
          this.allUsers = users;
        },
        (error) => {
          console.error('Erreur lors du chargement des agents:', error);
        }
      );
      if (this.updatedLink) {
        this.addCurrentMemberOnSelectedTeamMembers();
      }
    }
  }

  onSubmit(): void {
    if (this.galaximForm.valid) {
      const formData = this.galaximForm.value;

      // User data
      const userToUpdate: User = {
        id: this.dataUserSelected ? this.dataUserSelected.id : undefined,
        firstname: formData.firstname,
        lastname: formData.lastname,
        photo: '',
        job: formData.job,
        caHtAct: formData.caHtAct,
        caHtSsp: formData.caHtSsp,
        salesSsp: formData.salesSsp,
        mandates: formData.mandates,
        bestDev: formData.bestDev,
        caHtNetworkTeamSsp: formData.caHtNetworkTeamSsp,
        office: formData.office,
        caAllActions: this.dataUserSelected.caAllActions ? this.dataUserSelected.caAllActions : undefined,
      };

      // Office data
      const newOffice: Office = {
        brand: formData.brand,
        nameOffice: formData.nameOffice,
        city: formData.city,
        caHtOfficeSsp: formData.caHtOfficeSsp,
        userList: this.selectedTeamMembers,
      };

      if (this.selectedLink !== 'agences') {
        // Update existing user or add new user
        if (this.dataUserSelected) {
          this.dbUserService.updateUser(userToUpdate).subscribe(
            (updatedUser: User) => {
              this.handleSuccess('L\'agent a bien été mis à jour');
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
        } else {
          this.dbUserService.addUser(userToUpdate).subscribe(
            (addedUser: User) => {
              this.handleSuccess('L\'agent a bien été ajouté');
            },
            (error) => {
              console.error('Error adding user:', error);
            }
          );
        }
      } else {
        // Update existing office or add new office
        if (this.dataOfficeSelected) {
          newOffice.id = this.dataOfficeSelected.id; // Assign existing office id
          this.dbOfficeService.updateOffice(newOffice).subscribe(
            (updatedOffice: Office) => {
              this.handleSuccess('L\'agence a bien été mise à jour');
            },
            (error) => {
              console.error('Error updating office:', error);
            }
          );
        } else {
          this.dbOfficeService.addOffice(newOffice).subscribe(
            (addedOffice: Office) => {
              this.handleSuccess('L\'agence a bien été ajoutée');
            },
            (error) => {
              console.error('Error adding office:', error);
            }
          );
        }
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur dans le formulaire', detail: 'Merci de vérifier les champs' });
    }
  }

  private handleSuccess(successMessage: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: successMessage });
    setTimeout(() => {
      this.dialog.close(new Event('dummy'));
      window.location.reload();
    }, 1800);
  }
  
  addCurrentMemberOnSelectedTeamMembers(){
    if(this.dataOfficeSelected && this.dataOfficeSelected.userList){
      for(let i=0; i<this.dataOfficeSelected.userList.length; i++){
        this.selectedTeamMembers.push(this.dataOfficeSelected.userList[i])
      }
    } 
    return this.selectedTeamMembers;
  }
  
  addTeamMember(): void {
    const userListControl = this.galaximForm.get('userList');
  
    if (userListControl && userListControl.value) {
      const selectedUser = userListControl.value;
  
      // Vérifier si l'utilisateur est déjà dans la liste
      if (!this.selectedTeamMembers.some(user => user.id === selectedUser.id)) {
        this.selectedTeamMembers.push(selectedUser);
  
        // Mise à jour de userList dans le formulaire
        userListControl.setValue(this.selectedTeamMembers);
      }
    }
  }
  

  removeTeamMember(teamMember: User): void {
    const index = this.selectedTeamMembers.findIndex(member => member.id === teamMember.id);
    if (index !== -1) {
      this.selectedTeamMembers.splice(index, 1);
    }
  }
}
