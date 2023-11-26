import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import * as moment from "moment";

@Component({
    standalone: true,
    selector: 'weekly-calendar',
    imports: [
        MatButtonModule,
        MatIconModule,
        DatePipe,
    ],
    templateUrl: './weekly-calendar.component.html',
    styleUrls: ['./weekly-calendar.component.scss']
})
export class WeeklyCalendarComponent implements OnInit {
    public weekDays: { day: string, date: moment.Moment, isCurrentMonth: boolean, isActive: boolean, isCurrentDate: boolean }[] = [];
    public currentDate!: moment.Moment;
    public currentMonth!: string;
    public selectedDate: moment.Moment = moment().startOf('day');

    ngOnInit() {
        this.currentDate = moment().locale('fr');
        this.generateDaysOfWeek();
    }

    public generateDaysOfWeek() {
        this.weekDays = [];
        const startOfWeek = this.currentDate.clone().startOf('week');
        const currentMonth = this.currentDate.month();

        for (let i = 0; i < 7; i++) {
            const dayDate = startOfWeek.clone().add(i, 'days');
            this.weekDays.push({
                day: dayDate.format('ddd'),
                date: dayDate,
                isCurrentMonth: dayDate.month() === currentMonth,
                isActive: dayDate.isSame(this.selectedDate, 'day'),
                isCurrentDate: dayDate.isSame(moment(), 'day'),
            });
        }

        this.currentMonth = this.currentDate.format('MMMM');
    }

    public selectDate(day: { day: string, date: moment.Moment, isCurrentMonth: boolean, isActive: boolean }) {
        this.selectedDate = day.date;

        this.generateDaysOfWeek();
    }

    public previousWeek() {
        this.currentDate.subtract(1, 'week');
        this.generateDaysOfWeek();
    }

    public nextWeek() {
        this.currentDate.add(1, 'week');
        this.generateDaysOfWeek();
    }
}