import { updateEmpresa } from './../interfaces/updateEmpresa.interface';
import { RegistrarEmpresa } from './../interfaces/empresaRegister.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { binaryResponse } from '../interfaces/binaryResponse.interface';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url:string = `${UrlBase}empresas`

  constructor(private http:HttpClient) { }

  getEmpresas(){
    return this.http.get<ArrayResponse>(this.url, this.headers);
  }
  deleteEmpresa(id:string){
    return this.http.delete<binaryResponse>(`${this.url}/${id}`, this.headers);
  }
  getEmpresa(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`, this.headers);
  }
  createEmpresa(formData: RegistrarEmpresa){
    return this.http.post(this.url, formData, this.headers  )
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateEmpresa(idArea:string, formData:updateEmpresa ){
    console.log(formData);
    return this.http.put(`${this.url}/${idArea}`, formData, this.headers);
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
