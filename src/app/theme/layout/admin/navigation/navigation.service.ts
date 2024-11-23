import { Injectable } from '@angular/core';
import { NavigationItem } from './navigation'; // Ajustez le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private role: string = '';

  constructor() {
    // Récupérer le rôle de l'utilisateur depuis le localStorage ou un autre service d'authentification
    this.role = localStorage.getItem('userRole') || 'guest'; // Exemple: 'Super Admin', 'Doctor'
    console.log('User role from localStorage:', this.role); // Ajout de console log pour le débogage
  }

  getNavigationItems(): NavigationItem[] {
    const allNavigationItems: NavigationItem[] = [
      {
        id: 'navigation',
        title: 'Stats',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: 'feather icon-home',
            classes: 'nav-item'
          },
          {
            id: 'dashboarddoctor',
            title: 'Dashboard doctor',
            type: 'item',
            url: '/dashboarddoctor',
            icon: 'feather icon-home',
            classes: 'nav-item'
          },
        ]
      }
          ,
      {
            id: 'forms',
            title: 'Liste de Users',
            type: 'group',
            icon: 'icon-group',
            children: [
              {
                id: 'tables',
                title: 'Liste de Médecins',
                type: 'item',
                url: '/tables/bootstrap',
                classes: 'nav-item',
                icon: 'feather icon-user'
              },
              {
                id: 'patientdoctor',
                title: 'Liste de Patient',
                type: 'item',
                url: '/patientdoctor',
                classes: 'nav-item',
                icon: 'feather icon-user'
              }
              ,
              {
                id: 'consultationdoctor',
                title: 'Liste de Consultation',
                type: 'item',
                url: '/consultationdoctor',
                classes: 'nav-item',
                icon: 'feather icon-zap'
              },
              {
                id: 'apexChart',
                title: 'Liste d’Etablissement ',
                type: 'item',
                url: '/apexchart',
                classes: 'nav-item',
                icon: 'feather icon-server'
              },
              {
                id: 'button',
                title: 'Liste de Pharmacie',
                type: 'item',
                url: '/basic/button',
                classes: 'nav-item',
                icon: 'feather icon-zap'
              },
              {
                id: 'forms-element',
                title: 'Gérer les comptes',
                type: 'item',
                url: '/forms/basic',
                classes: 'nav-item',
                icon: 'feather icon-lock'
              },
              {
                id: 'List d`Ordonnance',
                title: 'List d`Ordonnance',
                type: 'item',
                url: '/List_Ordonnance',
                classes: 'nav-item',
                icon: 'feather icon-file-text'
              }
            ]
          }
        ]

    const filteredItems = this.filterNavigationByRole(allNavigationItems, this.role);

    // Afficher la liste finale des éléments de navigation après filtrage
    console.log('Liste finale des éléments de navigation après filtrage:', filteredItems);

    return filteredItems;
  }

  private filterNavigationByRole(items: NavigationItem[], role: string): NavigationItem[] {
    // Définition des permissions de rôle
    const rolePermissions: { [key: string]: string[] } = {
      'Super Admin': ['dashboard', 'tables', 'apexChart', 'button', 'forms-element'],
      'Doctor': ['dashboarddoctor','patientdoctor','consultationdoctor','List d`Ordonnance']
      // Ajoutez d'autres rôles et leurs permissions ici
    };

    // Filtrer les éléments de navigation
    return items.reduce((acc: NavigationItem[], item) => {
      if (item.type === 'group') {
        // Si l'élément est un groupe, filtrer ses enfants
        const children = item.children ? this.filterNavigationByRole(item.children, role) : [];

        // Log pour vérifier les enfants filtrés
        console.log(`Groupe ${item.id} avec enfants filtrés:`, children);

        // Ajouter le groupe avec ses enfants filtrés seulement s'il a des enfants ou s'il est explicitement autorisé
        if (children.length > 0) {
          acc.push({ ...item, children });
        }
      } else if (item.type === 'item') {
        // Si l'élément est un item, vérifier s'il correspond aux permissions du rôle
        if (rolePermissions[role] && rolePermissions[role].includes(item.id)) {
          acc.push(item); // Ajouter l'item directement
        }
      }
      return acc;
    }, []);
  }
}
