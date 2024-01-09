import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [MessageService]
})
export class RegisterFormComponent implements OnInit{

  @ViewChild('registerForm') 
  registerForm!: NgForm;

  firstname: string = "";
  lastname: string = "";
  //selectedIntegrationDate!: Date;

  companyOptions: string[] = ['Weelodge', 'Agentys'];
  selectedCompany: string = '';

  salesteamOptions: string[] = ["Andrésy","Conflans Ste Honorine", "Eragny", "Jouy Le Moutier", "Poissy", "Achères", "Triel sur Seine", "Weelodge Center", "Osny", "La Varenne", "Le Perreux sur Marne", "Le Plessis Trevise", "St Maur des Fosses - Adamville", "St Maur des Fosses - Mairie", "St Maur des Fosses - Vieux St Maur", "Tours", "Villiers sur Marne", "Champigny sur Marne", "Nogent sur Marne", "Paris 12"];
  selectedSalesteam: string = '';
  
  packOptions: string[] = ['Pack Gala SOLO', 'Pack Gala DUO (Accompagnant hors réseau)','Pack Gala + Séminaire chambre SOLO', 'Pack Gala + Séminaire chambre DUO','Pack Gala DUO + Séminaire chambre SOLO','Pack Gala DUO + Séminaire chambre DUO'];
  selectedPack: string = '';

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  isFormValid(): boolean {
    // Vérifiez que firstname et lastname ne sont pas des chaînes vides ou nulles
    const isFirstNameValid: boolean = this.firstname ? this.firstname.trim() !== '' : false;
    const isLastNameValid: boolean = this.lastname ? this.lastname.trim() !== '' : false;

    // Retourne true si toutes les conditions sont remplies, sinon false
    return isFirstNameValid && 
           isLastNameValid && 
           //this.selectedIntegrationDate !== null && 
           this.selectedCompany !== '' && 
           this.selectedSalesteam !== '' && 
           this.selectedPack !== '';
}

  onFormSubmit(form: NgForm): void {
  // Code pour gérer l'envoi du formulaire, par exemple avec emailJs
  // Assurez-vous d'avoir votre propre service ID et modèle ID
  const emailParams = {
    firstname: this.firstname,
    lastname: this.lastname,
    //integrationDate: this.selectedIntegrationDate?.toLocaleDateString(), 
    company : form.value.company,
    salesteam : form.value.salesteam,
    pack : form.value.pack,
  };
    emailjs.send('service_c3sx1yh',  'template_j4210mi', emailParams, '60x-HDed5QYDrfil2')
    .then((response: EmailJSResponseStatus) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inscription bien envoyée' });
      
      // Réinitialisez les valeurs des champs à leurs valeurs par défaut
      this.firstname = '';
      this.lastname = '';
      //this.selectedIntegrationDate = new Date();
      this.selectedCompany = '';
      this.selectedSalesteam = '';
      this.selectedPack = '';

      // Réinitialisez le formulaire
      this.registerForm.resetForm();

      // Appelez à nouveau la méthode isFormValid() pour mettre à jour l'état du bouton
      this.isFormValid();
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Erreur dans l'envoi de l'inscription" });
    });
}



}
