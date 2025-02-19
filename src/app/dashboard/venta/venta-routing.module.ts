import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarVentaComponent } from './listar-venta/listar-venta.component';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';


const routes: Routes = [
  {
    path:'',
    component: ListarVentaComponent,
  },
  {
    path:'crear',
    component: CrearVentaComponent,

  },
  {
    path:'editar/:id',
    component: CrearVentaComponent,

  },
  {
    path:'reporte-venta',
    component: ReporteVentaComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaRoutingModule {}