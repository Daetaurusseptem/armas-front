import { TipoExpediente } from "./tipo_expediente.interface";

export interface Expediente {
  id?: string;
  nombre?: string;
  nota?: string;
  actualizo?: string;
  path?: string;
  empleadoId?:string;
  empresaId?:string;
  areaId?:string;
  tipo_expediente?:string;
  Tipo_Expediente:TipoExpediente
}
