import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  

  baseUrl: string= "http://localhost:3000/employees";
  baseUrl1: string= "http://localhost:3000/employees/3";
  deleteUrl: string= "http://localhost:3000/employees/88";

  constructor(private httpClient : HttpClient) { }

  public registerUsers(obj){
    return this.httpClient.post(this.baseUrl,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }

  public getUsers(Name){
    return this.httpClient.get(this.baseUrl1,Name).pipe(map(data=>
      data));

  }

    public deleteUsers(){
      return this.httpClient.delete(this.deleteUrl); 
      }

      


}
