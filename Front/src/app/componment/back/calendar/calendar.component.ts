import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [] // Will be filled on init
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9091/stage/internships/calendar')
      .subscribe(events => {
        // Ensure events are mapped correctly
        this.calendarOptions.events = events.map(event => ({
          title: event.title,  // Set the title from the response
          start: event.start,   // Set the start date (ensure it's in string format)
          end: event.end || null,  // Optionally set the end date
        }));
      });
  }
}
