import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models';
import { distinctUntilChanged } from 'rxjs/operators';
import {map} from 'rxjs';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor (
    private crudService: CrudServiceService,
  ) {}


  setAuth(user: User) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  attemptAuth(type:any, credentials:any): Observable<User> {
    let route = (type === 'login') ? '/login' : '';
    return this.crudService.post('/users' + route, {user: credentials}).pipe(
    map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    ))
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  
}
