import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard', // Lazy load the Demand Management module
      loadChildren: () =>
        import('./dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        ),
    },
    {
      path: 'demand', // Lazy load the Demand Management module
      loadChildren: () =>
        import('./demand-management/demand-management.module').then(
          (m) => m.DemandManagementModule
        ),
    },
    { path: '**', redirectTo: 'dashboard' },
  ];
