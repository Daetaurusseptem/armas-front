import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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

}
