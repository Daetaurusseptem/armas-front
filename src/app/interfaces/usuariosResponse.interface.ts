import { Usuario } from "./usuario.interface";

export interface UsuariosResponse {
  ok: boolean;
  usuarios: Usuario[];
}
