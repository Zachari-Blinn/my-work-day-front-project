import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import { StepProgressComponent } from "../../component/step-progress/step-progress.component";
import { TrainingModelSliderComponent } from "../../component/training-model-slider/training-model-slider.component";
import { Router } from "@angular/router";
import { DaySessionSelectButtonComponent } from "src/app/component/day-session-select-button/day-session-select-button.component";
import { SessionStepComponent } from "src/app/component/session-step/session-step.component";

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DatePipe,
    StepProgressComponent,
    TrainingModelSliderComponent,
    DaySessionSelectButtonComponent,
    SessionStepComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router: Router
  ) {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }
  
  public selected: Date | null | undefined;
  
  public goToCreateTrainingPage(): void {
    this.router.navigate(['/create-training']);
  }
}
