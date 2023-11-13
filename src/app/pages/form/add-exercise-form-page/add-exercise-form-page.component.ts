import { Component, Input } from "@angular/core";
import { AddExerciseForm } from "../../../component/form/create-training-form-steps/add-exercise-form/add-exercise-form.component";
import { Training } from "../../../models/training.model";

@Component({
  standalone: true,
  selector: 'add-exercise-form-page',
  imports: [
    AddExerciseForm
  ],
  templateUrl: './add-exercise-form-page.component.html',
  styleUrls: ['./add-exercise-form-page.component.scss'],
  exportAs: 'add-exercise-form-page'
})
export class AddExerciseFormPageComponent {
  
  @Input({ required: true })
  public trainingId!: Training['id'];
  

}
