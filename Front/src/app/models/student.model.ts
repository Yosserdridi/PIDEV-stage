import { InternshipConvention } from './internship-convention.model';

export interface Student  {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    isAmin:boolean;
    registrationNumber: string;
    cv: string;
    branche: string;
    grade: string;
    internshipConventions?: InternshipConvention[];
}
