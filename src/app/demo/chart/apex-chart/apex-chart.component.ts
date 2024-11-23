import { Component ,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
interface Etablissement {
  nom?: string;
  typeEtablissement?: string;
  numeroTelephone?: string;
  email?: string;
  site?: string;
  directeur?: string;
  adresse?: String;
  responsable: string;
  newborns?: any[]; // Changez ce type en fonction de votre modèle pour `Newborn`
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export default class ApexChartComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedEtablissement: Etablissement | null = null;
  newEtablissement: Etablissement = {} as Etablissement; // Initialize newMedecin with Medecin type
  etablissements: Etablissement[] = [
    {
      
      nom: 'Hôpital Saint-Joseph',
      typeEtablissement: 'Hopital',
      numeroTelephone: '54123698',
      email: 'contact@hopital-saint-joseph.com',
      site: 'https://hopital-saint-joseph.com',
      directeur: 'Dr. Dupont',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      nom: 'Clinique Pasteur',
      typeEtablissement: 'Clinique',
      numeroTelephone: '98654789',
      email: 'contact@clinique-pasteur.com',
      site: 'https://clinique-pasteur.com',
      directeur: 'Dr. Martin',
      adresse:'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     
      nom: 'Hôpital Général',
      typeEtablissement: 'Hopital',
      numeroTelephone: '26456852',
      email: 'contact@hopital-general.com',
      site: 'https://hopital-general.com',
      directeur: 'Dr. Lambert',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      nom: 'Clinique des Lilas',
      typeEtablissement: 'Clinique',
      numeroTelephone: '55124587',
      email: 'contact@clinique-lilas.com',
      site: 'https://clinique-lilas.com',
      directeur: 'Dr. Lefevre',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     
      nom: 'Centre Médical de la Tour',
      typeEtablissement: 'Hopital',
      numeroTelephone: '99753254',
      email: 'contact@centre-medical-tour.com',
      site: 'https://centre-medical-tour.com',
      directeur: 'Dr. Moreau',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     
      nom: 'Clinique du Parc',
      typeEtablissement: 'Clinique',
      numeroTelephone: '22845759',
      email: 'contact@clinique-du-parc.com',
      site: 'https://clinique-du-parc.com',
      directeur: 'Dr. Rousseau',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      nom: 'Hôpital des Sables',
      typeEtablissement: 'Hopital',
      numeroTelephone: '54158745',
      email: 'contact@hopital-sables.com',
      site: 'https://hopital-sables.com',
      directeur: 'Dr. Dubois',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      nom: 'Clinique Belle Vue',
      typeEtablissement: 'Clinique',
      numeroTelephone: '56894523',
      email: 'contact@clinique-bellevue.com',
      site: 'https://clinique-bellevue.com',
      directeur: 'Dr. Blanc',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     
      nom: 'Centre Hospitalier Universitaire',
      typeEtablissement: 'Hopital',
      numeroTelephone: '92181845',
      email: 'contact@chu.com',
      site: 'https://chu.com',
      directeur: 'Dr. Petit',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      
      nom: 'Clinique Saint-Jean',
      typeEtablissement: 'Clinique',
      numeroTelephone: '97452321',
      email: 'contact@clinique-saint-jean.com',
      site: 'https://clinique-saint-jean.com',
      directeur: 'Dr. Charpentier',
      adresse: 'rue hbib bourguiba tunis',
      responsable: 'youssef ghozzi',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
  
  filteredEtablissements: Etablissement[] = [...this.etablissements];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  filterBy(name: string, phone: string): void {
    this.filteredEtablissements = this.etablissements.filter(etablissement => 
      (name ? etablissement.nom?.toLowerCase().includes(name.toLowerCase()) : true) &&
      (phone ? etablissement.numeroTelephone.includes(phone) : true)
    );
  }

  onFilterByName(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterBy(inputValue, '');
  }

  onFilterByPhone(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterBy('', inputValue);
  }

  openAddMedecinModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  saveEtablissement(): void {
    if (this.newEtablissement.nom && 
        this.newEtablissement.typeEtablissement &&
        this.newEtablissement.email && 
        this.newEtablissement.adresse &&
        this.newEtablissement.responsable) {
      
      // Ajout de l'établissement à la liste
      this.etablissements.push({ ...this.newEtablissement });
  
      // Mise à jour de la liste filtrée
      this.filteredEtablissements = [...this.etablissements];
  
      // Réinitialisation de l'objet newEtablissement pour un nouvel ajout
      this.newEtablissement = {} as Etablissement;
  
      // Afficher la notification de succès
      this.showNotification('Établissement ajouté avec succès.');
    } else {
      // Afficher la notification d'erreur
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }
  

  // handleInputChange(event: Event, fieldName: string): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.newMedecin[fieldName as keyof etablissements] = inputElement.value;
  // }

  openModal(modalType: string, etablissement: Etablissement) {
    this.selectedEtablissement = etablissement;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }
  

  saveChangesEtablissement(): void {
    if (!this.selectedEtablissement) {
      return;
    }

    const index = this.etablissements.findIndex(m => m. numeroTelephone === this.selectedEtablissement. numeroTelephone);
    if (index !== -1) {
      this.etablissements[index] = { ...this.selectedEtablissement };
      this.filteredEtablissements = [...this.etablissements];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deleteMedecin(medecin: Etablissement): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.etablissements = this.etablissements.filter(m => m. numeroTelephone !== medecin. numeroTelephone);
      this.filteredEtablissements = [...this.etablissements];
      this.showNotification('Le médecin a été supprimé avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}
