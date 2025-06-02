import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DestinatarioFinal } from '../../../models/destinatario.model';
import { DestinatarioService } from '../../../services/destinatario.service';

@Component({
  selector: 'app-destinatario-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destinatario-detail.component.html',
  styleUrls: ['./destinatario-detail.component.css']
})
export class DestinatarioDetailComponent implements OnInit {
  destinatario: DestinatarioFinal | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinatarioService: DestinatarioService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.destinatarioService.getById(Number(id)).subscribe({
      next: (data) => {
        this.destinatario = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del destinatario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDelete(): void {
    if (!this.destinatario?.id_destinatario) return;

    if (confirm('¿Está seguro de eliminar este destinatario?')) {
      this.destinatarioService.delete(this.destinatario.id_destinatario).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/destinatarios']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el destinatario';
          console.error(err);
        }
      });
    }
  }
}