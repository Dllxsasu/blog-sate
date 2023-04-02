import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { Profile } from 'src/app/shared/models';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor (
    private crudService: CrudServiceService
  ) {}

  get(username: string): Observable<Profile> {
    return this.crudService.get('/profiles/' + username)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.crudService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.crudService.delete('/profiles/' + username + '/follow');
  }
}
