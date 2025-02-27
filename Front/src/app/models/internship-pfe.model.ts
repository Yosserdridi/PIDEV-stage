import { InternshipConvention } from './internship-convention.model';
import { Teacher } from './teacher.model';
import { Restitution } from './restitution.model';

export interface InternshipPFE {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  internshipConvention?: InternshipConvention;
  teacher?: Teacher;
  restitution?: Restitution;
  signedConvention: string ;
}
