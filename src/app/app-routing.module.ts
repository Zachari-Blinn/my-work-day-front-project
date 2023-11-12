import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { CreateTrainingFormPageComponent } from './pages/form/create-training-form-page/create-training-form-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'create-training', component: CreateTrainingFormPageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'login', component: LoginPageComponent, data: { requiresLogin: false } },
  // { path: 'register', component: RegisterPageComponent },
  // { path: 'series-exercise-form', component: SeriesExerciseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AccessGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
