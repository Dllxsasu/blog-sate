import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleCommentComponent } from './componentes/article-comment/article-comment.component';
import { SharedModule } from 'src/app/shared';
import { ArticleComponent } from './componentes/article/article.component';
import { ArticleListComponent } from './helpers-comp/article-list/article-list.component';
import { ArticlePreviewComponent } from './helpers-comp/article-preview/article-preview.component';
import { ArticleMetaComponent } from './helpers-comp/article-meta/article-meta.component';


@NgModule({
  declarations: [
    ArticleCommentComponent,
    ArticleComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
