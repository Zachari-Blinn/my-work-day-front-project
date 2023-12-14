import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { CreateTrainingFormPageComponent } from './pages/form/create-training-form-page/create-training-form-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { AccessGuard } from './guards/access.guard';
import { AddExerciseFormPageComponent } from './pages/form/add-exercise-form-page/add-exercise-form-page.component';
import { ModifyBeforeValidateTrainingPageComponent } from './pages/form/modify-before-validate-training-page/modify-before-validate-training-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'create-training', component: CreateTrainingFormPageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'login', component: LoginPageComponent, data: { requiresLogin: false } },
  { path: 'training/:trainingId/add-exercise', component: AddExerciseFormPageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  { path: 'training/:trainingId/modify-before-validate', component: ModifyBeforeValidateTrainingPageComponent, data: { requiresLogin: true }, canActivate: [AccessGuard] },
  // { path: 'register', component: RegisterPageComponent },
  // { path: 'series-exercise-form', component: SeriesExerciseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  providers: [AccessGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
