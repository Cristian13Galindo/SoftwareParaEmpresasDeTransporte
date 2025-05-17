export interface Vehiculo {
  id_vehiculo?: number;
  placa: string;
  marca: string;
  modelo: string;
  capacidad_maxima_toneladas: number;
  estado: string;
  id_empresa: number;  // Cambiado de empresa_id a id_empresa
  id_conductor?: number; // Añadido según la estructura de la base de datos
  
  // Podemos mantener estos campos si el backend los usa
  created_at?: Date;
  updated_at?: Date;
}