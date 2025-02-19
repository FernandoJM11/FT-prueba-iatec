import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../core/service/categoria.service';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.scss'],
})
export class ListarCategoriaComponent implements OnInit {
  nombreColumnas: string[] = ['Nº', 'Nombre', 'Acciones'];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listaCategorias();
  }

  listaCategorias(): void {
    this.categoriaService.getAll().subscribe(
      (data: any) => {
        this.paginado = new MatTableDataSource<any>(data);
        this.paginado.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  create(): void {
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      data: {
        estado: false,
        title: 'Nueva Categoría',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCategorias();
      }
    });
  }

  editar(id: any): void {
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      data: {
        estado: true,
        title: 'Editar Categoría',
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCategorias();
      }
    });
  }

  applyFilters(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

  enableCategoria(id: any): void {
    this.categoriaService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Éxito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500,
        });
        this.listaCategorias();
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error',
          text: error.error,
          showConfirmButton: false,
          timer: 1500,
        });
        this.listaCategorias();
      }
    );
  }

  delete(id: any): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡Esta acción no podrá revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(id).subscribe(
          (data: any) => {
            Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
            this.listaCategorias();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un problema',
              text: error.error,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La categoría está a salvo', 'error');
      }
    });
  }
}