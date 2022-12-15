import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuariosService } from './usuarios.service';
import { ExpedienteCreacionResponse } from '../interfaces/expedienteUploadResponse.interface';
import { TipoExpediente } from '../interfaces/tipo_expediente.interface';
import { binaryResponse } from '../interfaces/binaryResponse.interface';
import { updateEmpresa } from '../interfaces/updateEmpresa.interface';
import { updateTipoExpediente } from '../interfaces/updateTipoExpediente.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  url:string = `${UrlBase}expedientes`
  urlFS:string = `${UrlBase}uploads`

  constructor(
              private http:HttpClient,
              private usuarioService:UsuariosService
              ) { }

  getExpedienteEmpleado(empresaId:string,areaId:string, empleadoId:string){
    return this.http.get<ArrayResponse>(`${this.url}/${empresaId}/${areaId}/${empleadoId}`,  this.headers);
  }
  getTipoExpediente(idTipoExpediente:string){
    return this.http.get<itemResponse>(`${this.url}/tipos/${idTipoExpediente}`, this.headers);
  }

  subirExpediente(

    idEmpresa: string,
    idArea: string,
    idEmpleado: string,
    idDepartamento:string,
    archivo:File,
    nota:string,
    tipo_expediente:string


  ) {


      const actualizo=this.usuarioService.usuario.nombre
      const formData = new FormData()
      formData.append('actualizo', actualizo)
      formData.append('archivo', archivo)
      formData.append('nota', nota)
      formData.append('tipo_expediente', tipo_expediente)
      const url = `${ this.urlFS }/${ idEmpresa }/${ idArea }/${idDepartamento}/${ idEmpleado }`;






      return this.http.post<ExpedienteCreacionResponse>(
        url,
        formData,  this.headers);
      }
  eliminarExpediente(idExpediente:string){
    return this.http.delete<binaryResponse>(`${this.url}/${idExpediente}`,  this.headers)
  }
  eliminarTipoExpediente(idTipoExpediente:string){
    return this.http.delete<binaryResponse>(`${this.url}/tipo/${idTipoExpediente}`,  this.headers)
  }

  getTipoExpedientesArea(empresaId:string, areaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/tipos/todo/${empresaId}/${areaId}`,  this.headers);
  }
  getTipoObligatorioExpedientesArea(empresaId:string, areaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/tipos/todo/obligatorio/${empresaId}/${areaId}`,  this.headers);
  }

  crearTipoExpediente(empresaId:string,areaId:string, formdata:{tipo?:string, descripcion?:string, obligatorio?:boolean, areaId?:string, actualizo?:string }){
    formdata.actualizo = this.usuarioService.usuario.nombre.slice(0,8)
    console.log(formdata);
    return this.http.post(`${this.url}/tipos/todo/crear-tipo/${empresaId}/${areaId}`,formdata,  this.headers )

  }

  updateTipoExpediente(idTipoExpediente:string, formData: updateTipoExpediente ){

    return this.http.put(`${this.url}/tipo/${idTipoExpediente}`, formData, this.headers);
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
