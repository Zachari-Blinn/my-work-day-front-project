import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateHelper } from 'src/app/helper/date.helper';
import { Router, RouterModule } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';

export interface DialogData {
  selectedDate: Date;
  selectedTrainingId: string;
}

@Component({
  selector: 'app-validate-training-dialog',
  templateUrl: './validate-training-dialog.component.html',
  styleUrls: ['./validate-training-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, RouterModule],
})
export class ValidateActivityDialogComponent {
  public selectedFormattedDate: string = '';
  public selectedTrainingId: string = '';
  public selectedDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dateHelper: DateHelper,
    private trainingService: TrainingService,
    private router: Router
  ) {
    this.selectedDate = data.selectedDate;
    this.selectedFormattedDate = this.dateHelper.formattedSelectedDate(
      data.selectedDate
    );
    this.selectedTrainingId = data.selectedTrainingId;
  }

  public validate(): void {
    if (!this.selectedTrainingId) {
      return;
    }
    this.trainingService
      .validateTraining(this.selectedTrainingId, {
        trainingDay: this.selectedDate,
      })
      .subscribe(() => {
        window.location.reload();
      });
  }

  public modifyBeforeValidate(): void {
    if (!this.selectedTrainingId) {
      return;
    }
    this.router.navigateByUrl(
      `/training/${this.selectedTrainingId}/modify-before-validate`,
      { state: { selectedDate: this.selectedDate } }
    );
  }
}
