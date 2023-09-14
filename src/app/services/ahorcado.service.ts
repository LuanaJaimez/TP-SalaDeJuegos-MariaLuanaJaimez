import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  
  constructor(private http: HttpClient) { }

  getRandomWord() { 
    return this.http.get("https://clientes.api.greenborn.com.ar/public-random-word");
  }   
}
