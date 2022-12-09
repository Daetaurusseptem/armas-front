import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.urlBack
const urlFs = environment.urlFileServer
@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(
    private http:HttpClient
  ) { }

  actualizarFoto(
    archivo: File,
    empresaId: string,
    empleadoId: string,
    empNum: string

  ) {


      console.log(empleadoId);
      const url = `${ base_url }uploads/img/${empresaId}/${empleadoId}/${empNum}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      return this.http.put(url, formData, this.headers)

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
