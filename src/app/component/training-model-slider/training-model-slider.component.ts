import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TrainingService } from "../../services/training.service";
import { Training } from "../../models/training.model";
import { NgxFlickingModule } from "@egjs/ngx-flicking";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "training-model-slider",
  templateUrl: "./training-model-slider.component.html",
  styleUrl: "./training-model-slider.component.scss",
  imports: [
    MatIconModule,
    NgxFlickingModule,
    RouterModule
  ],
  exportAs: "training-model-slider",
})
export class TrainingModelSliderComponent implements OnInit { 
  public trainings?: Training[];
  
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.retrieveUserTrainings();
  }

  public retrieveUserTrainings(): void {
    this.trainingService.getCurrentUserTrainings().subscribe({
      next: (result) => {
        this.trainings = result;
        console.log(this.trainings);

      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}