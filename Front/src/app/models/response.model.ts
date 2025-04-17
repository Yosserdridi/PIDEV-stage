import {Complaint} from "./complaint.model";

export class ResponseModel {
    id?: number;
    response: string;
    dateResponse: string;
    complaint!:any;
    // Optionnel : vous pouvez inclure la plainte associée sous forme d'objet ou juste son id
    complaintId?: number;

    constructor() {
      this.response = '';
      // Format de date "yyyy-MM-dd"
      this.dateResponse = new Date().toISOString().slice(0, 10);
    }
  }
