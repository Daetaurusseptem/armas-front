import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
usuario:UsuarioModel
  constructor(
    private usuarioService:UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.usuario
  }

}
