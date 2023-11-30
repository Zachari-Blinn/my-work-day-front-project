import { DatePipe } from "@angular/common";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateHelper {

    public formattedSelectedDate(date: Date, format: string = "EEEE d MMMM y", locale: string = 'fr-FR'): string {
        const datePipe = new DatePipe(locale);
        return datePipe.transform(date, format, locale) || '';
    }
}