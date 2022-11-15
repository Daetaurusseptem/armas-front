import { Empleado } from './empleado.interface';
import { Departamento } from './departamento.interface';
import { Area } from './area.interface';
import { Empresa } from './empresa.interface';
import { Usuario } from './usuario.interface';
import { TipoExpediente } from './tipo_expediente.interface';
export interface itemResponse {
  ok:boolean,
  empresa?:Empresa,
  area?:Area,
  usuario?:Usuario,
  departamento?:Departamento
  empleado?:Empleado;
  tipoExpediente:TipoExpediente
}
