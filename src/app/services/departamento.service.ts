import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { registraArea } from '../interfaces/areaRegister.interface';
import { updateDatosArea } from '../interfaces/updateDatosArea.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url:string = `${UrlBase}departamentos`

  constructor(private http:HttpClient) { }

  getDepartamentos(){

    return this.http.get<ArrayResponse>(this.url);
  }
  getDepartamentosEmpresa(idEmpresa:string){
    return this.http.get<ArrayResponse>(`${this.url}/empresa/${idEmpresa}`);
  }
  getDepartamento(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`);
  }
  createDepartamento(formData: registraArea){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateDepartamento(idArea:string, formData: updateDatosArea){

    return this.http.put(`${this.url}/${idArea}`, formData);
  }
}
