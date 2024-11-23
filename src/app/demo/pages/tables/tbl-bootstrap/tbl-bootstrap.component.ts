import { Component ,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
interface Medecin {
  Nom?:string;
  prenom?:string ;
  numeroProfessionnel: string;
  specialite: string;
  sousSpecialite?: string;
  dateDebutExercice: string;
  secondPhone?: string;
  attachedTo: string;
  titre?: string;
  sexe?: string;
  dateNaissance?: string;
  nationalite?: string;
  numeroLicence?: string;
  diplome?: string;
  universite?: string;
  anneeDiplome?: string;
  experience?: string;
  languesParlees?: string;
  biographie?: string;
  photo?: string;
  adresse?: string; // Nouveau champ ajouté
}

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss']
})
export default class TblBootstrapComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedMedecin: Medecin | null = null;
  newMedecin: Medecin = {} as Medecin; // Initialize newMedecin with Medecin type
  medecins: Medecin[] = [
    {
      Nom: 'Soltanie',
      prenom: 'Afef',
      numeroProfessionnel: '98456123',
      specialite: 'Cardiologue',
      dateDebutExercice: '2020-01-01',
      attachedTo: 'Clinique ABC',
      secondPhone: '0102030405',
      titre: 'Dr.',
      sexe: 'F',
      nationalite: 'Française',
      numeroLicence: 'LIC-67890',
      diplome: 'MD',
      universite: 'Université de Paris',
      anneeDiplome: '2018',
      experience: '5 ans',
      languesParlees: 'Français, Anglais',
      biographie: 'Spécialisée en cardiologie interventionnelle.',
      photo: 'assets/images/user/avatar-1.jpg',
      adresse: '123 Rue de Paris, 75001 Paris' // Adresse ajoutée
    },
    {
      Nom: 'Durand',
      prenom: 'Jean',
      numeroProfessionnel: '54321471',
      specialite: 'Dermatologue',
      dateDebutExercice: '2015-03-15',
      attachedTo: 'Hôpital Saint-Louis',
      secondPhone: '0607080910',
      titre: 'Dr.',
      sexe: 'M',
      nationalite: 'Française',
      numeroLicence: 'LIC-12345',
      diplome: 'MD',
      universite: 'Université de Lyon',
      anneeDiplome: '2012',
      experience: '8 ans',
      languesParlees: 'Français, Espagnol',
      biographie: 'Expert en dermatologie esthétique.',
      photo: 'assets/images/user/avatar-2.jpg',
      adresse: '456 Avenue des Champs-Élysées, 75008 Paris' // Adresse ajoutée
    },
    {
      Nom: 'Martin',
      prenom: 'Lucie',
      numeroProfessionnel: '25123478',
      specialite: 'Pédiatre',
      dateDebutExercice: '2018-06-20',
      attachedTo: 'Centre Médical Enfants Heureux',
      secondPhone: '0708091011',
      titre: 'Dr.',
      sexe: 'F',
      nationalite: 'Française',
      numeroLicence: 'LIC-98765',
      diplome: 'MD',
      universite: 'Université de Bordeaux',
      anneeDiplome: '2016',
      experience: '4 ans',
      languesParlees: 'Français, Allemand',
      biographie: 'Passionnée par la médecine pédiatrique.',
      photo: 'assets/images/user/avatar-3.jpg',
      adresse: '789 Boulevard de la République, 33000 Bordeaux' // Adresse ajoutée
    },
    {
      Nom: 'Nguyen',
      prenom: 'Thierry',
      numeroProfessionnel: '22145786',
      specialite: 'Ophtalmologue',
      dateDebutExercice: '2017-04-10',
      attachedTo: 'Hôpital Ophtalmique',
      secondPhone: '0504030201',
      titre: 'Dr.',
      sexe: 'M',
      nationalite: 'Vietnamienne',
      numeroLicence: 'LIC-45678',
      diplome: 'MD',
      universite: 'Université de Marseille',
      anneeDiplome: '2015',
      experience: '6 ans',
      languesParlees: 'Français, Vietnamien',
      biographie: 'Spécialiste des troubles de la vision chez les adultes.',
      photo: 'assets/images/user/avatar-4.jpg',
      adresse: '321 Rue de la République, 13001 Marseille' // Adresse ajoutée
    },
    // Ajoutez d'autres médecins ici
  ];
  
  filteredMedecins: Medecin[] = [...this.medecins];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  filterBy(name: string, phone: string): void {
    this.filteredMedecins = this.medecins.filter(medecin => 
      (name ? medecin.Nom?.toLowerCase().includes(name.toLowerCase()) : true) &&
      (phone ? medecin.numeroProfessionnel.includes(phone) : true)
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

  saveMedecin(): void {
    if (this.newMedecin.numeroProfessionnel && this.newMedecin.specialite && this.newMedecin.dateDebutExercice && this.newMedecin.attachedTo) {
      this.medecins.push(this.newMedecin);
      this.filteredMedecins = [...this.medecins];
      this.newMedecin = {} as Medecin;
      this.showNotification('Médecin ajouté avec succès.');
    } else {
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }

  handleInputChange(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.newMedecin[fieldName as keyof Medecin] = inputElement.value;
  }

  openModal(modalType: string, medecin: Medecin) {
    this.selectedMedecin = medecin;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }
  

  saveChanges(): void {
    if (!this.selectedMedecin) {
      return;
    }

    const index = this.medecins.findIndex(m => m.numeroProfessionnel === this.selectedMedecin.numeroProfessionnel);
    if (index !== -1) {
      this.medecins[index] = { ...this.selectedMedecin };
      this.filteredMedecins = [...this.medecins];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deleteMedecin(medecin: Medecin): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.medecins = this.medecins.filter(m => m.numeroProfessionnel !== medecin.numeroProfessionnel);
      this.filteredMedecins = [...this.medecins];
      this.showNotification('Le médecin a été supprimé avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}
