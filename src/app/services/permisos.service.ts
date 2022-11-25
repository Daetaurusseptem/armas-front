import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const UrlBase = environment.urlBack

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  @Injectable({
    providedIn: 'root'
  })


    url:string = `${UrlBase}permisos`

    constructor(private http:HttpClient) { }


    updateUser(idArea:string, idUsuario:string, tipo:string){

      return this.http.post(`${this.url}/${idUsuario}/${idArea}/${tipo}`,{});
    }


    get headers(): object{
      return {
        headers: {
          'x-token': this.token
        }
      };
    }
    get token(): string{
      return localStorage.getItem('token') || '';
    }

}
