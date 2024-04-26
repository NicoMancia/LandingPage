import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  constructor(private httpClient: HttpClient) { }
  //Observable --> perché dobbiamo far comunicare il frontend con il backend
  sendForm(data: any): Observable<any>{
    return this.httpClient.post('https://test-api.mcsmart.it/web/index.php?r=serviziobollette/mc-marketing/create-lead', data);
  }
}
