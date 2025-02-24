import { InternshipPFE } from './internship-pfe.model';
import { Restitution } from './restitution.model';

export interface Teacher {
    id?: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    isAmin:boolean;
    registrationNumber: string;
    internshipPFEs?: InternshipPFE[];
    restitutions?: Restitution[];
}

