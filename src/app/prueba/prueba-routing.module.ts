import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { A1Component } from './componentes/a1/a1.component';

const routes: Routes = [
  {
    path:'',
    component: A1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule { }
