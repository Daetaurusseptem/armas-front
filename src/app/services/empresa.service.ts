import { updateEmpresa } from './../interfaces/updateEmpresa.interface';
import { RegistrarEmpresa } from './../interfaces/empresaRegister.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url:string = `${UrlBase}empresas`

  constructor(private http:HttpClient) { }

  getEmpresas(){
    return this.http.get<ArrayResponse>(this.url);
  }
  getEmpresa(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`);
  }
  createEmpresa(formData: RegistrarEmpresa){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateEmpresa(idArea:string, formData:updateEmpresa ){
    console.log(formData);
    return this.http.put(`${this.url}/${idArea}`, formData);
  }
}
