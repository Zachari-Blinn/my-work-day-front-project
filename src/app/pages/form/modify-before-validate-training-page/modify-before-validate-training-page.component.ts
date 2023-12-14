import { Component } from "@angular/core";
import { ModifyBeforeValidateTrainingForm } from "src/app/component/form/modify-before-validate-training-form/modify-before-validate-training-form.component";

@Component({
  standalone: true,
  selector: 'modify-before-validate-training-page',
  imports: [
    ModifyBeforeValidateTrainingForm
  ],
  templateUrl: './modify-before-validate-training-page.component.html',
  styleUrls: ['./modify-before-validate-training-page.component.scss'],
  exportAs: 'modify-before-validate-training-page'
})
export class ModifyBeforeValidateTrainingPageComponent {

}
