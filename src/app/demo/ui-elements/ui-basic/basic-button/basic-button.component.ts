import { Component ,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
interface Pharmacie {
  nom?: string;
  numeroTelephone?: string;
  responsable?: string;
  email?: string;
  adresse?: string;
  type?: string;
}

@Component({
  selector: 'app-basic-button',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss']
})
export default class BasicButtonComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedPharmacie: Pharmacie | null = null;
  newPharmacie: Pharmacie = {} as Pharmacie; // Initialize newPharmacie with Pharmacie type
  pharmacies: Pharmacie[] = [
    {
      nom: 'Pharmacie du Centre',
      numeroTelephone: '98452147',
      email: 'contact@pharmacie-centre.com',
      adresse: '10 rue du Centre, Tunis',
      responsable: 'Mme. Smith',
      type: 'Pharmacie'

    },
    {
      nom: 'Pharmacie des Lilas',
      numeroTelephone: '55742125',
      email: 'contact@pharmacie-lilas.com',
      adresse: '15 rue des Lilas, Tunis',
      responsable: 'M. Dupont',
      type: 'Pharmacie'
    },
    {
      nom: 'Pharmacie Saint-Paul',
      numeroTelephone: '24153624',
      email: 'contact@pharmacie-saint-paul.com',
      adresse: '20 rue Saint-Paul, Tunis',
      responsable: 'Mme. Lefevre',
      type: 'Pharmacie'

    },
    // Ajoutez plus de données factices si nécessaire
  ];
  filteredPharmacies: Pharmacie[] = [...this.pharmacies];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}
 
  filterBy(name: string, phone: string): void {
    this.filteredPharmacies = this.pharmacies.filter(pharmacie => 
      (name ? pharmacie.nom?.toLowerCase().includes(name.toLowerCase()) : true) &&
      (phone ? pharmacie.numeroTelephone.includes(phone) : true)
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

  openAddPharmacieModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  savePharmacie(): void {
    if (this.newPharmacie.nom && 
        this.newPharmacie.type&&
        this.newPharmacie.numeroTelephone &&
        this.newPharmacie.email && 
        this.newPharmacie.adresse &&
        this.newPharmacie.responsable) {
      
      // Ajout de la pharmacie à la liste
      this.pharmacies.push({ ...this.newPharmacie });
  
      // Mise à jour de la liste filtrée
      this.filteredPharmacies = [...this.pharmacies];
  
      // Réinitialisation de l'objet newPharmacie pour un nouvel ajout
      this.newPharmacie = {} as Pharmacie;
  
      // Afficher la notification de succès
      this.showNotification('Pharmacie ajoutée avec succès.');
    } else {
      // Afficher la notification d'erreur
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }

  openModal(modalType: string, pharmacie: Pharmacie) {
    this.selectedPharmacie = pharmacie;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }

  saveChangesPharmacie(): void {
    if (!this.selectedPharmacie) {
      return;
    }

    const index = this.pharmacies.findIndex(p => p.numeroTelephone === this.selectedPharmacie.numeroTelephone);
    if (index !== -1) {
      this.pharmacies[index] = { ...this.selectedPharmacie };
      this.filteredPharmacies = [...this.pharmacies];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deletePharmacie(pharmacie: Pharmacie): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pharmacie ?')) {
      this.pharmacies = this.pharmacies.filter(p => p.numeroTelephone !== pharmacie.numeroTelephone);
      this.filteredPharmacies = [...this.pharmacies];
      this.showNotification('La pharmacie a été supprimée avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}