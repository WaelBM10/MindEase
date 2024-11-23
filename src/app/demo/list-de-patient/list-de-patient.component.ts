import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

interface Patient {
  nom: string;                        // Nom du patient
  prenom: string;                     // Prénom du patient
  sexe: 'Masculin' | 'Féminin';       // Sexe du patient (masculin ou féminin)
  dateNaissance: Date;                // Date de naissance du patient
  nationalite: string;                // Nationalité du patient
  etatCivil: string;                  // État civil (Célibataire, Marié, etc.)
  profession?: string;                // Profession (optionnel)
  groupeSanguin: string;              // Groupe sanguin
  allergies?: string;                 // Liste des allergies connues (optionnel)
  maladiesChroniques?: string;        // Maladies chroniques (optionnel)
  medicaments?: string;               // Liste des médicaments actuels (optionnel)
  antecedentsMedicaux?: string;       // Antécédents médicaux (optionnel)
  assurance?: string;                 // Nom de l'assurance santé (optionnel)
  contactsUrgence?: string;           // Numéro de contact en cas d'urgence (optionnel)
  relationContactUrgence?: string;    // Relation du contact d'urgence (optionnel)
  cin: string;                        // Carte d'identité nationale (CIN)
}

@Component({
  selector: 'app-list-de-patient',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-de-patient.component.html',
  styleUrl: './list-de-patient.component.scss'
})
export class ListDePatientComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedPatient: Patient | null = null;
  newPatient: Patient = {} as Patient;
  patients: Patient[] = [
    {
      nom: 'Ali',
      prenom: 'Ben Ahmed',
      sexe: 'Masculin',
      dateNaissance: new Date('1980-01-15'),
      nationalite: 'Tunisienne',
      etatCivil: 'Célibataire',
      profession: 'Ingénieur',
      groupeSanguin: 'A+',
      allergies: 'Aucune',
      maladiesChroniques: 'Aucune',
      medicaments: 'Aucun',
      antecedentsMedicaux: 'Aucun',
      assurance: 'Assurance Santé ABC',
      contactsUrgence: '98765432',
      relationContactUrgence: 'Frère',
      cin: '12345678'
    },
    {
      nom: 'Fatma',
      prenom: 'Zouari',
      sexe: 'Féminin',
      dateNaissance: new Date('1990-03-22'),
      nationalite: 'Tunisienne',
      etatCivil: 'Mariée',
      profession: 'Enseignante',
      groupeSanguin: 'B-',
      allergies: 'Pollen',
      maladiesChroniques: 'Asthme',
      medicaments: 'Ventoline',
      antecedentsMedicaux: 'Hospitalisation en 2015',
      assurance: 'Assurance Santé XYZ',
      contactsUrgence: '98123456',
      relationContactUrgence: 'Mari',
    
      cin: '23456789'
    },
    {
      nom: 'Mohamed',
      prenom: 'Jlassi',
      sexe: 'Masculin',
      dateNaissance: new Date('1975-07-30'),
      nationalite: 'Tunisienne',
      etatCivil: 'Divorcé',
      profession: 'Médecin',
      groupeSanguin: 'O+',
      allergies: 'Pénicilline',
      maladiesChroniques: 'Diabète',
      medicaments: 'Metformine',
      antecedentsMedicaux: 'Chirurgie en 2020',
      assurance: 'Assurance Santé ABC',
      contactsUrgence: '96112233',
      relationContactUrgence: 'Sœur',
   
      cin: '34567890'
    },
    {
      nom: 'Leila',
      prenom: 'Trabelsi',
      sexe: 'Féminin',
      dateNaissance: new Date('1985-11-12'),
      nationalite: 'Tunisienne',
      etatCivil: 'Mariée',
      profession: 'Comptable',
      groupeSanguin: 'AB+',
      allergies: 'Aucune',
      maladiesChroniques: 'Aucune',
      medicaments: 'Aucun',
      antecedentsMedicaux: 'Accouchement en 2018',
      assurance: 'Assurance Santé DEF',
      contactsUrgence: '95112233',
      relationContactUrgence: 'Mère',
      cin: '45678901'
    },
    {
      nom: 'Khaled',
      prenom: 'Saad',
      sexe: 'Masculin',
      dateNaissance: new Date('1965-05-20'),
      nationalite: 'Tunisienne',
      etatCivil: 'Marié',
      profession: 'Avocat',
      groupeSanguin: 'A-',
      allergies: 'Aucune',
      maladiesChroniques: 'Hypertension',
      medicaments: 'Lisinopril',
      antecedentsMedicaux: 'Hospitalisation en 2019',
      assurance: 'Assurance Santé GHI',
      contactsUrgence: '91112233',
      relationContactUrgence: 'Épouse',

      cin: '56789012'
    }
  ];
  
  filteredPatients: Patient[] = [...this.patients];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  filterByName(name: string): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.nom.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByPhone(phone: string): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.contactsUrgence?.includes(phone) ?? false
    );
  }

  onFilterByName(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterByName(inputValue);
  }

  onFilterByPhone(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterByPhone(inputValue);
  }

  openAddPatientModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  savePatient(): void {
    if (this.newPatient.nom && this.newPatient.prenom && this.newPatient.dateNaissance && 
        this.newPatient.sexe && this.newPatient.groupeSanguin && this.newPatient.cin) {
      
      // Ajout du patient à la liste
      this.patients.push({ ...this.newPatient });
  
      // Mise à jour de la liste filtrée
      this.filteredPatients = [...this.patients];
  
      // Réinitialisation de l'objet newPatient pour un nouvel ajout
      this.newPatient = {} as Patient;
  
      // Afficher la notification de succès
      this.showNotification('Patient ajouté avec succès.');
    } else {
      // Afficher la notification d'erreur
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }

  openModal(modalType: string, patient: Patient) {
    this.selectedPatient = patient;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }

  saveChangesPatient(): void {
    if (!this.selectedPatient) {
      return;
    }

    const index = this.patients.findIndex(p => p.cin === this.selectedPatient?.cin);
    if (index !== -1) {
      this.patients[index] = { ...this.selectedPatient };
      this.filteredPatients = [...this.patients];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deletePatient(patient: Patient): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.patients = this.patients.filter(p => p.cin !== patient.cin);
      this.filteredPatients = [...this.patients];
      this.showNotification('Le patient a été supprimé avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}