import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoutenanceService } from 'src/app/Services/soutenance/Soutenanceserv';
import { HttpClientModule } from '@angular/common/http';
import { MailService } from 'src/app/Services/soutenance/MailService ';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { saveAs } from 'file-saver';
import { JuryService } from 'src/app/Services/soutenance/JuryService';
import { Jury } from '../../../models/Jury';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';





interface Soutenances {
  id: number;
  date_soutenance: Date;
  heure_soutenance: Date;
  salle_number: number;
  bloc: string;
  jurys: Jury[]; // Add the missing jurys property

}

@Component({
  selector: 'app-soutenance',

  standalone: true,
  imports: [
    CommonModule,
     HttpClientModule,
     FormsModule,
      MatIconModule,
      MatButtonModule,
      FullCalendarModule], // Add this line
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.css'],
  template: `<full-calendar [options]="calendarOptions"></full-calendar>`


})
export class SoutenanceComponent implements OnInit {
  isMainPage: boolean = true;
  isAddPage: boolean = false;
  isListPage: boolean = false;

  soutenance: any = {}; // Initialisez l'objet soutenance
  events: any[] = [
    { title: 'Soutenance 1', date: '2023-10-10' },
    { title: 'Soutenance 2', date: '2023-10-15' }
  ];

//events: EventInput[] = [];




  //soutenance: any;
  salle_number: number[] = [];
  id!: number;
  date_soutenance!: Date;
  heure_soutenance!: Date;
  bloc!: string;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages = 0;
  jurysAssignes: Jury[] = [];


  soutenances: Soutenances[] = [];
  calendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin
    ],
    initialView: 'dayGridMonth', // Vue par défaut
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.events, // Liez les événements ici
    dateClick: this.handleDateClick.bind(this), // Gestionnaire de clic sur une date
    eventClick: this.handleEventClick.bind(this) // Gestionnaire de clic sur un événement
  };
  // Gestionnaire de clic sur une date
  handleDateClick(arg: any) {
    alert('Date cliquée : ' + arg.dateStr);
  }

  // Gestionnaire de clic sur un événement
  handleEventClick(arg: any) {
    alert('Événement cliqué : ' + arg.event.title);
  }
  hasEvents(): boolean {
    return Array.isArray(this.calendarOptions.events) && this.calendarOptions.events.length > 0;
}

  constructor(private soutenanceService : SoutenanceService, private mailService: MailService , private http: HttpClient, private router: Router, private juryService: JuryService) { }
  // Naviguer vers la page d'ajout
  navigateToAdd(): void {
    this.isMainPage = false; // Afficher le template d'ajout
    this.isAddPage = true;
    this.isListPage = false;
  }
  // Naviguer vers la page d'affichage (à implémenter plus tard)
  navigateToShow(): void {
    this.isMainPage = false;
    this.isAddPage = false;
    this.isListPage = true;
    this.loadsoutenances(); // Charger les soutenances
      }
      navigateToMain(): void {
        this.isMainPage = true;
        this.isAddPage = false;
        this.isListPage = false;
      }


  ngOnInit(): void {
    this.isMainPage = true;
    this.isAddPage = false;
    this.isListPage = false;
    // salle_number initialization moved to class level
    this.salle_number = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205];
    if (Array.isArray(this.calendarOptions.events) && this.calendarOptions.events.length > 0) {
      console.log('Des événements sont présents.');
    }

  }
  majEvenementsCalendrier() {
    this.calendarOptions.events = this.soutenances.map(s => ({
      title: `Soutenance - Jury: ${s.jurys.map(j => j.name).join(", ")}`,
      start: s.date_soutenance
    }));
  }

  loadsoutenances(): void {
    this.soutenanceService.getAllsoutenances(this.currentPage, this.pageSize).subscribe((data: any) => {
      console.log('Données reçues :', data); // Ajoutez ce log pour vérifier les données
      this.soutenances = data.content;
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadsoutenances();
  }
  /*loadSoutenances(): void {
    // Simuler des données de soutenances
    this.soutenances = [
      { id: 1, date_soutenance: new Date(), heure_soutenance: new Date(), salle_number: 101, bloc: 'A' },
      { id: 2, date_soutenance: new Date(), heure_soutenance: new Date(), salle_number: 102, bloc: 'B' },

    ];
  }*/


   updateRoomsList(bloc: string): void {
    switch(bloc) {
      case 'A':
        this.salle_number = [101, 102, 103];
        break;
      case 'B':
        this.salle_number = [201, 202, 203];
        break;
      case 'C':
        this.salle_number = [301, 302, 303];
        break;
      default:
        this.salle_number = [];
    }

}

assignerJurys() {
  this.juryService.assignerJurys(this.soutenance).subscribe({
    next: (jurys) => {
      this.jurysAssignes = jurys;
      console.log('Jurys assignés :', this.jurysAssignes);
    },
    error: (err) => console.error('Erreur lors de l’assignation des jurys', err)
  });
}

addSoutenance(): void {
  console.log('🚀 addSoutenance() a été appelée !');
  const newSoutenance: Soutenances = {
    id: 0, // L'ID sera généré par le back-end
    date_soutenance: new Date(), // Remplacez par la date souhaitée
    heure_soutenance: new Date('1970-01-01T10:00:00'), // Remplacez par l'heure souhaitée
    salle_number: 101, // Remplacez par le numéro de salle souhaité
    bloc: 'A', // Remplacez par le bloc souhaité
    jurys: [] // Initialize with empty array

  };

  this.soutenanceService.addsoutenances(newSoutenance).subscribe(
    (data) => {
      console.log('Soutenance ajoutée avec succès', data);
      this.loadsoutenances(); // Reload the list after adding a new soutenance

      const mailRequest = {
        to: 'nermine.ghouibii@gmail.com',
        subject: 'Nouvelle soutenance ajoutée',
        text: 'voila les information de votre soutenance',
      };

      this.mailService.sendMail(mailRequest).subscribe(
        (response) => {
          console.log('Email envoyé avec succès :', response);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
      );
    },
    (err) => {
      console.error('Erreur lors de l\'ajout', err);
    }
  );
}
generatePdf() {
  this.http.post('/api/pdf/generate', this.soutenance, { responseType: 'blob' })
    .subscribe(response => {
      saveAs(response, 'soutenance.pdf');
    }, error => {
      console.error("Erreur lors de la génération du PDF", error);
    });
}

 // Supprimer une soutenance
 onDelete(id: number): void {
  if (confirm('Are you sure you want to delete this soutenance?')) {
    this.soutenanceService.deletesoutenances(id).subscribe(
      () => {
        this.soutenances = this.soutenances.filter((s) => s.id !== id); // Mettre à jour la liste
        alert('Soutenance deleted successfully!');
      },
      (error) => {
        console.error('Error deleting soutenance:', error);
      }
    );
  }
}
}


