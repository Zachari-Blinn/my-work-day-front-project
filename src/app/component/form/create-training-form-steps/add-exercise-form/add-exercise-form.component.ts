import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { Training } from "../../../../models/training.model";
import { TrainingService } from "../../../../services/training.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Exercise } from '../../../../models/exercise.model';
import { ExerciseService } from '../../../../services/exercise.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

interface TempoList {
  id: number;
  label: string;
}

@Component({
  standalone: true,
  selector: 'add-exercise-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,CdkDropList, CdkDrag
  ],
  templateUrl: './add-exercise-form.component.html',
  styleUrls: ['./add-exercise-form.component.scss'],
  exportAs: 'add-exercise'
})
export class AddExerciseForm implements OnInit {

  @Input({ required: true })
  public trainingId!: Training['id'];

  public training?: Training;
  public exercises: Exercise[] = [];
  public filteredOptions: Exercise[] = [];

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  public options!: Exercise[];
  
  public addTrainingExerciseAndSeriesForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder, private trainingService: TrainingService, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.retrieveTraining(this.trainingId);
    this.retrieveExercises();
    this.addTrainingExerciseAndSeriesForm = this._formBuilder.group({
      exercise: [null, [Validators.required]],
      series: this._formBuilder.array([
        this.newSeries()
      ]),
      notes: ['']
    });
  }

  public retrieveTraining(trainingId: Training['id']): void {
    this.trainingService.getTraining(trainingId).subscribe({
      next: (result) => {
        this.training = result;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public retrieveExercises(): void {
    this.exerciseService.getAll().subscribe({
      next: (result) => {
        this.exercises = result;
        console.log(this.exercises);
        this.options = this.exercises.slice();
        this.filteredOptions = this.options.slice();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.exercises.filter(option => option?.name?.toLowerCase().includes(filterValue));
  }
  
  // Series
  
  public get series(): FormArray {
    return this.addTrainingExerciseAndSeriesForm.get('series') as FormArray;
  }
  
  public newSeries(): FormGroup {
    return this._formBuilder.group({
      repsCount: new FormControl(null),
      weight: new FormControl(null),
      restTime: new FormControl('02:00'),
      tempo: new FormControl<TempoList | null>(null),
      positionIndex: new FormControl(null)
    })
  }
  
  public  addSeries(): void {
    const newSeriesFormGroup = this.newSeries();
    newSeriesFormGroup.get('positionIndex')?.setValue(this.currentPositionIndex++);
    this.series.push(newSeriesFormGroup);
  }
  
  public removeSeries(index: number): void {
    this.series.removeAt(index);
    
    // Mettez à jour les index de position après la suppression
    this.series.controls.forEach((control, i) => {
      control.get('positionIndex')?.setValue(i);
    });
  }
  
  // end series
  
  public onSubmit(): void {
    console.warn(this.addTrainingExerciseAndSeriesForm.value);
  }
  
  // tempo
  
  public tempoList: TempoList[] = [
    {id: 1, label: '0:0:0'},
    {id: 2, label: '1:0:0'},
    {id: 3, label: '1:1:0'},
    {id: 4, label: '1:1:1'},
    {id: 5, label: '0:1:0'},
    {id: 6, label: '0:1:1'},
    {id: 7, label: '0:0:1'},
    {id: 8, label: '1:0:1'},
  ];
  
  // drag and drop
  public currentPositionIndex: number = 0;

  public drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.series.controls, event.previousIndex, event.currentIndex);
    
      // Update positionIndex after the drop
    this.series.controls.forEach((control, index) => {
      control.get('positionIndex')?.setValue(index);
    });
    
    // show data of series
    console.log(this.series.controls.forEach((control, index) => {
      console.log(control.value);
    }));
  }
}