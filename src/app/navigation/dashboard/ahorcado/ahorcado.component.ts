import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  word = '';
  hiddenWord = '';
  tries = 0;
  win = false;
  lost = false;
  ahorcado = "assets/ahorcado/ahorcadoinicial.jpg";
  letterButton:boolean = false;
  data:any;
  points:number = 0;

  constructor( private service: AhorcadoService) { }

  ngOnInit(): void {
    this.storeWord();
  }
  
  storeWord() {
    this.service.getRandomWord().subscribe((data) => {
      this.data = data;
      this.word = data.toString().toUpperCase();
      this.hiddenWord = '_ '.repeat(this.word.length);
      console.log(this.word);
    });    
  }

  actionMethod(event: any) {
    event.target.disabled = true;
  }

  chosenOption(option: string) {
   
    if (this.word.indexOf(option) === -1) {
      this.tries++;
    }

    const hiddenWordArray = this.hiddenWord.split(' ');

    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === option) {
        hiddenWordArray[i] = option;
      }
    }

    this.hiddenWord = hiddenWordArray.join(' ');
    this.checkGame();  
  }

  checkGame() {

    const wordArray = this.hiddenWord.split(' ');
    const wordCheck = wordArray.join('');

    if (wordCheck === this.word) {
      this.letterButton = true;
      this.win = true;
    }

    if (this.tries >= 6) {
      this.letterButton = true;
      this.lost = true;
      this.ahorcado = "assets/ahorcado/ahorcadofinal.jpg";
    }
  }

}
