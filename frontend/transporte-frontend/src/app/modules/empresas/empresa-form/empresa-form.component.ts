import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './empresa-form.component.html'
})
export class EmpresaFormComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    correo: ''
  };
  
  isEditing = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.empresaService.getById(Number(id)).subscribe({
        next: (data) => {
          this.empresa = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos de la empresa';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
  onSubmit(): void {
    this.saving = true;
    this.error = '';
    
    const operation = this.isEditing 
      ? this.empresaService.update(this.empresa)
      : this.empresaService.create(this.empresa);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/empresas']);
      },
      error: (err) => {
        this.error = err;
        this.saving = false;
      }
    });
  }
}