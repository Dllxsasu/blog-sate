import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { Article } from '../models/article.model';
import { ArticleListConfig } from '../models/article-list-config.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private crudService:CrudServiceService
  ) { }
query( config:ArticleListConfig): Observable<{articles: Article[], articlesCount: number}>{
  const params:any = {};

  Object.entries(config.filters).forEach( ([key, value], index)=>{
   // config.filters[key];
   params[key]=value;
    // config.filters[key as keyof config.filters];
  });
 
  return this.crudService
  .get(
    '/articles' + ((config.type === 'feed') ? '/feed' : ''),
    new HttpParams({ fromObject: params })
  );
}
    get(slug:any):Observable<Article> {
    return this.crudService.get("/articles/" + slug)
    .pipe(map(data => data.article));
  }

  destroy(slug:any) {
    return this.crudService.delete('/articles/' + slug);
  }

  save(article:Article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.crudService.put('/articles/' + article.slug, {article: article})
        .pipe(map(data => data.article));

    // Otherwise, create a new article
    } else {
      return this.crudService.post('/articles/', {article: article})
        .pipe(map(data => data.article));
    }
  }

  favorite(slug:any): Observable<Article> {
    return this.crudService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug:any): Observable<Article> {
    return this.crudService.delete('/articles/' + slug + '/favorite');
  }
}
