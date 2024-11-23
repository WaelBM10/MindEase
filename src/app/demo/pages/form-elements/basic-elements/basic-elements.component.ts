import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importer NgbModal
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';



interface User {
  email: string;
  phone?: string;
  password: string;
  nom?: string;
  prenom?: string;
  role?: string;
  locale?: string;
}

@Component({
  selector: 'app-basic-elements',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export default class BasicElementsComponent {
  @ViewChild('profileModal') profileModal: any;
  @ViewChild('editModal') editModal: any;
  selectedUser: User | null = null;
  newUser: User = {} as User;
  users: User[] = [
    {
      email: 'youssefghozzi@gmail.com',
      phone: '98745654',
      password: 'password1',
      nom: 'youssef',
      prenom: 'ghozzi',
      role: 'Doctor',
      locale: 'Hôpital Saint-Joseph'
    },
    {
      email: 'walidgallouz@gmail.com',
      phone: '55698254',
      password: 'password2',
      nom: 'walid',
      prenom: 'gallouz',
      role: 'pharmacien',
      locale: 'Pharmacie centrale'
    },
    {
      email: 'mohamedkahla@gmail.com',
      phone: '22874159',
      password: 'password3',
      nom: 'mohamed',
      prenom: 'kahla',
      role: 'doctor',
      locale: 'Clinique Tawfik'
    }
    // Ajoutez d'autres utilisateurs selon vos besoins
  ];
  
  filteredUsers: User[] = [...this.users];

  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  filterBy(name: string, phone: string): void {
    this.filteredUsers = this.users.filter(user =>
      (name ? (user.nom?.toLowerCase().includes(name.toLowerCase()) || user.prenom?.toLowerCase().includes(name.toLowerCase())) : true) &&
      (phone ? user.phone?.includes(phone) : true)
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

  openAddUserModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  saveUser(): void {
    if (this.newUser.email && this.newUser.password) {
      // Ajout de l'utilisateur à la liste
      this.users.push({ ...this.newUser });
  
      // Mise à jour de la liste filtrée
      this.filteredUsers = [...this.users];
  
      // Réinitialisation de l'objet newUser pour un nouvel ajout
      this.newUser = {} as User;
  
      // Afficher la notification de succès
      this.showNotification('Utilisateur ajouté avec succès.');
    } else {
      // Afficher la notification d'erreur
      this.showNotification('Veuillez remplir tous les champs obligatoires.');
    }
  }

  openModal(modalType: string, user: User) {
    this.selectedUser = user;
    
    if (modalType === 'view') {
      this.modalService.open(this.profileModal);
    } else if (modalType === 'edit') {
      this.modalService.open(this.editModal);
    }
  }

  saveChangesUser(): void {
    if (!this.selectedUser) {
      return;
    }

    const index = this.users.findIndex(u => u.email === this.selectedUser.email);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser };
      this.filteredUsers = [...this.users];
      this.showNotification('Les modifications ont été enregistrées avec succès.');
    }

    this.modalService.dismissAll();
  }

  deleteUser(user: User): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.users = this.users.filter(u => u.email !== user.email);
      this.filteredUsers = [...this.users];
      this.showNotification('L’utilisateur a été supprimé avec succès.');
    }
  }

  showNotification(message: string): void {
    this.toastr.success(message);
  }
}
