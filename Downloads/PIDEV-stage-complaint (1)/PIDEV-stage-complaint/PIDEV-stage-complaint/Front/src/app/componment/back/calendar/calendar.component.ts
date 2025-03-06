import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: any[] = []; // Stocke les événements du calendrier
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Utilisation du plugin dayGrid
    initialView: 'dayGridWeek', // ✅ Vue par semaine (uniquement les jours)
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridWeek' // Affichage par semaine
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<{ [key: string]: number }>('http://localhost:9091/stage/complaint/complaints-per-day').subscribe(
      (data) => {
        this.events = Object.keys(data).map(date => ({
          title: `Complaints: ${data[date]}`,
          date: date
        }));

        // Charger aussi les responses
        this.http.get<{ [key: string]: number }>('http://localhost:9091/stage/response/responses-per-day').subscribe(
          (responseData) => {
            const responseEvents = Object.keys(responseData).map(date => ({
              title: `Responses: ${responseData[date]}`,
              date: date,
              backgroundColor: 'green', // Couleur différente pour les responses
              borderColor: 'green'
            }));

            this.events = [...this.events, ...responseEvents]; // Fusionner les événements
            this.calendarOptions = { ...this.calendarOptions, events: this.events };
          }
        );
      }
    );
  }
}
