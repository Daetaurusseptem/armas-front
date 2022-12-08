import { ArrayResponse } from './../interfaces/arrayResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { registraArea } from '../interfaces/areaRegister.interface';
import { updateDatosArea } from '../interfaces/updateDatosArea.interface';
import { binaryResponse } from '../interfaces/binaryResponse.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url:string = `${UrlBase}departamentos`

  constructor(private http:HttpClient) { }

  getDepartamentos(){

    return this.http.get<ArrayResponse>(this.url, this.headers);
  }
  deleteDepartamento(id:string){

    return this.http.delete<binaryResponse>(`${this.url}/${id}`, this.headers);
  }
  getDepartamentosEmpresa(idEmpresa:string){
    return this.http.get<ArrayResponse>(`${this.url}/empresa/${idEmpresa}`,this.headers);
  }
  getDepartamento(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`, this.headers);
  }
  createDepartamento(formData: registraArea){
    return this.http.post(this.url, formData, this.headers)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateDepartamento(idDepartamento:string, formData: updateDatosArea){

    return this.http.put(`${this.url}/${idDepartamento}`, formData, this.headers);
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
