import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { VentaService } from '../../../core/service/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.scss'],
})
export class ListarVentaComponent implements OnInit {
  ventas: any[] = [];
  dataSource = new MatTableDataSource<any>(this.ventas);
  displayedColumns: string[] = ['id', 'total', 'metodo_pago', 'fecha', 'acciones'];

  constructor(
    private ventaService: VentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    this.ventaService.getAll().subscribe(
      (data) => {
        this.ventas = data;
        this.dataSource.data = this.ventas;
      },
      (error) => {
        console.error('Error al cargar las ventas', error);
      }
    );
  }

  // Método para eliminar una venta
  deleteVenta(id: string): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡Esta acción no podrá revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.delete(id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La venta ha sido eliminada.', 'success');
            this.loadVentas(); // Recargar la lista de ventas
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un problema',
              text: error.error,
            });
          }
        );
      }
    });
  }

  goToCrearVenta(): void {
    this.router.navigate(['/ventas/crear']);
  }
  goToEditarVenta(id: number): void {
    this.router.navigate(['/ventas/editar', id]);
  }
}