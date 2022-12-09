import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.urlFileServer;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public empleadoId: string;
  public empNum: string;
  public empresaId: string;
  public img?: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      empleadoId:string,
      empNum:string,
      empresaId: string,
      img: string = 'no-img'
    ) {
    this._ocultarModal = false;
    this.empleadoId = empleadoId;
    this.empNum = empNum;
  	this.empresaId = empresaId
    this.img = img
    console.log(this.img);
        if(img!=''  || null){
          this.img = `${ base_url }fotos/${img}`;
        } else if(img == ''|| null){

          this.img = `${ base_url }/no-img.png`
        }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
