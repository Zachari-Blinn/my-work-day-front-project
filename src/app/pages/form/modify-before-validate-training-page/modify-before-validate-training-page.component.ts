import { Component, Input } from '@angular/core';
import { ModifyBeforeValidateTrainingFormComponent } from 'src/app/component/form/modify-before-validate-training-form/modify-before-validate-training-form.component';
import { Training } from 'src/app/models/training.model';

@Component({
  standalone: true,
  selector: 'app-modify-before-validate-training-page',
  imports: [ModifyBeforeValidateTrainingFormComponent],
  templateUrl: './modify-before-validate-training-page.component.html',
  styleUrls: ['./modify-before-validate-training-page.component.scss'],
})
export class ModifyBeforeValidateTrainingPageComponent {
  @Input({ required: true })
  public trainingId!: Training['id'];
}
