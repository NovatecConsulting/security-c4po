import {Role} from './role.enum';

export interface User {
  name: string;
  email: string;
  role: Role;
  token: string;
}
