import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoImg'
})
export class FormatoImgPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const nombreCortado = value.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    return extensionArchivo;
  }

}
