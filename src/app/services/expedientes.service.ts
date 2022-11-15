import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UsuariosService } from './usuarios.service';
import { ExpedienteCreacionResponse } from '../interfaces/expedienteUploadResponse.interface';
import { TipoExpediente } from '../interfaces/tipo_expediente.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  url:string = `${UrlBase}expedientes`
  urlFS:string = `${UrlBase}upload`

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
    formData:FormData


  ) {


      const actualizo=this.usuarioService.usuario.nombre
      formData.append('actualizo', actualizo)
      const url = `${ this.urlFS }/${ idEmpresa }/${ idArea }/${ idEmpleado }`;






      return this.http.post<ExpedienteCreacionResponse>(
        `${url}/${idEmpresa}/${idArea}/${idEmpleado}`,
        formData);
      }

  getTipoExpedientesArea(empresaId:string, areaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/tipos/todo/${empresaId}/${areaId}`);
  }


}
