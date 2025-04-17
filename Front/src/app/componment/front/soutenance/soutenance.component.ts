import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SoutenanceDetails } from 'src/app/models/SoutenanceDetails.model';
import { ValidatedFile } from 'src/app/models/validated-file.model';
import { SoutenanceService } from 'src/app/Services/soutenance/Soutenanceserv';

@Component({
  selector: 'app-soutenance',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.css']
})
export class SoutenanceComponent implements OnInit {
  isLoading = false;
  isMainPage = true;
  isAddPage = false;
  isListPage = false;
  showCalendar = true;
  availableHours: string[] = [];

  soutenances: SoutenanceDetails[] = [];
  validatedStudents: ValidatedFile[] = [];

  selectedStudentId!: number;
  selectedStudentDetails?: ValidatedFile;

  salle_number = [101, 102, 201, 202, 301, 302];

  newSoutenance = {
    dateSoutenace: '',
    hourSoutence: '',
    salleNumber: 0,
    bloc: ''
  };

  calendarOptions: any = null;
  dateSelectCalendarOptions: any = null;

  errorMessage = '';
  isModalOpen = false;

  minDate = new Date().toISOString().split('T')[0];

  selectedSoutenance: SoutenanceDetails = {
    soutenanceId: 0,
    studentFirstName: '',
    studentLastName: '',
    branche: '',
    grade: '',
    note: 0,
    dateSoutenance: '',
    hourSoutenance: '',
    salleNumber: 0,
    bloc: '',
    juryMembers: []
  };

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;

  showConfirmDelete: boolean = false;
  pendingDeleteId: number | null = null;

  constructor(private soutenanceService: SoutenanceService) {}

  ngOnInit(): void {
    this.availableHours = this.generateHoursRange("08:00", "17:00");
    this.loadValidatedStudents();
    this.loadSoutenances();
    this.initSelectableCalendar();
  }

  generateHoursRange(start: string, end: string): string[] {
    const result: string[] = [];
    let [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    while (sh < eh || (sh === eh && sm <= em)) {
      const hour = sh.toString().padStart(2, '0');
      const minute = sm.toString().padStart(2, '0');
      result.push(`${hour}:${minute}`);
      sm += 30;
      if (sm >= 60) {
        sm = 0;
        sh++;
      }
    }
    return result;
  }

  navigateToMain(): void {
    this.isMainPage = true;
    this.isAddPage = false;
    this.isListPage = false;
  }

  navigateToAdd(): void {
    this.isMainPage = false;
    this.isAddPage = true;
    this.isListPage = false;
    this.showCalendar = true;
  }

  navigateToShow(): void {
    this.isMainPage = false;
    this.isAddPage = false;
    this.isListPage = true;
    this.loadSoutenances();
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  loadSoutenances(): void {
    this.soutenanceService.getAllSoutenanceDetails().subscribe({
      next: (data) => {
        this.soutenances = data;
        this.initMainCalendar();
      },
      error: () => {
        this.showCustomToast('Erreur lors du chargement des soutenances.', 'error');
      }
    });
  }

  loadValidatedStudents(): void {
    this.soutenanceService.getValidatedFiles().subscribe(data => {
      this.validatedStudents = data;
    });
  }

  onStudentChange(): void {
    const studentIdNumber = Number(this.selectedStudentId);
    this.selectedStudentDetails = this.validatedStudents.find(
      s => s.studentId === studentIdNumber
    );
  }

  scheduleSoutenance(): void {
    const studentIdNumber = Number(this.selectedStudentId);
    if (!this.selectedStudentDetails) {
      this.showCustomToast('Veuillez sélectionner un étudiant valide.', 'error');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      dateSoutenace: this.newSoutenance.dateSoutenace,
      hourSoutence: this.newSoutenance.hourSoutence,
      salleNumber: this.newSoutenance.salleNumber,
      bloc: this.newSoutenance.bloc,
      files: { id: this.selectedStudentDetails.fileId }
    };

    this.soutenanceService.scheduleSoutenanceByStudent(studentIdNumber, payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.showCustomToast('✅ Soutenance planifiée avec succès!', 'success');
        setTimeout(() => {
          this.navigateToShow();
          this.loadValidatedStudents();
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        this.showCustomToast(err.error.message || 'Erreur lors de la planification.', 'error');
      }
    });
  }

  confirmDelete(id: number): void {
    this.pendingDeleteId = id;
    this.showConfirmDelete = true;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.showConfirmDelete = false;
  }

  proceedDelete(): void {
    if (!this.pendingDeleteId) return;

    this.isLoading = true;
    this.soutenanceService.deleteSoutenance(this.pendingDeleteId).subscribe({
      next: () => {
        this.isLoading = false;
        this.showCustomToast('🗑️ Soutenance supprimée avec succès.', 'success');
        this.loadSoutenances();
        this.loadValidatedStudents();
        this.showConfirmDelete = false;
        this.pendingDeleteId = null;
      },
      error: () => {
        this.isLoading = false;
        this.showCustomToast('Erreur lors de la suppression.', 'error');
        this.showConfirmDelete = false;
        this.pendingDeleteId = null;
      }
    });
  }

  initMainCalendar(): void {
    const calendarEvents = this.soutenances
      .filter(s => s.dateSoutenance && s.hourSoutenance)
      .map(s => {
        const datePart = new Date(s.dateSoutenance).toISOString().split('T')[0];
        return {
          title: `${s.studentFirstName} ${s.studentLastName}`,
          start: `${datePart}T${s.hourSoutenance}`,
          allDay: false,
          color: '#007bff',
          extendedProps: { ...s }
        };
      });

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      slotMinTime: '08:00:00',
      slotMaxTime: '17:30:00',
      events: calendarEvents,
      eventClick: this.handleEventClick.bind(this)
    };
  }

  initSelectableCalendar(): void {
    const todayStr = new Date().toISOString().split('T')[0];

    this.dateSelectCalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      selectable: true,
      validRange: {
        start: todayStr
      },
      dateClick: this.handleDateClick.bind(this)
    };
  }

