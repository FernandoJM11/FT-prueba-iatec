import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseAPIClass } from '../class/baseAPI.class';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends BaseAPIClass {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = `${environment.apiUrl}/categorias`; 
  }

}