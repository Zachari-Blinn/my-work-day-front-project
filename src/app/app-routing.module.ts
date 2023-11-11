import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { CreateTrainingFormPageComponent } from './pages/form/create-training-form-page/create-training-form-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-training', component: CreateTrainingFormPageComponent }
  // { path: 'series-exercise-form', component: SeriesExerciseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
