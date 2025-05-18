export interface Viaje {
  id_viaje?: number;
  fecha_salida: string;
  fecha_llegada: string;
  origen: string;
  destino: string;
  distancia_km?: number;
  tiempo_estimado_horas?: number;
  costo_total: number;
  id_vehiculo: number;
  id_carga: number;
  id_cliente: number;
  id_destinatario: number;
  id_estado: number;
  created_at?: string;
  updated_at?: string;
  // Campos calculados que pueden venir de la API
  vehiculo_placa?: string;
  cliente_nombre?: string;
  destinatario_nombre?: string;
  estado_nombre?: string;
  duracion_horas?: number;
}
