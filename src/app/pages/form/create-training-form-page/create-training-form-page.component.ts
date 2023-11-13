import { Component } from "@angular/core";
import { CreateTrainingFormGeneralInfo } from "../../../component/form/create-training-form-steps/create-training-form-general-info/create-training-form-general-info.component";

@Component({
  standalone: true,
  selector: 'create-training-form-page',
  imports: [
    CreateTrainingFormGeneralInfo
  ],
  templateUrl: './create-training-form-page.component.html',
  styleUrls: ['./create-training-form-page.component.scss'],
  exportAs: 'create-training-form-page'
})
export class CreateTrainingFormPageComponent {

}
