import { Empleado } from "./empleado.interface";


export interface TipoExpediente {
  id_tipo?: string;
  tipo?: string;
  descripcion?: string;
  actualizo?: string;
  creadoEl?: Date;
  actualizadoEl?: Date;
  areaId?: string;
  obligatorio?:boolean
}
