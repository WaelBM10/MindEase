import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Pour utiliser ngModel
import { AuthService } from './auth-service.service'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {
  email: string = '';
  password: string = '';

  // Tableau fictif d'utilisateurs
  users = [
    { email: 'walidgallouz@gmail.com', password: '123456789', role: 'Super Admin' },
    { email: 'youssefghozzi@gmail.com', password: '123456789', role: 'Doctor' },
    { email: 'user@example.com', password: 'user123', role: 'USER' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const role = this.authService.login(this.email, this.password);

    if (role) {
      localStorage.setItem('userRole', role); // Stocker le rôle de l'utilisateur
      console.log('Role set in localStorage:', role); // Ajout de console log pour le débogage

      if (role === 'Super Admin') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'Doctor') {
        this.router.navigate(['/dashboarddoctor']);
      } else {
        this.router.navigate(['/dashboard/user']);
      }
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
}
