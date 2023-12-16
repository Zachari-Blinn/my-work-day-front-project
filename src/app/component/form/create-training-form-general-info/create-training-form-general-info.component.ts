import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrainingService } from '../../../services/training.service';
import { Router } from '@angular/router';

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
  selector: 'app-create-training-form-general-info',
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
    MatIconModule,
  ],
  templateUrl: './create-training-form-general-info.component.html',
  styleUrls: ['./create-training-form-general-info.component.scss'],
})
export class CreateTrainingFormGeneralInfoComponent implements OnInit {
  public trainingFormGeneralInfo!: FormGroup;

  public constructor(
    private _formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private router: Router
  ) {}

  public submitted: boolean = false;

  ngOnInit(): void {
    this.trainingFormGeneralInfo = this._formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      sportsControl: null,
      description: null,
      hasWarpUp: [true],
      hasStretching: [false],
      trainingDays: [null],
    });
  }

  public onSubmit(): void {
    if (this.trainingFormGeneralInfo.invalid) {
      return;
    }

    console.log(JSON.stringify(this.trainingFormGeneralInfo.value, null, 2));
    this.trainingService.create(this.trainingFormGeneralInfo.value).subscribe({
      next: data => {
        console.log('data', data);
        this.submitted = true;
      },
      error: error => {
        console.log('error', error);
      },
      complete: () => {
        console.log('complete');
      },
    });
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

  public goBack(): void {
    this.router.navigate(['home']);
  }
}
