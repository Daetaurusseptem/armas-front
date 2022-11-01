import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { map } from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];

  constructor(
              private usuarioService:UsuariosService,
              private busquedaService:BusquedaService
              ) {
    this.cargarUsuarios();


  }

  ngOnInit(): void {

  }

  cargarUsuarios(){
    this.usuarioService.getUsuarios()
    .pipe(
      map(item=>{
        console.log(item);
        this.usuariosTemp = item.usuarios
        return item.usuarios
      })
    )
    .subscribe(
      r=>{
        this.usuarios = r
      }
    )
  }

  buscar(termino: string): any{

    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.usuarios = [...this.usuariosTemp];
      return;
    }

    this.busquedaService.buscar('usuarios', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.usuarios = resultados;
    });
  }
}
