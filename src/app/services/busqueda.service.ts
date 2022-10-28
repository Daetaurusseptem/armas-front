import { UsuarioModel } from './../models/Usuario.model';
import { Busqueda } from './../interfaces/Busqueda.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import {map} from 'rxjs/operators';

const baseUrl=environment.urlBack;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  constructor(private http: HttpClient) { }

  private transformToUsers(resultados: any[] ): UsuarioModel[] {
    console.log(resultados);
    return resultados.map(
      usuario => new UsuarioModel(
        usuario.id,
        usuario.usuario,
        usuario.nombre,
        usuario.role,
        usuario.password,
        usuario.img,
        usuario.Areas

        ));

  }

  buscar(

    tipo: 'usuarios' | 'empresas' | 'areas'|'departamentos',
    termino: string

    ): any {

      if (termino === ''){
        return;
      }

      return this.http.get<Busqueda[]>(`${baseUrl}busqueda/coleccion/${tipo}/${termino}`,
      // this.headers
      )
        .pipe(
         map((resp:any)=>{
          console.log(resp);
           switch (tipo) {
             case 'usuarios':
                return this.transformToUsers( resp.resultados );
             case 'empresas':
                return resp.resultados
              case 'areas':
                return resp.resultados
              case 'departamentos':
                return resp.resultados
             default:
               return[]
           }
         })
        );

    }

    buscarGeneral(termino:string){
      return this.http.get(`${baseUrl}/busqueda/${termino}`, this.headers)
    }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(): object{
    return {
      headers: {
      'x-token': this.token
      }
  };
  }
}
