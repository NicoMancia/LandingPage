import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private httpClient: HttpClient) { }
  //Observable --> perché dobbiamo far comunicare il frontend con il backend
  create(data: any): Observable<any>{
    return this.httpClient.post('http://localhost:3000/lead', data);
  }

  findAll(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/lead');
  }

  findOne(id: number): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/lead/${id}`);
  }

  update(id: number,data: any): Observable<any>{
    return this.httpClient.patch(`http://localhost:3000/lead/${id}`, data);
  }

  remove(id: number): Observable<any>{
    return this.httpClient.delete(`http://localhost:3000/lead/${id}`);
  }
}
