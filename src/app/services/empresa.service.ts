import { updateEmpresa } from './../interfaces/updateEmpresa.interface';
import { RegistrarEmpresa } from './../interfaces/empresaRegister.interface';
import { EmpresaResponse } from './../interfaces/empresaResponse.interface';
import { EmpresasResponse } from './../interfaces/empresasResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const UrlBase = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url:string = `${UrlBase}empresas`

  constructor(private http:HttpClient) { }

  getEmpresas(){
    return this.http.get<EmpresasResponse>(this.url);
  }
  getEmpresa(id:string){
    return this.http.get<EmpresaResponse>(`${this.url}/${id}`);
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

    return this.http.put(`${this.url}/${idArea}`, formData);
  }
}
