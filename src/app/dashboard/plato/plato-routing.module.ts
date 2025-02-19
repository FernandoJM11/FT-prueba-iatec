import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlatoComponent } from './crear-plato/crear-plato.component';
import { ListarPlatoComponent } from './listar-plato/listar-plato.component';

const routes: Routes = [
  { path: '', component: ListarPlatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatoRoutingModule { }
