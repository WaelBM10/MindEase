import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/theme/layout/admin/navigation/navigation.service';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() type: string;

  navigation: any;
  breadcrumbList: Array<any> = [];
  navigationList: any;

  constructor(
    private _router: Router,
    private navigationService: NavigationService,
    private titleService: Title
  ) {
    const role = ''; // Passez ici le rôle approprié de l'utilisateur
    this.navigation = this.navigationService.getNavigationItems();
    this.setBreadcrumb();
  }

  setBreadcrumb() {
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const routerUrl = event.urlAfterRedirects;
        if (routerUrl && typeof routerUrl === 'string') {
          this.breadcrumbList.length = 0;
          this.filterNavigation(routerUrl);
        }
      }
    });
  }

  filterNavigation(activeLink: string) {
    let result: any = [];
    let title = 'Welcome';
    this.navigation.forEach((a: NavigationItem) => {
      if (a.type === 'item' && a.url === activeLink) {
        result = [
          {
            url: a.url,
            title: a.title,
            breadcrumbs: a.breadcrumbs ?? true,
            type: a.type
          }
        ];
        title = a.title;
      } else if (a.type === 'group' && a.children) {
        a.children.forEach((b: NavigationItem) => {
          if (b.type === 'item' && b.url === activeLink) {
            result = [
              {
                url: b.url,
                title: b.title,
                breadcrumbs: b.breadcrumbs ?? true,
                type: b.type
              }
            ];
            title = b.title;
          } else if (b.type === 'collapse' && b.children) {
            b.children.forEach((c: NavigationItem) => {
              if (c.type === 'item' && c.url === activeLink) {
                result = [
                  {
                    url: b.url,
                    title: b.title,
                    breadcrumbs: b.breadcrumbs ?? true,
                    type: b.type
                  },
                  {
                    url: c.url,
                    title: c.title,
                    breadcrumbs: c.breadcrumbs ?? true,
                    type: c.type
                  }
                ];
                title = c.title;
              }
            });
          }
        });
      }
    });
    this.navigationList = result;
    this.titleService.setTitle(`${title} | Datta Able Angular Template`);
  }
}