  handleDateClick(arg: any): void {
    if (arg.view.type === 'dayGridMonth') {
      this.dateSelectCalendarOptions.initialDate = arg.dateStr;
      this.dateSelectCalendarOptions.initialView = 'timeGridDay';
    } else if (arg.view.type === 'timeGridDay') {
      const selectedDate = arg.date;
      const hour = selectedDate.getHours();
      if (hour < 8 || hour >= 17) {
        this.showCustomToast("⛔️ Veuillez sélectionner une heure entre 08:00 et 17:00.", 'error');
        return;
      }
      this.newSoutenance.dateSoutenace = selectedDate.toISOString().split('T')[0];
      this.newSoutenance.hourSoutence = selectedDate.toTimeString().slice(0, 5);
      this.showCalendar = false;
    }
  }

  handleEventClick(arg: any): void {
    const s: SoutenanceDetails = arg.event.extendedProps;
    this.openModifyModal(s);
  }

  openModifyModal(s: SoutenanceDetails): void {
    this.selectedSoutenance = {
      ...s,
      dateSoutenance: new Date(s.dateSoutenance).toISOString().split('T')[0],
      hourSoutenance: s.hourSoutenance.slice(0, 5),
      salleNumber: Number(s.salleNumber),
      juryMembers: s.juryMembers || []
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateSoutenance(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const payload: any = { id: this.selectedSoutenance.soutenanceId };

    if (this.selectedSoutenance.dateSoutenance) {
      payload.dateSoutenace = this.selectedSoutenance.dateSoutenance;
    }
    if (this.selectedSoutenance.hourSoutenance) {
      payload.hourSoutence = this.selectedSoutenance.hourSoutenance;
    }
    if (this.selectedSoutenance.bloc) {
      payload.bloc = this.selectedSoutenance.bloc;
    }
    if (this.selectedSoutenance.salleNumber) {
      payload.salleNumber = this.selectedSoutenance.salleNumber;
    }

    this.soutenanceService.updateSoutenance(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.showCustomToast('✅ Soutenance mise à jour avec succès!', 'success');
        setTimeout(() => {
          this.loadSoutenances();
          this.closeModal();
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        this.showCustomToast(err.error.message || 'Erreur lors de la mise à jour.', 'error');
      }
    });
  }

  showCustomToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
 
