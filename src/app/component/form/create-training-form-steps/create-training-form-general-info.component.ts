import { Component, OnInit } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

interface Sport {
  value: string;
  viewValue: string;
}

interface SportsGroup {
  disabled?: boolean;
  type: string;
  sports: Sport[];
}


@Component({
  standalone: true,
  selector: 'create-training-form-general-info',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatSlideToggleModule, 
    _MatSlideToggleRequiredValidatorModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-training-form-general-info.component.html',
  styleUrls: ['./create-training-form-general-info.component.scss'],
  exportAs: 'create-training-form-general-info'
})
export class CreateTrainingFormGeneralInfo implements OnInit {

  public trainingFormGeneralInfo!: FormGroup;

  public constructor(private _formBuilder: FormBuilder) { }

  public submitted: boolean = false;

  ngOnInit(): void {
    this.trainingFormGeneralInfo = this._formBuilder.group({
      trainingName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      sportsControl: null,
      description: null,
      warmUp: [true],
      stretching: [false],
      trainingDays: [null]
    });
  }

  public onSubmit(): void {
    console.log('onSubmit');
    this.submitted = true;

    if (this.trainingFormGeneralInfo.invalid) {
      return;
    }

    console.log(JSON.stringify(this.trainingFormGeneralInfo.value, null, 2));
  }

  public sportsGroups: SportsGroup[] = [
    {
      type: 'Endurance',
      sports: [
        { value: '1', viewValue: 'Musculation' },
        { value: '2', viewValue: 'Yoga' },
        { value: '3', viewValue: 'Fitness' },
      ],
    },
    {
      type: 'Force',
      sports: [
        { value: '4', viewValue: 'Powerlifting' },
        { value: '5', viewValue: 'Haltérophilie' },
        { value: '6', viewValue: 'Bras de fer' },
      ],
    },
  ];

}
