import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesExerciseFormComponent } from './component/series-exercise-form/series-exercise-form.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'series-exercise-form', component: SeriesExerciseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
