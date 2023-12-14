import { Component, Input } from '@angular/core';
import { AddExerciseFormComponent } from '../../../component/form/create-training-form-steps/add-exercise-form/add-exercise-form.component';
import { Training } from '../../../models/training.model';

@Component({
  standalone: true,
  selector: 'app-add-exercise-form-page',
  templateUrl: './add-exercise-form-page.component.html',
  styleUrls: ['./add-exercise-form-page.component.scss'],
  imports: [AddExerciseFormComponent],
})
export class AddExerciseFormPageComponent {
  @Input({ required: true })
  public trainingId!: Training['id'];
}
