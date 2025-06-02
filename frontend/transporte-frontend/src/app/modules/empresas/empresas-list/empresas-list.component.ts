import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {
  empresas: Empresa[] = [];
  filteredEmpresas: Empresa[] = [];
  searchTerm: string = '';
  searchField: string = 'nombre';
  loading: boolean = false;
  error: string | null = null;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.loading = true;
    this.empresaService.getAll().subscribe({
      next: (data) => {
        this.empresas = data;
        this.filteredEmpresas = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las empresas';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredEmpresas = [...this.empresas];
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    this.filteredEmpresas = this.empresas.filter(empresa => {
      switch (this.searchField) {
        case 'id':
          return empresa.id_empresa?.toString().includes(searchValue);
        case 'nombre':
          return empresa.nombre.toLowerCase().includes(searchValue);
        case 'nit':
          return empresa.nit.toLowerCase().includes(searchValue);
        case 'correo':
          return empresa.correo.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });
  }

  deleteEmpresa(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar esta empresa?')) {
      this.empresaService.delete(id).subscribe({
        next: () => {
          this.empresas = this.empresas.filter(e => e.id_empresa !== id);
          this.filteredEmpresas = this.filteredEmpresas.filter(e => e.id_empresa !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar la empresa';
          console.error('Error:', error);
        }
      });
    }
  }
}