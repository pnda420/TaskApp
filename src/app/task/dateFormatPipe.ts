import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        const datePipe = new DatePipe('en-US');

        // Parse input string to Date object
        const parsedDate = new Date(value);

        // Format time in HH:mm format
        const timeFormatted = datePipe.transform(parsedDate, 'HH:mm');

        // Format date in dd.MM.yyyy format
        const dateFormatted = datePipe.transform(parsedDate, 'dd.MM.yyyy');

        return `${timeFormatted} ${dateFormatted}`;
    }

}
