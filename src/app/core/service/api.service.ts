import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Método para obtener datos
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }

  // Método para enviar datos
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }
}