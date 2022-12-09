import { Component, OnInit } from '@angular/core';
import { FotoService } from 'src/app/services/foto.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fotoService: FotoService  ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {

    const empresaId   = this.modalImagenService.empresaId;
    const empleadoId = this.modalImagenService.empleadoId;
    const empNum = this.modalImagenService.empNum;

    this.fotoService
      .actualizarFoto( this.imagenSubir, empresaId, empleadoId, empNum )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
