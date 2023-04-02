import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  
  constructor (
    private crudService: CrudServiceService
  ) {}

  add(slug:any, payload:any): Observable<Comment> {
    return this.crudService
    .post(
      `/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(map(data => data.comment));
  }

  getAll(slug:any): Observable<Comment[]> {
    return this.crudService.get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId:any, articleSlug:any) {
    return this.crudService
           .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }
 
}
