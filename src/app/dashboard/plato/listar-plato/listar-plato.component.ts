import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { PlatoService } from '../../../core/service/plato.service';
import { CrearPlatoComponent } from '../crear-plato/crear-plato.component';

@Component({
  selector: 'app-listar-plato',
  templateUrl: './listar-plato.component.html',
  styleUrls: ['./listar-plato.component.scss'],
})
export class ListarPlatoComponent implements OnInit {
  nombreColumnas: string[] = ['Nº', 'Nombre', 'Precio', 'Habilitado', 'Acciones'];
  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private platoService: PlatoService
  ) {}

  ngOnInit(): void {
    this.listaPlatos();
  }

  listaPlatos(): void {
    this.platoService.getAll().subscribe(
      (data: any) => {
        this.paginado = new MatTableDataSource<any>(data);
        this.paginado.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los platos', error);
      }
    );
  }

  create(): void {
    const dialogRef = this.dialog.open(CrearPlatoComponent, {
      data: {
        estado: false,
        title: 'Nuevo Plato',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaPlatos();
      }
    });
  }

  editar(id: any): void {
    const dialogRef = this.dialog.open(CrearPlatoComponent, {
      data: {
        estado: true,
        title: 'Editar Plato',
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaPlatos();
      }
    });
  }

  applyFilters(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

  enablePlato(id: any): void {
    this.platoService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Éxito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500,
        });
        this.listaPlatos();
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
        this.listaPlatos();
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
        this.platoService.delete(id).subscribe(
          (data: any) => {
            Swal.fire('Eliminado!', 'Registro eliminado.', 'success');
            this.listaPlatos();
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
        Swal.fire('Cancelado', 'El plato está a salvo', 'error');
      }
    });
  }
}
