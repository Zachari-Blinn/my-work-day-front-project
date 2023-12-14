import { Component } from "@angular/core";
import {
  _MatSlideToggleRequiredValidatorModule
} from '@angular/material/slide-toggle';
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'modify-before-validate-training-form',
  imports: [

  ],
  templateUrl: './modify-before-validate-training-form.component.html',
  styleUrls: ['./modify-before-validate-training-form.component.scss'],
  exportAs: 'modify-before-validate-training-form'
})
export class ModifyBeforeValidateTrainingForm {

  public selectedDate!: Date;

  constructor(private router: Router) {
    this.selectedDate = this.router.getCurrentNavigation()?.extras.state?.["selectedDate"];
    console.log("selectedDate: ", this.selectedDate);
    // fetch template
  }
}
