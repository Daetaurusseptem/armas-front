import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  url:string = `${UrlBase}expedientes`

  constructor(private http:HttpClient) { }

  getExpedienteEmpleado(empresaId:string,areaId:string, empleadoId:string){
    return this.http.get<ArrayResponse>(`${this.url}/${empresaId}/${areaId}/${empleadoId}`);
  }


}
