import { Area } from "./area.interface";

export interface Usuario {
  id: string;
  img?: any;
  usuario: string;
  nombre: string;
  password: string;
  status: boolean;
  actualizo: string;
  creadoEl: Date;
  actualizadoEl: Date;
  Areas:Area[]
}
