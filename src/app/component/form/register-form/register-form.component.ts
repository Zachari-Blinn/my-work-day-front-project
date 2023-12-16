import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-register-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        hideRequiredMarker: true,
        appearance: 'outline',
      },
    },
  ],
})
export class RegisterFormComponent {
  public registerForm: FormGroup = this._formBuilder.group({
    username: [null, Validators.required],
    gender: ['NOT_SPECIFIED', Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });
  public passwordHide: boolean = true;
  public isLoading: boolean = false;
  public errorMessage = '';
  public isRegisterFailed = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    } else {
      console.log(this.registerForm.value);
      return;
    }

    this.isLoading = true;
    this.registerForm.disable();

    const { username, email, password } = this.registerForm.value;

    this.authService.register(username, email, password).subscribe({
      next: response => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error(error);
        this.errorMessage = error.message;
        this.isRegisterFailed = true;
        this.isLoading = false;
      },
    });
    this.registerForm.enable();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public isOptionDisabled(value: string): boolean {
    return this.registerForm.get('gender')?.value === value;
  }
}
