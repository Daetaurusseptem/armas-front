import { DownloadService } from './../../../services/download.service';
import { Area } from './../../../interfaces/area.interface';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from './../../../services/busqueda.service';
import { DepartamentoService } from './../../../services/departamento.service';
import { AreaService } from './../../../services/area.service';
import { EmpresaService } from './../../../services/empresa.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import {map} from 'rxjs/operators';
import { Expediente } from 'src/app/interfaces/empresa.interface copy';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-expediente-empleado',
  templateUrl: './expediente-empleado.component.html',
  styleUrls: ['./expediente-empleado.component.css']
})
export class ExpedienteEmpleadoComponent implements OnInit {


  areaId: string;
  empresaId: string;
  empleadoId: string;
  expedientes:Expediente[]=[]
  empleado:Empleado
  area:Area;

  constructor(

    private expedienteService:ExpedientesService,
    private empleadoService:EmpleadosService,
    private areaService:AreaService,
    private activatedRoute: ActivatedRoute,
    private downloadService:DownloadService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.empresaId = params['idEmpresa'];
      this.areaId = params['idArea'];
      this.empleadoId = params['idEmpleado'];
      this.obtenerEmpleado(this.empleadoId)
      this.obtenerExpedientes(this.empresaId, this.areaId, this.empleadoId)

    });
  }

  ngOnInit(): void {



  }


  obtenerExpedientes(idEmpresa:string, idArea:string, idEmpleado:string){
    this.expedienteService.getExpedienteEmpleado(idEmpresa, idArea, idEmpleado)
    .pipe(
      map(item=>{
        console.log(item);
        return item.expedientes
      })
    )
    .subscribe(expedientes=>{
      console.log(expedientes);
      this.expedientes=expedientes
    })
  }
  obtenerEmpleado(idEmpleado:string){
    this.empleadoService.getEmpleado(idEmpleado)
    .pipe(
      map(item=>{
        return item.empleado
      })
    )
      .subscribe(empleado=>{
        this.empleado=empleado
        console.log(empleado);
      })
  }
  obtenerArea(id: string) {
    this.areaService
      .getArea(id)
      .pipe(
        map((item) => {
          return item.area;
        })
      )
      .subscribe((area) => {
        this.area = area;
      });
  }

  download(filePath:string): void {
    console.log(filePath);
    this.downloadService
      .download(filePath)
      .subscribe(blob => {saveAs(blob, 'archivo')})
  }
}
