import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from '../models/Usuario.model';

import {map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { EmpleadoRegistrar } from '../interfaces/empleadoRegister.interfacce';
import { updateDatosUsuario } from '../interfaces/updateDatosUsuario.interface';
import { Busqueda } from '../interfaces/Busqueda.interface';

const urlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  public usuario!:UsuarioModel;
  url:string = `${urlBase}empleados`

  constructor(private http:HttpClient) { }


  existeEmpleadoEmpresa(idEmpresa:string, idEmpleado:string){
    return this.http.get<itemResponse>(`${this.url}/comprobar/empresa/${idEmpresa}/${idEmpleado}`);

  }
  getEmpleadosDepartamentoId(id:string){
    return this.http.get<ArrayResponse>(`${this.url}/${id}`);
  }
  getEmpleados(){
    return this.http.get<ArrayResponse>(`${this.url}`);
  }
  getEmpleado(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`);
  }
  createEmpleado(formData: EmpleadoRegistrar){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  buscarEmpleadoDepartamento(idDepartamento:string,termino:string){
    return this.http.get<Busqueda>(`${urlBase}/busqueda/${idDepartamento}/${termino}`, this.headers)
  }

  updateUser(idUsuario:string, formData: updateDatosUsuario){

    return this.http.put(`${this.url}/${idUsuario}`, formData);
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
    console.log(a);
    localStorage.setItem('token', token );
    localStorage.setItem('menu', a );
}
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}

}
