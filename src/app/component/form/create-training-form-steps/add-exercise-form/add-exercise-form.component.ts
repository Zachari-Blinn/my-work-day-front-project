import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
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

@Component({
  standalone: true,
  selector: 'add-exercise-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    
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
  public myControl = new FormControl('');
  public options!: Exercise[];

  constructor(private trainingService: TrainingService, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.retrieveTraining(this.trainingId);
    this.retrieveExercises();
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
}