import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { updateDatosUsuario } from '../interfaces/updateDatosUsuario.interface';
import { registraUsuario } from '../interfaces/userRegister.interface';

import {map, catchError} from 'rxjs/operators';
import { UsuarioModel } from '../models/Usuario.model';
import { binaryResponse } from '../interfaces/binaryResponse.interface';
import { permisosUser } from '../interfaces/permisoUser.interface';





const urlBase= environment.urlBack

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public idUsuario:string
  public usuario!:UsuarioModel;
  url:string = `${urlBase}usuarios`

  constructor(private http:HttpClient) { }

  login(formData:{usuario?:string,password?:string}){
    return this.http.post(`${urlBase}auth`, formData)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      })
    );
  }
  validarToken(): Observable<boolean> {
    console.log(this.headers);
    return this.http.get(`${ urlBase }auth/renew`, this.headers)
    .pipe(
      map( (resp: any) => {
        this.idUsuario = resp.id

        const {nombre, usuario, img= '', role, Areas, id} = resp.usuario;
        console.log(resp.usuario);
        this.usuario = new UsuarioModel(id, usuario, nombre, role,'', img, Areas);

        this.guardarLocalStorage(resp.token, resp.menu)
        return true;
      }),
      catchError( error => of(false) )
    );

  }

  getUsuarios(){
    return this.http.get<ArrayResponse>(this.url, this.headers);
  }
  getUsuario(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`, this.headers);
  }
  getUsuarioTipoPermiso(idUsuario:string, idArea:string){
    return this.http.get<permisosUser>(`${this.url}/permiso/${idArea}/${idUsuario}`, this.headers);
  }
  createUser(formData: registraUsuario){
    return this.http.post<binaryResponse>(this.url, formData, this.headers)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateUser(idUsuario:string, formData: updateDatosUsuario){

    return this.http.put(`${this.url}/${idUsuario}`, formData, this.headers);
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
   get role(){
     return this.usuario.role
   }

   get id(): string{
     return this.usuario.id || '';
   }
  guardarLocalStorage(token:string, menu:any){
    var a = JSON.stringify(menu)
    localStorage.setItem('token', token );
    localStorage.setItem('menu', a );
}
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}

}
