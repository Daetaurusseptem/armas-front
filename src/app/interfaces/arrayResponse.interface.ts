import { Departamento } from './departamento.interface';
import { Area } from "./area.interface";
import { Empresa } from "./empresa.interface";
import { Usuario } from "./usuario.interface";

export interface ArrayResponse {
  ok: boolean;
  usuarios?: Usuario[];
  empresas?: Empresa[];
  areas?: Area[];
  departamento?: Departamento[];
}
