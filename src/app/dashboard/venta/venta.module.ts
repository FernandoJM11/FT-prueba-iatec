import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VentaRoutingModule } from './venta-routing.module';
import { ListarVentaComponent } from './listar-venta/listar-venta.component';
import { PlatoRoutingModule } from '../plato/plato-routing.module';
import { WebMaterialModule } from '../../webmaterial.module';
import { FormsModule } from '@angular/forms';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';

@NgModule({
  declarations: [
    ListarVentaComponent,
    CrearVentaComponent,
    ReporteVentaComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    WebMaterialModule,
    FormsModule,
    PlatoRoutingModule,
    RouterModule,
  ],
  exports: [
      ListarVentaComponent,
      CrearVentaComponent,
      ReporteVentaComponent
    ]
})
export class VentaModule {}