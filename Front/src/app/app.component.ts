import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink  } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import { NavbarComponent } from './componment/front/navbar/navbar.component';


@Component({
  selector: 'app-root',
  //standalone: true,
  imports: [CommonModule,RouterOutlet,FullCalendarModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'internships';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Vue par défaut
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin], // Plugins utilisés
    events: [
      { title: 'Event 1', date: '2023-10-01' },
      { title: 'Event 2', date: '2023-10-02' },
    ],
  };
}
