import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlatoService } from '../../../core/service/plato.service';
import { CategoriaService } from '../../../core/service/categoria.service'; // Importa el servicio de categorías
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-plato',
  templateUrl: './crear-plato.component.html',
  styleUrls: ['./crear-plato.component.scss'],
})
export class CrearPlatoComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  categorias: any[] = []; // Lista de categorías

  constructor(
    public dialogRef: MatDialogRef<CrearPlatoComponent>,
    private fb: FormBuilder,
    private platoService: PlatoService,
    private categoriaService: CategoriaService, // Inyecta el servicio de categorías
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadCategorias(); // Cargar las categorías al inicializar el componente
    if (this.data.estado) {
      this.getById(this.data.id);
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoriaId: ['', [Validators.required]],
    });
  }

  // Método para cargar las categorías
  loadCategorias(): void {
    this.categoriaService.getAll().subscribe(
      (data) => {
        this.categorias = data; // Asigna las categorías obtenidas
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  getById(id: string): void {
    this.platoService.getById(id).subscribe((data) => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoriaId: data.categoriaId,
      });
    });
  }

  register(form: any): void {
    this.loading = true;
    if (this.data.estado) {
      this.platoService.update(this.data.id, form).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        (dataE) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Plato actualizado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close(dataE);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un problema',
            text: error.error,
          });
        }
      );
    } else {
      this.platoService.create(form).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        (dataR) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Plato creado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close(dataR);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un problema',
            text: error.error,
          });
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}