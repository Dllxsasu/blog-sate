import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaModule } from '../app/prueba/prueba.module';

const routes: Routes = [
  {
    path:'prueba',
   // loadChildren: @import("../app/prueba/prueba.module").then( module => module.PruebaModule)
    
    loadChildren:()=> import('./prueba/prueba.module').then(module => module.PruebaModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
