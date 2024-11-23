import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

interface Consultation {
  nomPatient?: string;                // Nom du patient
  numeroTelephonePatient?: string;    // Numéro de téléphone du patient
  dateConsultation?: Date;            // Date de la consultation
  typeConsultation?: string;          // Type de consultation
  maladie?: string;                   // Maladie diagnostiquée
  constatation?: string;              // Constatations du médecin
  notesMedecin?: string;              // Notes spécifiques du médecin (optionnel)
}

@Component({
  selector: 'app-list-de-consultation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-de-consultation.component.html',
  styleUrls: ['./list-de-consultation.component.scss']
})
export class ListDeConsultationComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedConsultation: Consultation | null = null;
  newConsultation: Consultation = {} as Consultation;
  consultations: Consultation[] = [
    {
      nomPatient: 'Ali Ben Ahmed',
      numeroTelephonePatient: '98765432',
      dateConsultation: new Date('2024-09-01'),
      typeConsultation: 'Générale',
      maladie: 'Grippe',
      constatation: 'Recommander du repos et de l\'hydratation',
      notesMedecin: 'Patient en bonne santé'
    },
    {
      nomPatient: 'Fatma Zouari',
      numeroTelephonePatient: '98123456',
      dateConsultation: new Date('2024-09-05'),
      typeConsultation: 'Dermatologie',
      maladie: 'Eczéma',
      constatation: 'Prescrire une crème hydratante',
      notesMedecin: 'Asthme sous contrôle',
    },
    {
      nomPatient: 'Mohamed Jlassi',
      numeroTelephonePatient: '96112233',
      dateConsultation: new Date('2024-09-10'),
      typeConsultation: 'Cardiologie',
      maladie: 'Hypertension',
      constatation: 'Prescrire un antihypertenseur',
      notesMedecin: 'Suivi régulier du diabète',
    },
    {
      nomPatient: 'Leila Trabelsi',
      numeroTelephonePatient: '95112233',
      dateConsultation: new Date('2024-09-12'),
      typeConsultation: 'Pédiatrie',
      maladie: 'Varicelle',
      constatation: 'Recommander des soins à domicile',
      notesMedecin: 'Bonne santé générale'
    },
    {
      nomPatient: 'Khaled Saad',
      numeroTelephonePatient: '91112233',
      dateConsultation: new Date('2024-09-15'),
      typeConsultation: 'Ophtalmologie',
      maladie: 'Conjonctivite',
      constatation: 'Prescrire des gouttes ophtalmiques',
      notesMedecin: 'Contrôle de l’hypertension nécessaire',
    }
  ];

  filteredConsultations: Consultation[] = [...this.consultations]; // Initialiser les consultations filtrées

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  filterBy(name: string, phone: string): void {
    this.filteredConsultations = this.consultations.filter(consultation => 
      (name ? consultation.nomPatient?.toLowerCase().includes(name.toLowerCase()) : true) &&
      (phone ? consultation.numeroTelephonePatient?.includes(phone) : true)
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

  openAddConsultationModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  saveConsultation(): void {
    if (this.newConsultation.nomPatient && 
        this.newConsultation.numeroTelephonePatient &&
        this.newConsultation.dateConsultation &&
        this.newConsultation.typeConsultation && 
        this.newConsultation.maladie &&
        this.newConsultation.constatation) {
      
      // Ajout de la consultation à la liste
      this.consultations.push({ ...this.newConsultation });
  
      // Mise à jour de la liste filtrée
      this.filteredConsultations = [...this.consultations];
  
      // Réinitialisation de l'objet newConsultation pour un nouvel ajout
      this.newConsultation = {} as Consultation;
  
      // Afficher la notification de succès
      this.showNotification('Consultation ajoutée avec succès.');
    } else {
      // Afficher la notification d'erreur
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }

  openModal(modalType: string, consultation: Consultation) {
    this.selectedConsultation = consultation;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }

  saveChangesConsultation(): void {
    if (!this.selectedConsultation) {
      return;
    }

    const index = this.consultations.findIndex(c => c.numeroTelephonePatient === this.selectedConsultation?.numeroTelephonePatient);
    if (index !== -1) {
      this.consultations[index] = { ...this.selectedConsultation };
      this.filteredConsultations = [...this.consultations];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deleteConsultation(consultation: Consultation): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) {
      this.consultations = this.consultations.filter(c => c.numeroTelephonePatient !== consultation.numeroTelephonePatient);
      this.filteredConsultations = [...this.consultations];
      this.showNotification('La consultation a été supprimée avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}
