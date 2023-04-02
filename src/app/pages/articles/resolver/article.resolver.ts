import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
    constructor(
      private articleService:ArticlesService,
      private router:Router,
      private authService:AuthService
    ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleService.get(route.params['slug'])
    .pipe(catchError((err) => this.router.navigateByUrl('/')));
/*
    this.articleService.get(route.params['slug'])
    .pipe(catchError( (err) => this.router.navigateByUrl('/')));
    this.articleService.get(route.params['slug'])
    .pipe(catchError( (err) => this.router.navigateByUrl('/')));
    this.articleService.get(route.params['slug'])
    .pipe(catchError( (err) => this.router.navigateByUrl('/')));
   //return of(true);
  */
  }
}
