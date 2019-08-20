import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../models/registros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyregisterService {

  API_URI = 'http://mysql.cruzrojabogota.org.co/api';

  constructor(private http: HttpClient) { }
  
  getRegistros() {
    return this.http.get(`${this.API_URI}/registros`);
  }
  
  getRegistrosFil(fecha:string) {
    return this.http.get(`${this.API_URI}/registros/${fecha}`);
  }
  
  getRegistro(id: string) {
    return this.http.get(`${this.API_URI}/registros/${id}`);
  }

  deleteRegistros(id: string) {
    return this.http.delete(`${this.API_URI}/registros/${id}`);
  }

  saveRegistros(registro: Registro) {
    return this.http.post(`${this.API_URI}/registros`, registro);
  }

  updateRegistros(id: string|number, updatedGame: Registro): Observable<Registro> {
    return this.http.put(`${this.API_URI}/registros/${id}`, updatedGame);
  }

}


