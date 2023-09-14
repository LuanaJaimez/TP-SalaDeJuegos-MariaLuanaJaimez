import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private image: string = "https://hp-api.onrender.com/api/characters";

  constructor(private http: HttpClient) { }

  getRandomCharacter() { 
    return this.http.get(this.image);
  }
}
