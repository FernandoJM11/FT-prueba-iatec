import { Route } from '@angular/router';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full',
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./dashboard/categoria/categoria.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'platos', 
    loadChildren: () =>
      import('./dashboard/plato/plato.module').then((m) => m.PlatoModule), 
  },
  {
    path: 'ventas', 
    loadChildren: () =>
      import('./dashboard/venta/venta.module').then((m) => m.VentaModule), 
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  
  { path: '**', redirectTo: 'categorias' }, 
];