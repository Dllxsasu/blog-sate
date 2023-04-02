import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { User } from 'src/app/shared/models';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  canModify: boolean;
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser.subscribe(
      (userData:User) =>{
        this.canModify = (userData.username === this.comment.author.username);
        this.cd.markForCheck();
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
