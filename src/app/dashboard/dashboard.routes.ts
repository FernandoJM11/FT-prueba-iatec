import { Route } from '@angular/router';

export const DASHBOARD_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard1',
    pathMatch: 'full',
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categoria/categoria.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'platos', 
    loadChildren: () => import('./plato/plato.module').then((m) => m.PlatoModule),
  },
  {
    path: 'ventas', 
    loadChildren: () => import('./venta/venta.module').then((m) => m.VentaModule),
  },
];