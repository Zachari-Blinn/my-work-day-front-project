import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { TrainingService } from "../../services/training.service";
import { Training } from "../../models/training.model";

@Component({
  standalone: true,
  selector: "training-model-slider",
  templateUrl: "./training-model-slider.component.html",
  styleUrls: [
    "../../../../node_modules/keen-slider/keen-slider.min.css",
    "./training-model-slider.component.scss",
  ],
  imports: [
    MatIconModule
  ],
  exportAs: "training-model-slider",
})
export class TrainingModelSliderComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild("sliderRef")
  public sliderRef!: ElementRef<HTMLElement>

  public slider: KeenSliderInstance | undefined;
  
  public trainings?: Training[];
  
  constructor(private trainingService: TrainingService) { }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 3,
        spacing: 15,
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

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
        console.log(error);
      }
    })
  }
}