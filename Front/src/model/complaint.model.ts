export class Complaint {
    id!: number;
    title: string;
    content: string;
    dateComplaint: string;
    typeStatus: string;
    typeC: string;
    responses?:Response;
    image?: File | string; //
    constructor() {
      this.title = '';
      this.content = '';
      this.dateComplaint = new Date().toISOString();
      this.typeStatus = 'Pending';
      this.typeC = '';
    }
  }





