import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  menuItems: any[]=[];
  // usuario:Usuario;
  constructor(
    private menuService:MenuService
    ) {
      // this.usuario = usuarioService.usuario
    }

    ngOnInit(): void {
      this.menuItems = this.menuService.menu
      console.log(this.menuItems);
  }

}
