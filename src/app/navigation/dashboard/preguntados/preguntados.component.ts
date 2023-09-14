import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from 'src/app/services/preguntados.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit{
  
  characterImg: any;
  characterName: any;
  characterHouse: any;
  /*characters: string[] = ["Severus Snape","Ginny Weasley","Dolores Umbridge","Sirius Black","Cho Chang","Harry Potter","Horace Slughorn","Rubeus Hagrid","Remus Lupin","Cedric Diggory","Arthur Weasley","Lucius Malfoy","Lord Voldemort","Bellatrix Lestrange","Ron Weasley","Minerva McGonagall","Neville Longbottom","Hermione Granger","Draco Malfoy","Luna Lovegood"];*/
  points: number = 0;
  

  constructor(private toastr: ToastrService, private service: PreguntadosService, public auth: AuthService) { }

  ngOnInit(): void {
    this.getQuestionCharacter();
  }

  getQuestionCharacter() {
    return new Promise((resolve, reject) => {
      this.service.getRandomCharacter().subscribe((data: any) => {
        let random = Math.floor(Math.random() * 17);
        this.characterImg = data[random].image;
        this.characterName = data[random].name;
        this.characterHouse = data[random].house;
        console.log(this.characterName, this.characterHouse, this.characterImg);
        resolve(data);
      });
    });
  }

  checkAnswer(answer: string) {
    if (answer === this.characterHouse) {
      this.toastr.success('Correcto!', '' , {
                            timeOut: 3000,
                            positionClass: 'toast-center-center',      
                          });
      this.points ++;
    } else {
      this.auth.SetScore("preguntados",this.points);
      this.toastr.warning('Puntaje: ' + this.points, 
                          'Incorrecto!' + ' ' + 'La respuesta correcta es:' + ' ' + this.characterHouse, {
                          timeOut: 3000,
                          positionClass: 'toast-center-center',      
                        });
      
      this.points = 0;
    }
    this.getQuestionCharacter();                          
  }

}
