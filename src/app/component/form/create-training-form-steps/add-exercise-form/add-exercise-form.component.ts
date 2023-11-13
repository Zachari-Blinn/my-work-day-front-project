import { Component, Input, OnInit } from "@angular/core";
import {
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { Training } from "../../../../models/training.model";
import { TrainingService } from "../../../../services/training.service";

@Component({
  standalone: true,
  selector: 'add-exercise-form',
  imports: [

  ],
  templateUrl: './add-exercise-form.component.html',
  styleUrls: ['./add-exercise-form.component.scss'],
  exportAs: 'add-exercise'
})
export class AddExerciseForm implements OnInit {
  
  @Input({ required: true })
  
  public trainingId!: Training['id'];
    
  public training?: Training;
  
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.retrieveTraining(this.trainingId);
  }
  
  public retrieveTraining(trainingId: Training['id']): void {
    this.trainingService.getTraining(trainingId).subscribe({
      next: (result) => {
        this.training = result;
        console.log(this.training);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
  // todo
}

