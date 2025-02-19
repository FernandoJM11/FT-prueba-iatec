import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { WebMaterialModule } from '../../webmaterial.module'; // Asegúrate de que este módulo exista
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component'; // Asegúrate de que este componente exista
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';


@NgModule({
  declarations: [
    ListarCategoriaComponent,
    CrearCategoriaComponent,
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    WebMaterialModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListarCategoriaComponent,
  ],
})
export class CategoriasModule {}