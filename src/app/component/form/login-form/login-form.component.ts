import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { StorageService } from "../../../services/storage.service";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  exportAs: 'login-form'
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup= this._formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];
  public passwordHide: boolean = true;
  
  public constructor(private _formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) { }

  public ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  
  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loginForm.disable();
    
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // this.reloadPage();
        this.router.navigateByUrl('/home');
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      },
    });
    this.loginForm.enable();
  }
  
  public get f(): { [key: string]: AbstractControl } { 
    return this.loginForm.controls;
  }
  
  private reloadPage(): void {
    window.location.reload();
  }
}
