import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import QRCode from 'qrcode';
import { ToastrService } from 'ngx-toastr'; // Assurez-vous d'importer ce service si vous l'utilisez pour les notifications

interface Ordonnance {
  id: string;
  patient: string;
  patientphone: number;
  patientAddress: {
    addressFr: string;
    addressAr: string;
  };
  prescription: {
    medicament: string;
    duree: string;
    posologie: string;
  }[];
  time: string;
  type_de_maladie : string;
  qrCodeData: string;
  qrCodeUrl: string;
}

@Component({
  selector: 'app-ordonnancelist',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ordonnancelist.component.html',
  styleUrls: ['./ordonnancelist.component.scss'] // Correction: styleUrls au lieu de styleUrl
})
export class OrdonnancelistComponent implements OnInit {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedOrdonnance: Ordonnance | null = null;
  newOrdonnance: Ordonnance = {
    id: '',
    patient: '',
    patientphone: 0,
    patientAddress: {
      addressFr: '',
      addressAr: ''
    },
    prescription: [{
      medicament: '',
      duree: '',
      posologie: ''
    }],
    time: '',
    type_de_maladie: '',
    qrCodeData: '',
    qrCodeUrl: ''
  };
  
  selectedTable: any;
  isModalOpen = false;
  selectedPrescription: any;
  searchText: string = '';  // Texte de recherche initialisé à une chaîne vide
  qrCodeUrl: string;
  doctorInfo: any;
  ordonnances: Ordonnance[] = [
    {
      id: 'ord1',
      patient: 'Ali Ben Ali',
      patientphone: 22156486,
      patientAddress: { addressFr: '32 rue de Djerba, Ben Arous, Tunis', addressAr: '32 شارع جربة، بن عروس، تونس' },
      prescription: [
        { medicament: 'Paracétamol', duree: '10 jours', posologie: '1 comprimé toutes les 6 heures si nécessaire' },
        { medicament: 'Amoxicilline', duree: '7 jours', posologie: '1 comprimé toutes les 8 heures' }
      ],
      time: '11 MAY 2024 12:56',
      type_de_maladie:'grippe',
      qrCodeData: 'ID: ord1, Patient: Ali Ben Ali, Doctor: Dr. Youssef Ghozzi, Specialty: Généraliste, Phone: +216 71 234 567, Address: 32 rue de Djerba, Ben Arous, Tunis',
      qrCodeUrl: ''  
    },
    {
      id: 'ord2',
      patient: 'Fatima Zahra',
      patientphone: 22745123,
      patientAddress: { addressFr: '32 rue de Djerba, Ben Arous, Tunis', addressAr: '32 شارع جربة، بن عروس، تونس' },
      prescription: [
        { medicament: 'Ibuprofen', duree: '7 jours', posologie: '1 comprimé toutes les 8 heures en cas de douleur' },
        { medicament: 'Loratadine', duree: '10 jours', posologie: '1 comprimé chaque jour' }
      ],
      time: '11 MAY 2024 10:35',
      type_de_maladie:'covid',
      qrCodeData: 'ID: ord2, Patient: Fatima Zahra, Doctor: Dr. Youssef Ghozzi, Specialty: Généraliste, Phone: +216 71 234 568, Address: 32 rue de Djerba, Ben Arous, Tunis',
      qrCodeUrl: ''  
    },
    {
      id: 'ord3',
      patient: 'Khaled Baccouche',
      patientphone: 98456123,
      patientAddress: { addressFr: '32 rue de Djerba, Ben Arous, Tunis', addressAr: '32 شارع جربة، بن عروس، تونس' },
      prescription: [
        { medicament: 'Oméprazole', duree: '14 jours', posologie: '1 comprimé chaque matin avant le repas' },
        { medicament: 'Metformine', duree: '30 jours', posologie: '1 comprimé avec le repas du soir' }
      ],
      time: '9 JAN 2024 17:38',
      type_de_maladie:'bronchite',
      qrCodeData: 'ID: ord3, Patient: Khaled Baccouche, Doctor: Dr. Youssef Ghozzi, Specialty: Généraliste, Phone: +216 71 234 569, Address: 32 rue de Djerba, Ben Arous, Tunis',
      qrCodeUrl: ''  
    },
    {
      id: 'ord4',
      patient: 'Mariam Bouazizi',
      patientphone: 54745122,
      patientAddress: { addressFr: '32 rue de Djerba, Ben Arous, Tunis', addressAr: '32 شارع جربة، بن عروس، تونس' },
      prescription: [
        { medicament: 'Paracétamol', duree: '7 jours', posologie: '1 cuillère à café toutes les 6 heures si fièvre' },
        { medicament: 'Amoxicilline', duree: '10 jours', posologie: '1 comprimé toutes les 8 heures' }
      ],
      time: '9 DEC 2024 12:56',
      type_de_maladie:'grippe',
      qrCodeData: 'ID: ord4, Patient: Mariam Bouazizi, Doctor: Dr. Youssef Ghozzi, Specialty: Généraliste, Phone: +216 71 234 570, Address: 32 rue de Djerba, Ben Arous, Tunis',
      qrCodeUrl: ''  
    }
  ];
  
  
  filteredOrdonnances: Ordonnance[] = [...this.ordonnances];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit() {
    this.ordonnances.forEach((table, index) => {
      this.generateQRCode(table.qrCodeData, index);
    });
       // Données statiques du médecin
       const doctorInfo = {
        nameFr: 'Dr. Youssef Ghozzi',
        nameAr: 'د. يوسف الغزّي',
        specialtyFr: 'Généraliste',
        specialtyAr: 'طبيب عام',
        phone: '+216 71 234 570',
        email: 'youssefghozzi123@gmail.com',
        location: 'Appartement RAYEN Etage 1 ,32 rue de Djerba, Ben Arous, Tunis',
        stamp: 'Dr. Youssef Ghozzi\nAppartement RAYEN Etage 1, 32 rue de Djerba, Ben Arous, Tunis Num Tel: 71 234 567',
      };
      
      // Sauvegarde dans le local storage
      localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));
      
      // Charger les données dans le composant
      this.loadDoctorInfo();
    }
    loadDoctorInfo() {
      const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo') || '{}');
      this.doctorInfo = doctorInfo;
    }

  filterByName(name: string): void {
    this.filteredOrdonnances = this.ordonnances.filter(ordonnance =>
      ordonnance.patient.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByPhone(phone: string): void {
    this.filteredOrdonnances = this.ordonnances.filter(ordonnance =>
      ordonnance.patientphone.toString().includes(phone)
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

  openAddOrdonnanceModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }
    // Fonction pour générer un ID unique
    generateUniqueId(): string {
      return 'id-' + new Date().getTime();
    }
    saveOrdonnance(): void {
      if (this.newOrdonnance.patient && this.newOrdonnance.time) {
        // Génération de l'ID unique pour l'ordonnance
        this.newOrdonnance.id = this.generateUniqueId();
  
        // Ajout de l'ordonnance à la liste
        const index = this.ordonnances.length;
        this.ordonnances.push({ ...this.newOrdonnance });
  
        // Génération du QR code pour la nouvelle ordonnance
        this.generateQRCode(JSON.stringify(this.newOrdonnance), index);
  
        // Réinitialisation de l'objet newOrdonnance pour un nouvel ajout
        this.newOrdonnance = {} as Ordonnance;
  
        // Afficher la notification de succès
        this.showNotification('Ordonnance ajoutée avec succès.');
      } else {
        // Afficher la notification d'erreur
        this.showNotification('Veuillez remplir tous les champs obligatoires.');
      }
    }
  openModal(modalType: string, ordonnance: Ordonnance) {
    this.selectedOrdonnance = ordonnance;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }

  saveChangesOrdonnance(): void {
    if (!this.selectedOrdonnance) {
      return;
    }

    const index = this.ordonnances.findIndex(o => o.id === this.selectedOrdonnance.id);
    if (index !== -1) {
      this.ordonnances[index] = { ...this.selectedOrdonnance };
      this.filteredOrdonnances = [...this.ordonnances];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deleteOrdonnance(ordonnance: Ordonnance): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ordonnance ?')) {
      this.ordonnances = this.ordonnances.filter(o => o.id !== ordonnance.id);
      this.filteredOrdonnances = [...this.ordonnances];
      this.showNotification('L\'ordonnance a été supprimée avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }

  generateQRCode(data: string, index: number) {
    QRCode.toDataURL(data, { width: 100, margin: 1 }, (err, url) => {
      if (err) {
        console.error('Erreur lors de la génération du QR code:', err);
        return;
      }
      // Stocker l'URL du QR code dans la propriété qrCodeUrl de l'ordonnance
      this.ordonnances[index].qrCodeUrl = url;
      // Mise à jour de la liste filtrée après génération du QR code
      this.filteredOrdonnances = [...this.ordonnances];
    });
  }
  addPrescription(): void {
    // Assurez-vous que newOrdonnance.prescription est bien initialisé
    if (!this.newOrdonnance.prescription) {
      this.newOrdonnance.prescription = [];
    }
    this.newOrdonnance.prescription.push({
      medicament: '',
      duree: '',
      posologie: ''
    });
  }

  removePrescription(index: number): void {
    if (this.newOrdonnance.prescription && this.newOrdonnance.prescription.length > 1) {
      this.newOrdonnance.prescription.splice(index, 1);
    }
  }
}