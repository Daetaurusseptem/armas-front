import { Area } from "./area.interface";

export interface Usuario {
  id: string;
  img?: any;
  usuario: string;
  nombre: string;
  password: string;
  status: boolean;
  actualizo: string;
  role?:'ADMIN_ROLE'|'USER_ROLE';
  creadoEl: Date;
  actualizadoEl: Date;
  Areas:Area[]
}
