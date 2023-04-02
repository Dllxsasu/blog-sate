import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaModule } from '../app/prueba/prueba.module';

const routes: Routes = [
  {
    path:'prueba',
   // loadChildren: @import("../app/prueba/prueba.module").then( module => module.PruebaModule)
    loadChildren:()=> import('./prueba/prueba.module').then(module => module.PruebaModule) 
  },
  {
    path:'',
    loadChildren:()=> import('./pages/auth/auth.module').then(module => module.AuthModule) 
  }
  /*
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
