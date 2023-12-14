import { Component } from "@angular/core";
import { LoginFormComponent } from "../../component/form/login-form/login-form.component";

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
}
