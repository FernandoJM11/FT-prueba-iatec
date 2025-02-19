import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../../core/service/categoria.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearCategoriaComponent>,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data.estado) {
      this.getById(this.data.id);
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
    });
  }

  getById(id: string): void {
    this.categoriaService.getById(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre
      });
    });
  }

  register(form: any): void {
    this.loading = true;
    if (this.data.estado) {
      this.categoriaService.update(this.data.id, form).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        dataE => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Categoría actualizada con éxito',
            showConfirmButton: false,
            timer: 1500
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
      this.categoriaService.create(form).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        dataR => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Categoría creada con éxito',
            showConfirmButton: false,
            timer: 1500
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