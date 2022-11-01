import { Area } from "./area.interface";

export interface EmpleadoRegistrar {
  id?: string;
  numero_empleado?: string;
  nombre?: string;
  departamentoId?:string
  img?: any;
  jefeId?:string;
  status?: boolean;
  actualizo?: string;
  creadoEl?: Date;
  actualizadoEl?: Date;
}
