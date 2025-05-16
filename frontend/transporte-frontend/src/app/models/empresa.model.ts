export interface Empresa {
  id_empresa?: number;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: string;
  correo: string;
  created_at?: Date;
  updated_at?: Date;
}