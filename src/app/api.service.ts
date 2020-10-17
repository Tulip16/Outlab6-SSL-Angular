import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { det } from './det';
import { details } from './details';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  dataUrl= 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient, private message: MessageService) { 
   
    
  }
  getRequest(): Observable<details>{
      return this.http.get<details>('https://cs251-outlab-6.herokuapp.com/initial_values/');
  }
  addpost(items: any): Observable<any> {
    //console.log("gygjhyvlhjvlhcyutkgjc");
    return this.http.post<any>(this.dataUrl, items, this.httpOptions).pipe(catchError(this.handleError));
  }
  

  private handleError(err){
    return throwError(err);
  }
 
  
}
