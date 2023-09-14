import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {

  constructor(private http: HttpClient) { }

  getRandomCard() { 
    return this.http.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1");
  }   
}
