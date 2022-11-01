import { Area } from "./area.interface";
import { Departamento } from "./departamento.interface";
import { Empleado } from "./empleado.interface";
import { Empresa } from "./empresa.interface";
import { Usuario } from "./usuario.interface";

export interface Busqueda{
  ok:Boolean,
  busqueda: string;
  usuarios?: Usuario[];
  empresas?: Empresa[];
  areas?: Area[];
  departamentos?: Departamento[];
  empleados?: Empleado[];
}
