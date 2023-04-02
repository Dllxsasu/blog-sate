import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
//import { HttpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {HttpClientModule} from '@angular/common/http'
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CrudServiceService } from './services/crud-service.service';
import { ErrorListComponent } from './componentes/error-list/error-list.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    
  ],
  declarations: [FooterComponent, HeaderComponent, ErrorListComponent, FavoriteButtonComponent, FollowButtonComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  FooterComponent,
  HeaderComponent,
  ErrorListComponent,
  FavoriteButtonComponent,
  FollowButtonComponent
  ]
})
export class SharedModule {}
