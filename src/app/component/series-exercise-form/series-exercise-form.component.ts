import { Component } from "@angular/core";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NgFor, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SeriesExerciseService } from "../../services/series-exercise.service";
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

interface Exercise {
  name: string;
  maxWeight?: number;
}

@Component({
  standalone: true,
  selector: 'series-exercise-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './series-exercise-form.component.html',
  styleUrls: ['./series-exercise-form.component.scss']
})
export class SeriesExerciseFormComponent {
  
  public trainingSeriesExerciseForm: FormGroup;
  
  public constructor(private formBuilder: FormBuilder, private seriesExerciseService: SeriesExerciseService) {
    this.trainingSeriesExerciseForm = this.formBuilder.group({
      exercise: new FormControl('', Validators.required),
      series: this.formBuilder.array([
        this.newSeries()
      ])
    });
  }
  
  public get series(): FormArray {
    return this.trainingSeriesExerciseForm.get('series') as FormArray;
  }
  
  public newSeries(): FormGroup {
    return this.formBuilder.group({
      repsCount: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      restTime: new FormControl('02:00'),
      notes: new FormControl(''),
    })
  }
  
  public  addSeries(): void {
    this.series.push(this.newSeries());
  }
  
  public removeSeries(index: number): void {
    this.series.removeAt(index);
  }
  
  public exercises: Exercise[] = [
    {name: 'Bench Press'},
    {name: 'Squat'},
  ];
  
  public getAllTrainingExercises(): void {}
  
  public onSubmit(): void {
    console.warn(this.trainingSeriesExerciseForm.value);
  }
  
  public saveSeriesExercise(): void {
    const data = {
      exercise: this.trainingSeriesExerciseForm.value.exercise,
      series: this.trainingSeriesExerciseForm.value.series
    };
    
    this.seriesExerciseService.create(data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}