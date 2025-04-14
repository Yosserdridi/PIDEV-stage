import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeInternship } from 'src/model/convention';
import { Entities } from 'src/model/entities';
import { JournalService } from 'src/services/service_journal/journal.service';

@Component({
  selector: 'app-cif-details',
  templateUrl: './cif-details.component.html',
  styleUrls: ['./cif-details.component.css']
})
export class CIFDetailsComponent implements OnInit {


  journalId!: number;
  entities: Entities = {
    tasks: [],
    journal: { id: 0, title: '',remark:'', isvalid: false},

    file: { id: 0, report : '', internship_Certifcate: '' },


    summerInternship: { id: 0,title: '', description: '',   duration: 0  },
    internshipConvention: {   id: 0,
        companyName: '',
        companyAddress: '',
        companyContact: '',
        startDate: new Date(),  // Initialisation avec la date actuelle
        endDate: new Date(),    // Initialisation avec la date actuelle
        typeInternship: TypeInternship.INTERNSHIP_D_IMMERSION_EN_ENTREPRISE,
        isValid: false }
  };  // This will hold the response data, such as tasks, journal, file, etc.
  error: string = '';


  constructor(
    private route: ActivatedRoute,
    private journalService : JournalService,
    private router:Router
    
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.journalId = +params['id']; 

      this.fetchEntities();
    });
  }

  fetchEntities() {
    this.journalService.getAllEntitiesByJournalId(this.journalId).subscribe(
      (response) => {
        // Handle the response
        this.entities = response;
        console.log('Entities successfully fetched:', this.entities);
      },
      (error) => {
        // Handle any error during the API call
        this.error = 'There was an error fetching the entities';
        console.error('Error:', error);
      }
    );
  }

       navigateToTasks(journalId: number) {
        this.router.navigate(['/alltasks', this.journalId]);


    }
    




}
