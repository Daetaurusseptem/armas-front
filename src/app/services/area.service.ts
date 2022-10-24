
import { updateDatosArea } from './../interfaces/updateDatosArea.interface';

import { registraUsuario } from './../interfaces/userRegister.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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
    return this.http.get<ArrayResponse>(this.url);
  }
  getArea(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`);
  }
  createArea(formData: registraArea){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateArea(idArea:string, formData: updateDatosArea){

    return this.http.put(`${this.url}/${idArea}`, formData);
  }
}
