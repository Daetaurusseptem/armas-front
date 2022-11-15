import { Departamento } from './departamento.interface';
import { Area } from "./area.interface";
import { Empresa } from "./empresa.interface";
import { Usuario } from "./usuario.interface";
import { Empleado } from './empleado.interface';
import { Expediente } from './empresa.interface copy';

export interface ArrayResponse {
  ok: boolean;
  usuarios?: Usuario[];
  empresas?: Empresa[];
  areas?: Area[];
  empleados?: Empleado[];
  departamentos?: Departamento[];
  expedientes?:Expediente[]
}
