import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CargaService } from '../../../services/carga.service';
import { Carga } from '../../../models/carga.model';

@Component({
  selector: 'app-carga-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carga-detail.component.html',
  styleUrls: ['./carga-detail.component.css']
})
export class CargaDetailComponent implements OnInit {
  carga: Carga | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private cargaService: CargaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCarga();
  }

  loadCarga(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) return;

    this.loading = true;
    this.cargaService.getById(id).subscribe({
      next: (data) => {
        this.carga = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la carga';
        this.loading = false;
      }
    });
  }

  onDelete(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Está seguro que desea eliminar esta carga?')) {
      this.cargaService.delete(id).subscribe({
        next: () => {
          this.router.navigate(['/cargas']);
        },
        error: (err) => {
          this.error = 'Error al eliminar la carga';
        }
      });
    }
  }
}