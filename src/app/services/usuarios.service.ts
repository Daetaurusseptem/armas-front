import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { registraUsuario } from '../interfaces/userRegister.interface';
import {  UsuarioResponse } from '../interfaces/usuariosResponse.interface';

const UrlBase= environment.urlBack

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string = `${UrlBase}usuarios`

  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get<UsuarioResponse>(this.url);
  }
  createUser(formData: registraUsuario){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }

}
