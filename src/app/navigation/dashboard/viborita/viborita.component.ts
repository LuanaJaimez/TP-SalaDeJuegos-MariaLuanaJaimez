import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Comida } from "./components/comida";
import { Serpiente } from "./components/serpiente";
import { outsideGrid } from "./components/tablero";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viborita',
  templateUrl: './viborita.component.html',
  styleUrls: ['./viborita.component.css']
})
export class ViboritaComponent implements OnInit, AfterViewInit{

  title = 'snake';
  gameBoard: any;
  snake = new Serpiente();
  food = new Comida(this.snake);
  

  lastRenderTime = 0
  gameOver = false

  constructor(private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));
  }

  ngOnInit(): void {
    this.snake.listenToInputs();
  }
  dpadMovement(direction: string) {
    this.snake.input.setDirection(direction);
  }

  start(currentTime: any) {
    if (this.gameOver) {
      return console.log('Perdiste');
    }

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 4) {
      return;
    }
    this.lastRenderTime = currentTime;

    this.update();
    this.draw();
  }

  update() {
    this.snake.update();
    this.food.update();
    this.checkDeath();
  }

  draw() {
    this.gameBoard.innerHTML = '';
    this.snake.draw(this.gameBoard);
    this.food.draw(this.gameBoard);
  }

  checkDeath() {
    this.gameOver = outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();
    if (!this.gameOver) {
      return;
    }
    this.gameBoard.classList.add('blur');
  }

  restart() {
    window.location.reload();
  }  
}
