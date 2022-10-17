import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService:UsuariosService) {
    this.cargarUsuarios();


  }

  ngOnInit(): void {

  }

  cargarUsuarios(){
    this.usuarioService.getUsuarios()
    .pipe(
      map(item=>{
        return item.usuarios
      })
    )
    .subscribe(
      r=>{
        this.usuarios = r
        console.log(this.usuarios);
      }
    )
  }

}
