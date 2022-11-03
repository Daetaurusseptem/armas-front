import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuService } from 'src/app/services/menu-service.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  menuItems: any[]=[];
  usuario:UsuarioModel;
  constructor(
    private menuService:MenuService,
    private usuarioService:UsuariosService,
    private router:Router
    ) {
      this.usuario = this.usuarioService.usuario
    }

    ngOnInit(): void {
      this.menuItems = this.menuService.menu
  }

  logOut(){
    this.usuarioService.borrarLocalStorage();
    this.router.navigateByUrl('login')
  }

}
