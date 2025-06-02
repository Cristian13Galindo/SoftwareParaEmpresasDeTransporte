export interface Cliente {
  id_cliente?: number;
  nombre_empresa: string;
  nit: string;
  contacto: string;
  direccion: string;
  telefono: string;
  created_at?: string; // Add optional timestamp
  updated_at?: string; // Add optional timestamp
}
