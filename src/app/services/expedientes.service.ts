import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UsuariosService } from './usuarios.service';
import { ExpedienteCreacionResponse } from '../interfaces/expedienteUploadResponse.interface';
import { TipoExpediente } from '../interfaces/tipo_expediente.interface';
import { binaryResponse } from '../interfaces/binaryResponse.interface';
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
    return this.http.get<ArrayResponse>(`${this.url}/${empresaId}/${areaId}/${empleadoId}`);
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
        formData);
      }
  eliminarExpediente(idExpediente:string){
    return this.http.delete<binaryResponse>(`${this.url}/${idExpediente}`)
  }

  getTipoExpedientesArea(empresaId:string, areaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/tipos/todo/${empresaId}/${areaId}`);
  }
  getTipoObligatorioExpedientesArea(empresaId:string, areaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/tipos/todo/obligatorio/${empresaId}/${areaId}`);
  }

  crearTipoExpediente(empresaId:string,areaId:string, formdata:{tipo?:string, descripcion?:string, obligatorio?:boolean, areaId?:string, actualizo?:string }){
    formdata.actualizo = this.usuarioService.usuario.nombre.slice(0,8)
    console.log(formdata);
    return this.http.post(`${this.url}/tipos/todo/crear-tipo/${empresaId}/${areaId}`,formdata )

  }


}
