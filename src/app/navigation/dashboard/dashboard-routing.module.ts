import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [
  { path: '',component: DashboardComponent,children: [
    { path: '', pathMatch: 'full',component: HomeComponent },
    { path: 'ahorcado' , pathMatch: 'full',component: AhorcadoComponent },
    { path: 'mayoromenor' , pathMatch: 'full',component: MayorMenorComponent },
    { path: 'preguntados' , pathMatch: 'full',component: PreguntadosComponent},
  ] },
  { path: 'quienSoy' , pathMatch: 'full',component: QuienSoyComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}