export interface Vehiculo {
  id_vehiculo?: number;
  placa: string;
  marca: string;
  modelo: string;
  capacidad_maxima_toneladas: number;
  estado: string;
  empresa_id: number;
  created_at?: Date;
  updated_at?: Date;
}