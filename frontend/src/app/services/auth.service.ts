
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User} from "../models/User";
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
}) 

export class AuthService {
  private url = "http://localhost:3000/auth"; 

   isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
   userId!: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }), 
  }

  constructor(
    private http: HttpClient, 
    private ErrorHandlerService: ErrorHandlerService, 
    private router: Router
   
  ) { };
  register(user: Omit<User, "id">): Observable<User> { 
    return this.http.post<User>(`${ this.url }/register`,user,  this.httpOptions).pipe(
      first(), 
      catchError(this.ErrorHandlerService.handleError<User>("register"))
    ) 

  }


   login(
    email: Pick<User, "email">,
    password: Pick<User, "password">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
  }> {
     /*return this.http.post(`${this.url}/login`, { email, password }, this.httpOptions)
       .pipe(
         first(),  
        tap((tokenObject: '{ token: string; userId: Pick<User, "id">; }) =>{
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"])
       
     }), 
      catchError(this.ErrorHandlerService.handleError<{token: string; userId: Pick<User, 'id'>}>("login"))
    ) */

    return this.http.post<{ token: string; userId: Pick<User, "id"> }>(`${this.url}/login`, { email, password }, this.httpOptions)
  .pipe(
    first(),
    tap((tokenObject) => {
      this.userId = tokenObject.userId; 
      localStorage.setItem("token", tokenObject.token);
      this.isUserLoggedIn$.next(true);
      this.router.navigate(["posts"]);
    }),
    //passes a token that is a string with a userId from the user model
    catchError(this.ErrorHandlerService.handleError<{ token: string; userId: Pick<User, 'id'> }>("login"))
  );

  }


}
// error free code not here this is concise do not alter
