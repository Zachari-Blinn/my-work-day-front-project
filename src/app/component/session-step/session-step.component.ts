import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';

export interface StepperContent {
  name: string;
  description: string;
  isDone: boolean;
  isCurrent: boolean;
}

@Component({
  selector: 'app-session-step',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './session-step.component.html',
  styleUrl: './session-step.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  exportAs: 'session-step'
})
export class SessionStepComponent {

  @ViewChild('stepper')
  public stepper!: MatStepper;

  public stepperContent: StepperContent[] = [
    {
      name: 'Développé couché',
      description: 'Pour les pectoraux, les triceps et les deltoïdes antérieurs.',
      isDone: true,
      isCurrent: false,
    },
    {
      name: 'Développé militaire',
      description: 'Pour les deltoïdes antérieurs, les deltoïdes moyens et les deltoïdes postérieurs.',
      isDone: false,
      isCurrent: true,
    },
    {
      name: 'Curl biceps',
      description: 'Pour les biceps.',
      isDone: false,
      isCurrent: false,
    }
  ]
}
