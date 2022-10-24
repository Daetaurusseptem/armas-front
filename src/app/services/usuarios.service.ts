import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ArrayResponse } from '../interfaces/arrayResponse.interface';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { updateDatosUsuario } from '../interfaces/updateDatosUsuario.interface';
import { registraUsuario } from '../interfaces/userRegister.interface';



const UrlBase= environment.urlBack

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string = `${UrlBase}usuarios`

  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get<ArrayResponse>(this.url);
  }
  getUsuario(id:string){
    return this.http.get<itemResponse>(`${this.url}/${id}`);
  }
  createUser(formData: registraUsuario){
    return this.http.post(this.url, formData)
    // .pipe(
    //   tap( (resp: any) => {
    //     this.guardarLocalStorage(resp.token, resp.menu)
    //   })
    // );
  }
  updateUser(idUsuario:string, formData: updateDatosUsuario){

    return this.http.put(`${this.url}/${idUsuario}`, formData);
  }

}
