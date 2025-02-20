import { Component } from '@angular/core';
import { InternshipConvention, InternshipConventionService } from 'src/app/services/internship-convention.service';

@Component({
  selector: 'app-pfe-admin',
  templateUrl: './pfe-admin.component.html',
  styleUrls: ['./pfe-admin.component.css']
})
export class PfeAdminComponent {

  conventions: InternshipConvention[] = [];

  constructor(private conventionService: InternshipConventionService) {}

  ngOnInit(): void {
    this.conventionService.getAllConventions().subscribe((data) => {
      this.conventions = data;
    });
  }
}
