export interface Factura {
  id_factura?: number;
  numero_factura: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  subtotal: number;
  iva: number;
  total: number;
  estado_pago: string;
  metodo_pago: string; // Nuevo campo añadido
  observaciones?: string;
  cliente: number;
  viaje: number;
  cliente_nombre?: string; // Campo calculado
  viaje_origen_destino?: string; // Campo calculado
  created_at?: string;
  updated_at?: string;
}