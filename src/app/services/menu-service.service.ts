import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu: any[]=[]

  constructor(){
    this.cargarMenu()
  }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!)
    //||[
    //   {
    //     id:'admin',
    //     title:'Administrador',
    //     icon:'bi bi-cone-striped',
    //     descripcion:'Administre los usuarios registrados',
    //     submenu:[
    //       {title:'Usuarios', url:'usuarios'},
    //       {title:'Empresas', url:'empresas'},
    //       {title:'Departamentos', url:'departamentos'},
    //       {title:'Areas', url:'areas'},
    //       {title:'expedientes', url:'expedientes'}
    //     ]
    //   },
    //   {
    //     id:'usuario',
    //     title:'Usuario',
    //     icon:'fas fa-fw fa-cog',
    //     descripcion:'Herramientas de administracion para maestro',
    //     submenu:[
    //       {title:'materias', url:'materias-maestros'}
    //     ]
    //   }
    // ];
    console.log(this.menu);
  }

}
