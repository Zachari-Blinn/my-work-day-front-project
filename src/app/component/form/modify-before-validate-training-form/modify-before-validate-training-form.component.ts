import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TrainingExercise } from 'src/app/models/training-exercise.model';
import { Training } from 'src/app/models/training.model';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  standalone: true,
  selector: 'app-modify-before-validate-training-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modify-before-validate-training-form.component.html',
  styleUrls: ['./modify-before-validate-training-form.component.scss'],
})
export class ModifyBeforeValidateTrainingFormComponent implements OnInit {
  @Input({ required: true })
  public trainingId!: Training['id'];

  public selectedDate!: Date;
  public trainingSession: TrainingExercise[] = [];
  public trainingSessionForm!: FormGroup;

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private _formBuilder: FormBuilder
  ) {
    this.selectedDate = this.getCurrentSelectedDate();
    this.initializeForm();
  }

  ngOnInit(): void {
    this.retrieveExercisesByTrainingId(this.trainingId);
  }

  private getCurrentSelectedDate(): Date {
    return (
      this.router.getCurrentNavigation()?.extras.state?.['selectedDate'] ||
      new Date()
    );
  }

  public retrieveExercisesByTrainingId(trainingId: string): void {
    this.trainingService
      .getTemplateExercisesByTrainingId(trainingId)
      .subscribe({
        next: (result: TrainingExercise[]) => {
          this.trainingSession = result;
          this.fillForm();
        },
        error: error => {
          console.error(error);
        },
      });
  }

  private initializeForm(): void {
    this.trainingSessionForm = this._formBuilder.group({
      trainingSession: this._formBuilder.array([]),
    });

    this.trainingSession.forEach(trainingExercise => {
      this.addTrainingExercise(trainingExercise);
    });
  }

  private addTrainingExercise(trainingExercise: TrainingExercise): void {
    const trainingSession = this.trainingSessionForm.get(
      'trainingSession'
    ) as FormArray;

    trainingSession.push(
      this._formBuilder.group({
        notes: [trainingExercise.notes],
        numberOfWarmUpSeries: [trainingExercise.numberOfWarmUpSeries],
        parent: [trainingExercise],
        trainingDay: [trainingExercise.trainingDay],
        training: [trainingExercise.training],
        exercise: [trainingExercise.exercise],
        seriesList: this._formBuilder.array(
          trainingExercise.seriesList.map(series => {
            return this._formBuilder.group({
              parent: [series],
              positionIndex: [series.positionIndex],
              repsCount: [series.repsCount],
              weight: [series.weight],
              tempo: [series.tempo],
              restTime: [series.restTime],
            });
          })
        ),
      })
    );
  }

  private fillForm(): void {
    this.trainingSession.forEach(trainingExercise => {
      this.addTrainingExercise(trainingExercise);
    });
  }

  public getTrainingSessionControls(): AbstractControl[] {
    return (this.trainingSessionForm.get('trainingSession') as FormArray)
      .controls;
  }

  public getSeriesListControls(index: number): AbstractControl[] {
    return (
      (
        (this.trainingSessionForm.get('trainingSession') as FormArray).controls[
          index
        ].get('seriesList') as FormArray
      )?.controls || []
    );
  }

  public onSubmit(): void {
    if (!this.trainingSessionForm?.valid) {
      return;
    }
    this.persistTrainingSession();
  }

  private persistTrainingSession(): void {
    this.trainingService
      .modifyBeforeValidateTraining(
        this.trainingId,
        this.trainingSessionForm.value
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: error => {
          console.error(error);
        },
      });
  }
}
