import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-modify-before-validate-training-form',
  imports: [],
  templateUrl: './modify-before-validate-training-form.component.html',
  styleUrls: ['./modify-before-validate-training-form.component.scss'],
})
export class ModifyBeforeValidateTrainingFormComponent {
  public selectedDate!: Date;

  constructor(private router: Router) {
    this.selectedDate =
      this.router.getCurrentNavigation()?.extras.state?.['selectedDate'];
    console.log('selectedDate: ', this.selectedDate);
    // fetch template
  }
}
