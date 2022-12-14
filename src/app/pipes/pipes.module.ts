import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoImgPipe } from './formato-img.pipe';



@NgModule({
  declarations: [FormatoImgPipe],
  exports:[FormatoImgPipe]
})
export class PipesModule { }
