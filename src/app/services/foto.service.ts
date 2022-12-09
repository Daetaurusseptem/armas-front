import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.urlBack
@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    empresaId: string,
    empleadoId: string,
    empNum: string

  ) {

    try {
      console.log(empleadoId);
      const url = `${ base_url }uploads/img/${empresaId}/${empleadoId}/${empNum}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data);

      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
