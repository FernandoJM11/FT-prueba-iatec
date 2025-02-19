import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from '../../webmaterial.module';
import { PlatoRoutingModule } from './plato-routing.module';
import { CrearPlatoComponent } from './crear-plato/crear-plato.component';
import { ListarPlatoComponent } from './listar-plato/listar-plato.component';

const routes: Routes = [
  { path: '', component: ListarPlatoComponent },
  { path: 'crear', component: CrearPlatoComponent }
];

@NgModule({
  declarations: [
    CrearPlatoComponent,
    ListarPlatoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule,
    PlatoRoutingModule,
    //RouterModule.forChild(routes)
  ],
  exports: [
    ListarPlatoComponent
  ]
})
export class PlatoModule { }
