import { Empleado } from "./empleado.interface";


export interface Departamento {
  id?: string;
  nombre?: string;
  descripcion?: string;
  creadoEl?: Date;
  actualizadoEl?: Date;
  empresaId?: string;
  empleados:Empleado[]
}
