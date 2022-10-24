import { AreasResponse } from './../interfaces/areasResponse.interface';
import { updateDatosArea } from './../interfaces/updateDatosArea.interface';
import { updateDatosUsuario } from './../interfaces/updateDatosUsuario.interface';
import { registraUsuario } from './../interfaces/userRegister.interface';
import { AreaResponse } from './../interfaces/areaResponse.interface';
import { UsuariosResponse } from './../interfaces/usuariosResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  url:string = `${UrlBase}areas`

  constructor(private http:HttpClient) { }

  getAreas(){
    return this.http.get<AreasResponse>(this.url);
  }
  getArea(id:string){
    return this.http.get<AreaResponse>(`${this.url}/${id}`);
  }
  creatArea(formData: registraUsuario){
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
