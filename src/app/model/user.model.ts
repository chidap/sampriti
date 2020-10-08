import { Roles } from './roles.model';
export interface User{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    role: string;
  }