
export class UsuarioModel {

  constructor(
      public id: string,
      public usuario: string,
      public nombre: string,
      public role: string,
      public password?: string,
      public img?: string,
      public Areas?:[{
        id: string;
        nombre: string;
        descripcion: string;
        actualizo: string;
        creadoEl: Date;
        actualizadoEl: Date;
        empresaId: string;
        Permisos?:{
          tipo: string;
          createdAt: Date;
          updatedAt: Date;
          areaId: string;
          usuarioId: string;
        };
      }],

  ) {}
}
