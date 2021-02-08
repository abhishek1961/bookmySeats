import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookSeatsComponent } from './components/book-seats/book-seats.component';
import { MainComponent } from './components/main/main.component';
import { SeatsViewComponent } from './components/seats-view/seats-view.component';

const routes: Routes = [
  {path:'home',component:MainComponent},
  {path:'seats-view/:rqSeats',component:SeatsViewComponent},
  {path:'book-seats',component:BookSeatsComponent},
  {path:'**',component:MainComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
