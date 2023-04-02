import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
