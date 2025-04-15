import { CompanyAgent } from "./CompanyAgent";
import { intershipoffer } from './intershipoffer';

export class Company {
  id?: number;
  companyName?: string;
  adresse?: string;
  sectorActivity?: string;
  contact?: string;
  webSite?: string;
  mail?: string;

  intershipOffers?: intershipoffer[];
    companyAgent?: CompanyAgent;
}
