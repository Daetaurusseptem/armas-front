import { Area } from "./area.interface";
import { Departamento } from "./departamento.interface";
import { Empresa } from "./empresa.interface";

export interface Empleado {
  id: string;
  numero_empleado: string;
  nombre: string;
  img?: any;
  areaId:string;
  departamentoId:string;
  status: boolean;
  actualizo: string;
  creadoEl: Date;
  jefeId:string,
  actualizadoEl: Date;
  Departamento?:Departamento[];
  Empresa?:Empresa[];
}
