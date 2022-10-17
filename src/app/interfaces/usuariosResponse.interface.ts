import { Usuario } from "./usuario.interface";

export interface UsuarioResponse {
  ok: boolean;
  usuarios: Usuario[];
}
