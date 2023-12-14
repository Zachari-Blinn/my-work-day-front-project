import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateHelper } from 'src/app/helper/date.helper';
import { Router, RouterModule } from '@angular/router';

export interface DialogData {
  selectedDate: Date;
}

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
})
export class AddActivityDialogComponent {
  selectedFormattedDate: string = "";

  constructor(private dialogRef: MatDialogRef<AddActivityDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dateHelper: DateHelper, private router: Router) {
    this.selectedFormattedDate = this.dateHelper.formattedSelectedDate(data.selectedDate);
  }

  public goToNewTraining(): void {
    this.dialogRef.close();
    this.router.navigate(['/create-training']);
  }

}