import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http:HttpClient) { }
  
  
  post(path:string, body?:any | null, options?:any):Observable<any>{
    return this.http.post<any>(path,body,options).
    pipe(
      catchError( err=> {      
        return throwError(err);
      })
    )
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
    .
    pipe(
      catchError( err=> {      
        return throwError(err);
      })
    )
  }
  delete(path:String,body?:any):Observable<any>{
    return this.http.delete(`${environment.api_url}${path}`,body)
    .
    pipe(
      catchError( err=> {      
        return throwError(err);
      })
    );
  }


  put(path:string, body?:any):Observable<any> {
    return this.http.put(`${environment.api_url}${path}`,body).
    pipe(
      catchError( err=> {      
        return throwError(err);
      })
    );
  }
}
