import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',  // Redirection initiale vers la page 'auth'
    pathMatch: 'full'
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component')
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component')
      },
      {
        path: 'dashboarddoctor',
        loadComponent: () => import('./demo/dashboard-doctor/dashboard-doctor.component').then(m => m.DashboardDoctorComponent) // Assurez-vous que ce composant est standalone
      },
      {
        path:'patientdoctor',
        loadComponent: () => import('./demo/list-de-patient/list-de-patient.component').then(m => m.ListDePatientComponent)
      },
      {
        path:'consultationdoctor',
        loadComponent: () => import('./demo/list-de-consultation/list-de-consultation.component').then(m => m.ListDeConsultationComponent)
      },
      {
        path:'List_Ordonnance',
        loadComponent: () => import('./demo/ordonnance/ordonnancelist/ordonnancelist.component').then(m => m.OrdonnancelistComponent)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
