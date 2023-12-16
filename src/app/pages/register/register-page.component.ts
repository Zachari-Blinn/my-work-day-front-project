import { Component } from '@angular/core';
import { RegisterFormComponent } from 'src/app/component/form/register-form/register-form.component';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {}
