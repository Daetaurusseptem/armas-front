
import { updateDatosArea } from './../interfaces/updateDatosArea.interface';

import { registraUsuario } from './../interfaces/userRegister.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { registraArea } from '../interfaces/areaRegister.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  url:string = `${UrlBase}areas`

  constructor(private http:HttpClient) { }

  getAreas(){
    return this.http.get<ArrayResponse>(this.url, this.headers);
  }
  getAreasEmpresa(empresaId:string){
    return this.http.get<ArrayResponse>(`${this.url}/empresa/${empresaId}`, this.headers);
  }
  getArea(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`, this.headers);
  }
  createArea(formData: registraArea){
    return this.http.post(this.url, formData, this.headers)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateArea(idArea:string, formData: updateDatosArea){
    console.log(idArea);
    return this.http.put(`${this.url}/${idArea}`, formData, this.headers);
  }
  eliminarArea(idArea:string){
    return this.http.delete(`${this.url}/${idArea}`, this.headers);
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
