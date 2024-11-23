import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'walidgallouz@gmail.com', password: '123456789', role: 'Super Admin' },
    { email: 'youssefghozzi@gmail.com', password: '123456789', role: 'Doctor' },
    { email: 'user@example.com', password: 'user123', role: 'USER' }
  ];

  constructor() {}

  login(email: string, password: string): string | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user ? user.role : null;
  }
}
