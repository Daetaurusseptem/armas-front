import { Permisos } from "./permisos.interface";

export interface registraArea {
  id?: string;
  nombre?: string;
  descripcion?: string;
  actualizo?: string;
  creadoEl?: Date;
  actualizadoEl?: Date;
  empresaId?: string;
  Permisos?: Permisos;
}
