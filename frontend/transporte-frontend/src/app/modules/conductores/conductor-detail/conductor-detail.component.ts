import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Conductor } from '../../../models/conductor.model';
import { ConductorService } from '../../../services/conductor.service';

@Component({
  selector: 'app-conductor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './conductor-detail.component.html',
  styleUrls: ['./conductor-detail.component.css']
})
export class ConductorDetailComponent implements OnInit {
  conductor: Conductor | null = null;
  loading = false;
  error = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService
  ) {}
  
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID no válido';
      this.loading = false;
      return;
    }
    
    this.conductorService.getById(Number(id)).subscribe({
      next: (data) => {
        this.conductor = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del conductor';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDelete(): void {
    if (!this.conductor?.id_conductor) return;

    if (confirm('¿Está seguro de eliminar este conductor?')) {
      this.conductorService.delete(this.conductor.id_conductor).subscribe({
        next: () => {
          this.router.navigate(['/conductores']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el conductor';
          console.error(err);
        }
      });
    }
  }
}