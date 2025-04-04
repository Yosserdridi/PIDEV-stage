export enum Roles {
  VISITEUR = 'User',
  ADMIN = 'Admin',
  DEFAULT = 'Default',
}

export interface User {
  iduser?: number;
  nom?: string;
  prenom?: string;
  email: string;
  numtel?: string;
  id: string;
  mdp: string; 
  role?: Roles;

}