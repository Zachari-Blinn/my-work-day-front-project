import { Component } from '@angular/core';
import { CreateTrainingFormGeneralInfoComponent } from '../../../component/form/create-training-form-steps/create-training-form-general-info/create-training-form-general-info.component';

@Component({
  standalone: true,
  selector: 'app-create-training-form-page',
  templateUrl: './create-training-form-page.component.html',
  styleUrls: ['./create-training-form-page.component.scss'],
  imports: [CreateTrainingFormGeneralInfoComponent],
})
export class CreateTrainingFormPageComponent {}
