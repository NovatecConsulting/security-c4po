import {Role} from './role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
  token: string;
}
