import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/pages/articles/services/articles.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Article } from '../../models';
import { concatMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
 constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.authService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          return this.articlesService.favorite(this.article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          return this.articlesService.unfavorite(this.article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
