import { postulation } from "./postulation";
import { User } from "./user";

export class Student extends User {
  registrationNumber!: string;
  cv!: string; 
  branche!: string;
  grade!: string;

  postulations?: postulation[];

  studentFName?: string; // Add this property
  studentLName?: string; // Add this property
}
