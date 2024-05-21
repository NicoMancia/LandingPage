import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private httpClient: HttpClient) {}
  //Observable --> perché dobbiamo far comunicare il frontend con il backend
  create(data: any): Observable<any> {
    return this.httpClient.post(`${environment.endpointBE}lead`, data);
  }

  findAll(): Observable<any> {
    return this.httpClient.get(`${environment.endpointBE}lead`);
  }

  findOne(id: number): Observable<any> {
    return this.httpClient.get(`${environment.endpointBE}lead/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.endpointBE}lead/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.endpointBE}lead/${id}`);
  }
}
