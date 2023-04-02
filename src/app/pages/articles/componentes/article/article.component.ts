import { ChangeDetectorRef, Component } from '@angular/core';
import { Article } from '../../models/article.model';
import { User } from 'src/app/shared/models';
import { Comment } from '../../models/comment.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  article:Article;
  currentUser:User;
  canModify:boolean;
  comments:Comment[];
  commentsControl = new FormControl();
  commentFormErrors ={};
  isSubmitting = false;
  isDeleting = false;


  constructor(
    private route: ActivatedRoute,
    private articlesService:ArticlesService,
    private commentsService:CommentsService,
     private router: Router,
    private userService: AuthService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: any) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
        this.cd.markForCheck();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
        this.cd.markForCheck();
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  trackByFn(index:any, item:any) {
    return index;
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
        this.cd.markForCheck();
      });
  }

  addComment(){
    this.isSubmitting = true;
    this.commentFormErrors = {};


    const comentBody = this.commentsControl.value;
    this.commentsService.add(this.article.slug, comentBody)
    .subscribe(
      comment => {
        this.comments.unshift(comment);
        this.commentsControl.reset('');
        this.isSubmitting = false;
        this.cd.markForCheck();
      },
      errors =>{
        this.isSubmitting = false;
        this.commentFormErrors = errors;
        this.cd.markForCheck();
      }
    )
  }

  onDeleteComment(comment:any) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
          this.cd.markForCheck();
        }
      );
  }
}
