import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VentaService } from '../../../core/service/venta.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.scss'],
})
export class ReporteVentaComponent implements OnInit {
  ventas: any[] = []; // Lista de ventas
  dataSource = new MatTableDataSource<any>(this.ventas); 
  displayedColumns: string[] = ['id', 'total', 'metodo_pago', 'fecha', 'detalles'];

  reporteForm: FormGroup;

  constructor(
    private ventaService: VentaService,
    private fb: FormBuilder
  ) {
    this.reporteForm = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0]], 
    });
  }

  ngOnInit(): void {
    this.cargarReporteDiario();
  }

  tieneDetalles = (index: number, row: any) => row.hasOwnProperty('mostrarDetalles') && row.mostrarDetalles;

  cargarReporteDiario(): void {
    const fecha = this.reporteForm.get('fecha')?.value;
  
    this.ventaService.reporteDiario({ fecha }).subscribe(
      (data) => {
        this.ventas = data.ventas.map((venta: any) => ({
          ...venta,
          mostrarDetalles: false, 
        }));
        this.dataSource.data = this.ventas;
      },
      (error) => {
        console.error('Error al cargar el reporte diario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el reporte diario.',
        });
      }
    );
  }

  toggleDetalles(venta: any): void {
    venta.mostrarDetalles = !venta.mostrarDetalles;
    this.dataSource.data = [...this.dataSource.data];
  }
}