import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-empresa-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {
  empresa: Empresa | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
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

  onDelete(): void {
    if (!this.empresa?.id_empresa) return;

    if (confirm('¿Está seguro de eliminar esta empresa?')) {
      this.empresaService.delete(this.empresa.id_empresa).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/empresas']);
        },
        error: (err) => {
          this.error = 'Error al eliminar la empresa';
          console.error(err);
        }
      });
    }
  }
}