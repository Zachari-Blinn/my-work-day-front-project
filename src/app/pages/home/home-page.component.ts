import { DatePipe, NgFor } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import { AvatarComponent } from "../../component/avatar/avatar.component";

export interface TrainingStep {
  name: string;
  isDone: boolean;
  isCurrent?: boolean;
}

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
    NgFor,
    DatePipe,
    AvatarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }
  
  public selected: Date | null | undefined;
  
  public steps: TrainingStep[] = [
    {
      name: 'Step 1',
      isDone: true,
    },
    {
      name: 'Step 2',
      isDone: true,
    },
    {
      name: 'Step 3',
      isDone: true,
    },
    {
      name: 'Step 4',
      isDone: false,
      isCurrent: true,
    },
    {
      name: 'Step 5',
      isDone: false,
    },
  ];
}
