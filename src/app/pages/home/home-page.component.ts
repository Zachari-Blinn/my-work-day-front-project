import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import { TrainingModelSliderComponent } from "../../component/training-model-slider/training-model-slider.component";
import { Router } from "@angular/router";
import { DaySessionSelectButtonComponent } from "src/app/component/day-session-select-button/day-session-select-button.component";
import { SessionStepComponent } from "src/app/component/session-step/session-step.component";
import { WeeklyCalendarComponent } from "src/app/component/weekly-calendar/weekly-calendar.component";
import { StepProgressComponent } from "src/app/component/step-progress/step-progress.component";
import { MatChipsModule } from "@angular/material/chips";

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
    TrainingModelSliderComponent,
    DaySessionSelectButtonComponent,
    SessionStepComponent,
    WeeklyCalendarComponent,
    StepProgressComponent,
    MatChipsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  public selectedFormattedDate = "";

  public dayTrainingList: any[] = [
    {
      id: 1,
      name: 'Haut du corps',
      icon: 'fitness_center',
      datetime: new Date(),
    },
    {
      id: 2,
      name: 'Bas du corps',
      icon: 'fitness_center',
      datetime: new Date(),
    },
    {
      id: 3,
      name: 'Cardio',
      icon: 'fitness_center',
      datetime: new Date(),
    },
    {
      id: 4,
      name: 'Vélo',
      icon: 'fitness_center',
      datetime: new Date(),
    },
    {
      id: 4,
      name: 'Saut à la corde 1h 30min',
      icon: 'fitness_center',
      datetime: new Date(),
    }
  ]
  
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

  public setSelectedFormattedDate(date: string): void {
    this.selectedFormattedDate = date;
  }
}
