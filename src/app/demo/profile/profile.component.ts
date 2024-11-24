import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  doctor = {
    name: 'Dr. Jean Dupont',
    specialty: 'Psychiatre',
    experience: 12,  // années d'expérience
    rating: 4.8,  // note de 1 à 5
    profileImage: 'assets/doctor.jpg',  // image du docteur
    contact: {
      phone: '+33 1 23 45 67 89',
      email: 'jean.dupont@example.com',
      address: '123 Rue de Paris, 75000 Paris, France'
    },
    validationBadge: true,  // badge de validation
    about: 'Dr. Jean Dupont est un psychiatre spécialisé dans les troubles anxieux et les dépressions. Avec plus de 12 ans d’expérience, il accompagne ses patients avec une approche humaniste et personnalisée.',
    certifications: ['Certificat en Psychiatrie', 'Diplôme en Thérapie Cognitivo-Comportementale'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    testimonials: [
      { name: 'Marie', comment: 'Excellent médecin, très à l’écoute.' },
      { name: 'Pierre', comment: 'Dr. Dupont m’a beaucoup aidé à surmonter mes angoisses.' }
    ]
  };
}
