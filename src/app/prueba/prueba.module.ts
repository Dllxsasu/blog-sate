import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';
import { A1Component } from './componentes/a1/a1.component';


@NgModule({
  declarations: [
    A1Component
  ],
  imports: [
    CommonModule,
    PruebaRoutingModule
  ]
})
export class PruebaModule { }
