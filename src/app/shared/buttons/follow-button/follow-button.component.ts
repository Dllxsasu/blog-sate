import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../models';
import { concatMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent {
  constructor(
    private profilesService: ProfileService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap

    this.authService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          return this.profilesService.follow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfollow this profile
        } else {
          return this.profilesService.unfollow(this.profile.username)
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
