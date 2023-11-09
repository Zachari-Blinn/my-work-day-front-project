import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { MatIconModule } from "@angular/material/icon";
import KeenSlider, { KeenSliderInstance } from "keen-slider"

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
export class TrainingModelSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild("sliderRef")
  public sliderRef!: ElementRef<HTMLElement>

  public slider: KeenSliderInstance | undefined;

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
}