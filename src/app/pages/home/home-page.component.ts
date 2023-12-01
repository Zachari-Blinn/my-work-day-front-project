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
import { StepProgressComponent, TrainingStep } from "src/app/component/step-progress/step-progress.component";
import { MatChipListboxChange, MatChipsModule } from "@angular/material/chips";
import { Training } from "src/app/models/training.model";
import { TrainingService } from "src/app/services/training.service";
import { DateHelper } from "src/app/helper/date.helper";
import * as moment from "moment";

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

  public selectedFormattedDate: string = "";
  public selectedDate: Date = new Date();
  public trainingsOfSelectedDay: any[] = [];
  public trainings?: Training[];
  public currentSelectedTrainingSteps: TrainingStep[] = [];
  public trainingHasSelected: boolean = false;

  public selectedTrainingSteps: TrainingStep[] = [
    {
      name: 'Développé couché',
      isDone: true,
    },
    {
      name: 'Développé militaire',
      isDone: true,
    },
    {
      name: 'Elevation latérale',
      isDone: true,
    },
    {
      name: 'Curl biceps',
      isDone: false,
      isCurrent: true,
    },
    {
      name: 'Gainage',
      isDone: false,
    },
    {
      name: 'Step 6',
      isDone: false,
    },
  ];

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private router: Router,
    private trainingService: TrainingService,
    private dateHelper: DateHelper
  ) {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }
    
  public goToCreateTrainingPage(): void {
    this.router.navigate(['/create-training']);
  }

  public setSelectedDate(date: Date): void {
    this.currentSelectedTrainingSteps = [];
    this.trainingHasSelected = false;
    this.selectedDate = date;
    this.selectedFormattedDate = this.dateHelper.formattedSelectedDate(date);

    this.fillChipsTrainingOfSelectedDay(date);
  }
  
  ngOnInit(): void {
    this.retrieveUserTrainings();
  }

  private fillChipsTrainingOfSelectedDay(date: Date): void {
    const selectedDay: String = moment(date).format('dddd').toUpperCase();
    this.trainingsOfSelectedDay = this.trainings
      ?.filter(training => training.trainingDays?.includes(selectedDay as string))
      .map((training, index) => ({
        id: training.id,
        name: training.name,
        selected: index === 0, // La première occurrence a selected à true, les suivantes à false
      })) || [];
      console.log(this.trainingsOfSelectedDay);
      
      // On récupère les exercices du premier training selectionné
      const firstTraining = this.trainingsOfSelectedDay[0];
      if (firstTraining) {
        this.trainingHasSelected = true;
        this.retrieveExercisesByTrainingId(firstTraining.id);
      }
  }
  
  public retrieveUserTrainings(): void {
    this.trainingService.getCurrentUserTrainings().subscribe({
      next: (result) => {
        this.trainings = result;
        this.fillChipsTrainingOfSelectedDay(this.selectedDate);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public retrieveExercisesByTrainingId(trainingId: string): void {
    this.trainingService.getExercisesByTrainingId(trainingId).subscribe({
      next: (result) => {
        console.log(result);
        //
        this.currentSelectedTrainingSteps = result.map((trainingExercise: any, index: any) => ({
          name: trainingExercise.exercise.name,
          isDone: false,
          isCurrent: false,
        }));
        console.log(this.currentSelectedTrainingSteps);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onSelectedTrainingChange(event: MatChipListboxChange) {
    this.trainingHasSelected = true;
    this.retrieveExercisesByTrainingId(event.value);
  }
}
