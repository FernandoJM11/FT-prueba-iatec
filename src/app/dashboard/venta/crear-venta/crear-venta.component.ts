import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../../../core/service/venta.service';
import { PlatoService } from '../../../core/service/plato.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss']
})
export class CrearVentaComponent implements OnInit {
  ventaForm!: FormGroup;
  platos: any[] = [];
  ventaId: number | null = null; 
  platoSeleccionado: string = '';
  cantidadSeleccionada: number = 1;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private platoService: PlatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.ventaForm = this.fb.group({
      total: [0, [Validators.required, Validators.min(0)]],
      metodo_pago: ['', Validators.required],
      detalles: this.fb.array([])
    });

    this.platoService.getAll().subscribe(platos => {
      this.platos = platos;
    });

    this.ventaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.ventaId) {
        this.cargarVenta(this.ventaId);
    }

  }

  get detalles() {
    return this.ventaForm.get('detalles') as FormArray;
  }

  agregarDetalle(plato_id: number = 0, cantidad: number = 1) {
    const detalleForm = this.fb.group({
      plato_id: [plato_id, Validators.required],
      cantidad: [cantidad, [Validators.required, Validators.min(1)]]
    });
    this.detalles.push(detalleForm);
  }

  eliminarDetalle(index: number) {
    this.detalles.removeAt(index);
    this.calcularTotal();
  }

  calcularTotal() {
    let total = 0;
    this.detalles.controls.forEach(detalle => {
      const plato = this.platos.find(p => p.id == detalle.value.plato_id);
      if (plato) {
        total += plato.precio * detalle.value.cantidad;
      }
    });
    this.ventaForm.get('total')?.setValue(total);
  }

  cargarVenta(id: number) {
    this.ventaService.getById(id.toString()).subscribe((venta: { total: number; metodo_pago: string; detalles: any[] }) => {
      this.ventaForm.patchValue({
        total: venta.total,
        metodo_pago: venta.metodo_pago
      });

      venta.detalles.forEach((detalle: { plato_id: number; cantidad: number }) => {
        this.agregarDetalle(Number(detalle.plato_id), detalle.cantidad);

      });
  
      this.calcularTotal();
    });
  }
  

guardarVenta() {
    if (this.ventaForm.valid) {
        const ventaData = this.ventaForm.value;
        if (this.ventaId) {
            // Actualizar venta
            this.ventaService.update(this.ventaId.toString(), ventaData).subscribe(response => {
                console.log('Venta actualizada', response);
                this.router.navigate(['/ventas']);
            });
        } else {
            // Crear nueva venta
            this.ventaService.create(ventaData).subscribe(response => {
                console.log('Venta creada', response);
                this.router.navigate(['/ventas']);
            });
        }
    }
}
  cancelar(): void {
    this.router.navigate(['/ventas']);
  }
}
