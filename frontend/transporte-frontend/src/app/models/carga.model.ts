export interface Carga {
  id_carga?: number;
  tipo_carga: string;
  peso_toneladas: number;
  descripcion: string;
  precio_por_tonelada: number;
  created_at?: string;
  updated_at?: string;
}
