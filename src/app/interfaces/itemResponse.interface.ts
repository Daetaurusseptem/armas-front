import { Departamento } from './departamento.interface';
import { Area } from './area.interface';
import { Empresa } from './empresa.interface';
import { Usuario } from './usuario.interface';
export interface itemResponse {
  ok:true,
  empresa?:Empresa,
  area?:Area,
  usuario?:Usuario,
  departamento?:Departamento
  empleados?:Departamento
}
