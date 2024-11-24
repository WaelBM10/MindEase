import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: NavigationItem[]
  get?: () => any; // Ajoutez cette ligne si la méthode get est nécessaire
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems: NavigationItem[] = [
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
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
    ]
  },
  {
    id: 'forms',
    title: 'list de User',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'tables',
        title: 'List de Médecin',
        type: 'item',
        url: '/tables/bootstrap',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'apexChart',
        title: 'List de Etablissement',
        type: 'item',
        url: '/apexchart',
        classes: 'nav-item',
        icon: 'feather icon-server'
      },
      {
        id: 'button',
        title: 'List de Pharmacie',
        type: 'item',
        url: '/basic/button',
        classes: 'nav-item',
        icon:'feather icon-zap'
      },
      {
        id: 'forms-element',
        title: 'Gérer les comptes',
        type: 'item',
        url: '/forms/basic',
        classes: 'nav-item',
        icon: 'feather icon-lock'
      },
    ]
  },
  //  {
  //   id: 'Payement',
  //   title: 'Payement',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    id: 'Payement',
    title: 'Payement',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'Payement',
        title: 'Payement',
        type: 'item',
        url: 'apexchart',
        classes: 'nav-item',
        icon: 'icon-zap',
      }
    ]
  },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth/signin',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     },
  //     {
  //       id: 'buy_now',
  //       title: 'Buy Now',
  //       type: 'item',
  //       icon: 'feather icon-book',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.com/item/datta-able-angular/',
  //       target: true,
  //       external: true
  //     }
    ]
//   }
// ];

@Injectable()
export class NavigationService {
  getNavigationItems(): NavigationItem[] {
    return NavigationItems;
  }
}
